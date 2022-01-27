const {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} = require("react");
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "utils/loadContract";
import Web3 from "web3";
import { setupHooks } from "./hooks/setupHooks";

const Web3Context = createContext(null);

const setListeners = (provider) => {
  provider.on("chainChanged", (_) => window.location.reload());
};

const createWeb3State = ({ web3, provider, contract, isLoading }) => {
  return {
    web3,
    provider,
    contract,
    isLoading,
    hooks: setupHooks({ web3, provider, contract }),
  };
};

export default function Web3Provider({ children }) {
  const [web3Api, setWeb3Api] = useState(
    createWeb3State({
      provider: null,
      web3: null,
      contract: null,
      isLoading: true,
    })
  );

  // Connect to Metamask and Access to Ethereum Network
  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        const web3 = new Web3(provider);
        const contract = await loadContract("CourseMarketplace", web3);

        setListeners(provider);
        setWeb3Api(
          createWeb3State({
            provider,
            web3,
            contract,
            isLoading: false,
          })
        );
      } else {
        setWeb3Api((api) => ({ ...api, isLoading: false }));
        console.log("Please, install Metamask.");
      }
    };
    loadProvider();
  }, []);

  // Request to Metamask account
  const _web3Api = useMemo(() => {
    const { web3, provider, isLoading } = web3Api;

    return {
      ...web3Api,
      requireInstall: !isLoading && !web3,
      connect: provider
        ? async () => {
            try {
              await provider.request({
                method: "eth_requestAccounts",
              });
            } catch {
              // Incase, use close metamask, it won't able to be connect again
              // To do that, need to reload the page
              window.location.reload();
            }
          }
        : () => {
            console.log(
              "Cannot connect to Metamask, try to reload your browser."
            );
          },
    };
  }, [web3Api]);

  return (
    <Web3Context.Provider value={_web3Api}>{children}</Web3Context.Provider>
  );
}

// Function: to access the value or store of provider
export function useWeb3() {
  return useContext(Web3Context);
}

// Function: access the hook function from the store of provider
export function useHooks(callback) {
  const { hooks } = useWeb3();

  return callback(hooks);
}
