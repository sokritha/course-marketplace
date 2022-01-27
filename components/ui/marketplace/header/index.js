import { EthRates, WalletBar } from "@components/ui/web3";
import { BreadCrumbs, Divider } from "@components/ui/commons";
import { useAccount } from "@components/hooks/web3";

const LINKS = [
  {
    path: "/marketplace",
    label: "Buy",
  },
  {
    path: "/marketplace/courses/owned",
    label: "My Courses",
  },
  {
    path: "/marketplace/courses/managed",
    label: "Manage Courses",
    requireAdmin: true
  },
];

export default function Header() {
  const { account } = useAccount();

  return (
    <>
      <Divider />
      <WalletBar />
      <EthRates />
      <Divider />
      <BreadCrumbs items={LINKS} isAdmin={account.isAdmin}/>
    </>
  );
}
