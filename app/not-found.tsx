import Link from "next/link";

export default function notFound() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-indigo-50 to-white"
      ></div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="text-center text-9xl font-bold">404</div>
        <p className="text-center text-gray-600">
          The page you are looking for does not exist.
        </p>
        <p className="cursor-pointer text-center pt-4 text-indigo-600">
          <Link href="/">Go back to the homepage...</Link>
        </p>
      </div>
    </section>
  );
}
