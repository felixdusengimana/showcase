import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
        <div className="flex">
            <div className="grow-0">
                <Link title="Go to home page" href="/" className="text-2xl font-bold text-gray-800">FelScript</Link>
            </div>
            <div className="grow">
                <ul className="flex justify-end">
                    <li className="mr-4">
                        <Link href="/about" className="text-gray-800">About</Link>
                    </li>
                    <li>
                        <Link href="/contact" className="text-gray-800">Contact</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  )
}
