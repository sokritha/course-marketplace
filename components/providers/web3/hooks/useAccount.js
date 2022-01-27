import { useEffect } from "react";
import useSwr from "swr";

const adminAddresses = {
  "0x69124243602c6c5483938e01977201aa3e3967f5f1e56b9fc29c1ef906d43d17": true,
  "0xd94f9f939f3600b5b0691e63030d2c8df38cbf7a4e1e61abe8ddc6f6f2d25d50": true,
};

// This hook will access the account from the metamask
export const handler = (web3, provider) => () => {
  const { data, mutate, ...rest } = useSwr(
    () => (web3 ? "web3/accounts" : null),
    async () => {
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      if (!account)
        throw new Error(
          "Cannot retreive an account. Please refresh the browser."
        );
      return account;
    }
  );

  useEffect(() => {
    const mutator = (accounts) => mutate(accounts[0] ?? null);
    provider?.on("accountsChanged", mutator);

    // clean up or unsubscribe to the event
    return () => {
      provider?.removeListener("accountsChanged", mutator);
    };
  }, [provider]);

  return {
    isAdmin: (data && adminAddresses[web3.utils.keccak256(data)]) ?? false,
    data,
    mutate,
    ...rest,
  };
};
