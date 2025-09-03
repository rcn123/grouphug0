import Link from "next/link";
import Image from "next/image";

import { supabase } from "@/lib/supabase";

// const products : Product[]=
// [
//     {id: 1, title: 'Product number 1', price : 11, description : 'desc', category : 'tshirt'},
//     {id: 2, title: 'Product number 2', price : 22, description : 'desc', category : 'socks'},
// ]


export default async function Main() {
  const { data, error } = await supabase
    .from("listings")
    .select(`id,title,price,description,category, listing_images(url)`)   
    .limit(1, { foreignTable: 'listing_images' });;

  if (error) {
    return <div>Error during product loading: &apos;{error.message}&apos;</div>;
  }

  if (!data) {
    return <div>Data is null</div>;
  }

  const products = data;

  if (!products || products.length === 0) {
    return <div>No products</div>;
  }

  function toCorrectUrl(url: string, height: number, width: number) {
    return `${url}&w=${width}&h=${height}&fit=crop`;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">These are all our products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/products/${p.id}`}
            className="block border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            <div className="aspect-square relative w-full">
              <Image
                src={toCorrectUrl(p.listing_images[0].url, 400, 400)}
                alt={p.description}
                fill             
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover"
              />
              
              <div className="absolute inset-x-0 bottom-0 bg-black/60 p-4">
                <h2 className="text-white text-lg font-semibold">{p.title}</h2>
                <p className="text-white">${p.price}</p>
              </div>
   
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
