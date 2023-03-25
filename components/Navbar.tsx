import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import clsx from "clsx";

export default function Navbar() {
  return (
        <div className={clsx(
            "container h-16 mx-auto px-4 py-2",
            "bg-gray-400/30 dark:bg-[#121212]/30",
            "flex items-center space-x-4",
            "rounded-lg",
            "transition-colors duration-300 ease-in-out",
            "backdrop-blur-xl"
        )}>
            <div className="grow-0">
                <Link title="Go to home page" href="/" className="text-xl font-bold">FelScript</Link>
            </div>
            <div className="grow">
                <ul className="list-none flex">
                <li className="mr-4">
                        <Link href="/about" className="">About</Link>
                    </li>
                    <li>
                        <Link href="/contact" className="">Contact</Link>
                    </li>
                </ul>
            </div>
            <div className="grow-0">
                <ul className="flex justify-end">
                    <li>
                        <ThemeSwitch/>
                    </li>
                </ul>
            </div>
        </div>
  )
}
