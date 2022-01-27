import { Transition } from "@headlessui/react";
import { React, useState, createRef } from "react";
import { LoginIcon, KeyIcon } from "@heroicons/react/outline";
import { navlinkItems } from "./data";
import { useWeb3 } from "@components/providers";
import { Button, PopoverCustomize, ActiveLink } from "@components/ui/commons";
import { useAccount } from "@components/hooks/web3";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const ref = createRef();
  const { connect, isLoading, requireInstall } = useWeb3();
  const { account } = useAccount();

  return (
    /* Main Navbar Container which include only the length, style of Navbar*/
    <nav className="w-full shadow">
      {/* Sub Navbar Container which separate between NavLink and Drawable Component */}
      <div className="w-full px-8 h-16 tabletLandscape:px-16 flex items-center">
        {/* NavLink & BrandName Component */}
        <div className="h-16 flex justify-between items-center grow">
          <BrandName firstName="Course" secondName="Hub" />
          <div className="hidden tabletLandscape:flex items-baseline space-x-4">
            {navlinkItems.map((eachItem) => (
              <CustomLinkHorizontal key={eachItem.label} {...eachItem} />
            ))}
          </div>
          <div className="hidden tabletLandscape:flex relative">
            {isLoading ? (
              <Button
                type="primary"
                label="Loading..."
                size="small"
                Icon={LoginIcon}
                handleOnAction={connect}
                disabled={true}
              />
            ) : account.data ? (
              <PopoverCustomize account={account.data} />
            ) : requireInstall ? (
              <Button
                type="primary"
                label="Install Metamask"
                size="small"
                Icon={LoginIcon}
                handleOnAction={() =>
                  window.open("https://metamask.io/download.html", "_blank")
                }
              />
            ) : (
              <Button
                type="primary"
                label="Connect"
                size="small"
                Icon={LoginIcon}
                handleOnAction={connect}
              />
            )}
          </div>
        </div>
        {/* Drawable Component */}
        <div className="flex flex-col tabletLandscape:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="bg-blue-600 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white"
            aria-label="mobile-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {!isOpen ? (
              <svg
                className="block h-6 w-6"
                xmlns="http:www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 6h16M4 12h16M4 18h16" // for menu shape
                />
              </svg>
            ) : (
              <svg
                className="block h-6 w-6"
                xmlns="http:www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12" // for cross shape
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="tabletLandscape:hidden" id="mobile-menu">
          <div ref={ref} className="bg-white px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navlinkItems.map((eachItem) => (
              <CustomLinkVertical key={eachItem.label} {...eachItem} />
            ))}
            {isAuth ? (
              <div className="flex items-center justify-center bg-blue-600 text-white px-3 py-2 phone:flex-col">
                <span className="mr-4">Hi there:</span>
                <span className="flex items-center">
                  <span>0x25def232830ffeeab834928301</span>
                  <KeyIcon className="h-5 w-5 mr-2" />
                </span>
              </div>
            ) : (
              <Button
                type="primary"
                label="Connect"
                size="small"
                Icon={LoginIcon}
                handleOnAction={connect}
              />
            )}
          </div>
        </div>
      </Transition>
    </nav>
  );
}

const BrandName = ({ firstName, secondName }) => {
  return (
    <Link href="/">
      <a className="font-bold text-xl cursor-pointer">
        {firstName}
        <span className="text-blue-500">{secondName}</span>
      </a>
    </Link>
  );
};

const CustomLinkHorizontal = ({ label, path, active }) => {
  return (
    <ActiveLink href={`/${path}`}>
      <a className="cursor-pointer text-sm font-medium px-3 py-2 hover:bg-blue-600  hover:text-white">
        {label}
      </a>
    </ActiveLink>
  );
};

const CustomLinkVertical = ({ label, path, active }) => {
  return (
    <Link href={`/${path}`}>
      <a
        className={`${
          active
            ? "cursor-pointer text-blue-600 font-semibold px-3 py-2 text-md hover:font-black"
            : "cursor-pointer hover:bg-blue-600 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        }`}
      >
        {label}
      </a>
    </Link>
  );
};
