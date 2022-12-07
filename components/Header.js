import { useEffect, useState } from "react";
import HeaderLink from "./HeaderLink";
import Button from "./Button";
import { useAuth } from "../context";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { fetchEnsName } from "../utils";

const Header = () => {
  const { currentUser, signOut } = useAuth();
  const [name, setName] = useState();
  const init = async () => {
    const ens = await fetchEnsName(currentUser?.uid);
    setName(ens);
  };
  useEffect(() => {
    init();
  }, [currentUser]);
  return (
    <header className="flex justify-around items-center py-4 border-b-[1px] border-slate-200 focus-within:shadow-lg">
      <div className="font-bold text-xl">Coterie</div>
      <div className="flex items-center sm:divide-x divide-gray-300">
        <div className="hidden sm:flex space-x-8 pr-4">
          <HeaderLink label="Groups" active />
          <HeaderLink label="Marketplace" />
          <HeaderLink label="Learning" />
          <HeaderLink label="Explore" />
        </div>
        <div className="flex pl-4">
          <Button
            Icon={<MdOutlineAccountBalanceWallet />}
            label={
              name
                ? name
                : `${currentUser?.uid.slice(0, 3)}...${currentUser?.uid.slice(
                    -3
                  )}`
            }
            onClick={() => signOut()}
            styles="px-5 py-3"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
