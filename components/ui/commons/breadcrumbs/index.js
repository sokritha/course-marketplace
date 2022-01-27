import { ActiveLink } from "@components/ui/commons";
import React from "react";

const BreadcrumbItem = ({ item }) => {
  return (
    <li key={item.label}>
      <ActiveLink href={item.path}>
        <a className="cursor-pointer text-sm font-medium px-3 py-2 hover:bg-blue-600  hover:text-white">
          {item.label}
        </a>
      </ActiveLink>
    </li>
  );
};

export default function BreadCrumbs({ items, isAdmin }) {
  return (
    <div className="body-content-layout flex justify-end">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="flex leading-none text-black divide-x divide-indigo-400">
          {items.map((item) => (
            <React.Fragment key={item.label}>
              {!item.requireAdmin && <BreadcrumbItem item={item} />}
              {item.requireAdmin && isAdmin && <BreadcrumbItem item={item} />}
            </React.Fragment>
          ))}
        </ol>
      </nav>
    </div>
  );
}
