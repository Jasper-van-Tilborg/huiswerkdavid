import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-white/80 border-b border-gray-100 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="mx-auto border-t border-gray-100 max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>&copy; ACME - {currentYear}. All rights reserved.</p>
        <nav className="flex items-center gap-4">
          <Link href="/" className="hover:text-indigo-600">
            Home
          </Link>
          <Link href="/products" className="hover:text-indigo-600">
            Products
          </Link>
          <Link href="/contact" className="hover:text-indigo-600">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
