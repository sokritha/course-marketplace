import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon, KeyIcon } from "@heroicons/react/outline";
import { Fragment, useRef, useState, useEffect } from "react";

export default function PopoverCustomize({ account }) {
  let timeout;
  const timeoutDuration = 100;

  const buttonRef = useRef(null);
  const [openState, setOpenState] = useState(false);

  const toggleMenu = (open) => {
    setOpenState(!openState);
    // toggle the menu by clicking on buttonRef
    buttonRef?.current?.click(); // eslint-disable-line
  };

  const handleClick = (open) => {
    setOpenState(!open);
    clearTimeout(timeout);
  };

  const handleClickOutside = (event) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
      event.stopPropagation();
    }
  };

  // Open the menu after a delay of timeoutDuration
  const onHover = (open, action) => {
    // if the modal is currently open, we need to close it or vice versa.
    if (
      (!open && !openState && action === "onMouseEnter") ||
      (open && openState && action === "onMouseLeave")
    ) {
      // clear the old timeout, if any
      clearTimeout(timeout);
      // open the modal after a timeout
      timeout = setTimeout(() => toggleMenu(open), timeoutDuration);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <Popover>
      {({ open }) => (
        <div
          onMouseEnter={() => onHover(open, "onMouseEnter")}
          onMouseLeave={() => onHover(open, "onMouseLeave")}
        >
          <Popover.Button ref={buttonRef}>
            <div
              onClick={() => handleClick(open)}
              className={`
                ${open ? "" : "text-opacity-90"}
                text-white group bg-blue-600 px-3 py-2 rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span>Hi there</span>
              <ChevronDownIcon
                className={`${open ? "" : "text-opacity-70"}
                  ml-2 h-5 w-5 text-orange-300 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                aria-hidden="true"
              />
            </div>
          </Popover.Button>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel>
              <div className="absolute flex items-center right-0 z-10 bg-blue-500 rounded-lg text-white py-2 px-4 mt-2">
                <KeyIcon className="h-5 w-5 mr-2" />
                <div>{account}</div>
              </div>
            </Popover.Panel>
          </Transition>
        </div>
      )}
    </Popover>
  );
}
