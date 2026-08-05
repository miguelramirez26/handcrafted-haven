import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-slate-800 px-8 py-4 flex justify-between items-center">
            <Link href="/" className="font-merriweather text-white text-lg">
                Handcrafted <span className="text-yellow-300">Haven</span>
            </Link>
            <div className="flex gap-7 text-slate-400 text-xs uppercase tracking-widest">
                <Link href="/product-listing" className="hover:text-white transition-colors">Shop</Link>
                <Link href="/seller" className="hover:text-white transition-colors">Artisans</Link>
                <Link href="/about" className="hover:text-white transition-colors">About</Link>
            </div>
            <button className="bg-amber-700 hover:bg-amber-800 text-white text-xs uppercase tracking-wider px-4 py-2 rounded transition-colors">
                Sign in
            </button>
        </nav>
    )
}