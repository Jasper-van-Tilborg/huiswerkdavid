import Image from "next/image";
import Link from "next/link";
import { poppins } from "../fonts";
import { productType } from "../../types/product";

export default async function FakeStore() {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (response) => response.json() as Promise<productType[]>
  );

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-indigo-50 to-white"
      ></div>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold">All products</h1>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product: productType) => (
            <article
              key={product.id}
              className="rounded-2xl bg-white border border-gray-300 shadow-sm overflow-hidden flex flex-col"
            >
              <div className="h-40 grid place-items-center">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={80}
                  height={80}
                />
              </div>
              <div className="p-6 flex flex-col gap-3 flex-1">
                <h2 className={`${poppins.className} font-semibold text-lg`}>
                  {product.title}
                </h2>
                <p className="text-sm text-gray-600">{product.description}</p>
                <div className="mt-1 text-sm">€ {product.price}</div>
                <Link
                  href={`/products/${product.id}`}
                  className="mt-auto inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-700"
                >
                  View
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
    </section>
  );
}
