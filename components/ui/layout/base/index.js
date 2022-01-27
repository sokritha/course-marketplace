import { Footer, Navbar } from "@components/ui/commons";
import { Web3Provider } from "@components/providers";

export default function BaseLayout({ children }) {
  return (
    <Web3Provider>
      <Navbar />
      {children}
      <Footer />
    </Web3Provider>
  );
}
