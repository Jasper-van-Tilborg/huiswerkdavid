import Image from "next/image";
import Link from "next/link";
import { productType } from "../../../types/product";

export default async function DetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const product = await fetch(`https://fakestoreapi.com/products/${id}`).then(
    (response) => response.json() as Promise<productType>
  );
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-indigo-50 to-white"
      ></div>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold">Product Details</h1>
        </header>
        <div key={product.id}>
          <h1 className="text-2xl font-bold pb-4">{product.title}</h1>
          <p>{product.description}</p>
          <p className="text-lg font-bold py-4">€ {product.price}</p>
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={300}
          />
        </div>

        <p className="cursor-pointer text-center pt-4 text-indigo-600">
          <Link href="/products">Back to all products</Link>
        </p>
      </main>
    </section>
  );
}
