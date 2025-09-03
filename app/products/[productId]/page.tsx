import { supabase } from "@/lib/supabase";
import ProductCarousel from "@/components/ProductCarousel";

type ProductPageProps = {
  params: Promise<{ productId: string }>;
};

export default async function Main(props: ProductPageProps) {
  const params = await props.params;
  const { data: product, error } = await supabase
    .from("listings")
    .select(`id,title,price,description,category, listing_images(url)`)
    .eq("id", params.productId)
    .maybeSingle();
  if (error) {
    return <div className="p-6 text-red-600">Error: {error.message}</div>;
  }

  if (!product) {
    return <h1>No product with id '{params.productId}' was found </h1>;
  }

  const productImages = product.listing_images.map((i) => i.url);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-2 gap-10">
        <div>
          <ProductCarousel
            images={productImages}
            title="Product Iamges"
          ></ProductCarousel>
        </div>
        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="mt-2 font-semibold">${product.price}</p>
        </div>
      </div>
    </div>
  );
}
