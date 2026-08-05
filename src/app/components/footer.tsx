import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-slate-800 px-8 py-6 flex justify-between items-center">
            <Link href="/" className="font-merriweather text-white text-sm">
                Handcrafted <span className="text-yellow-300">Haven</span>
            </Link>
            <span className="text-slate-500 text-xs tracking-wide">© 2026 Team 14 · WDD 430</span>
        </footer>
    );
}