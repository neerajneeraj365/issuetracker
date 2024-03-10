"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import { AiFillBug } from "react-icons/ai";

const Navbar = () => {
  
  const currentPath = usePathname();

  const links = [
    {
      name: "Dashboard",
      href: "/",
    },
    {
      name: "Issues",
      href: "/issues",
    },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={classnames({
              "text-zinc-900": link.href === currentPath,
              "text-gray-500": link.href !== currentPath,
              "hover:text-zinc-800 transition-colors": true,
            })}
          >
            {link.name}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
