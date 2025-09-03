import { supabase } from "@/lib/supabase";
import { fetchImages } from "@/lib/unsplash";
import { Product,ProductCreationRequest } from "@/models/product";
import { NextResponse } from "next/server";

export async function POST() {
  // Clear
  await supabase.from("listing_images").delete().neq("id", 0);
  await supabase.from("listings").delete().neq("id", 0);
  const { data: data, error } = await supabase
    .from("listings")
    .upsert(
      productsCreationRequests,
      { onConflict: "id" } // 👈 overwrite if same id already exists
    )
    .select();

  if (error) {
    console.error("Listings insert failed", error);
    return;
  }
  if (!data) {
    console.error("Listings empty response from upsert listings");
    return;
  }


 const products: Product[] = data;

  for (const p of products) {
    const imageUrls = await fetchImages(p.description, 3);
    const imageRows = imageUrls.map((url) => ({ listing_id: p.id, url }));
    const { error: theError } = await supabase
      .from("listing_images")
      .upsert(imageRows, { onConflict: "listing_id,url" });

    if (theError) {
      console.error("Error adding images", theError);
    }
    console.log(`Seeded ${p.title} with image ${imageUrls}`);
  }
  return NextResponse.json({ status: "ok", count: products.length });
}


const productsCreationRequests: ProductCreationRequest[] = [
  {
    title: "Red T-Shirt",
    price: 199,
    description: "A comfy red cotton t-shirt with short sleeves.",
    category: "tshirt",
  },
  {
    title: "Blue Socks",
    price: 49,
    description: "Pair of warm blue wool socks, size M.",
    category: "socks",
  },
  {
    title: "Leather Wallet",
    price: 399,
    description: "Genuine brown leather wallet with coin pocket.",
    category: "accessories",
  },
  {
    title: "Baseball Cap",
    price: 129,
    description: "Classic black cotton baseball cap with adjustable strap.",
    category: "hats",
  },
  {
    title: "Running Shoes",
    price: 899,
    description: "Lightweight running shoes with breathable mesh fabric.",
    category: "shoes",
  },
];
