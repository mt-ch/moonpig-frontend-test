import axios from "axios";
import { Link, useParams } from "react-router-dom";

import { paths } from "../../app/paths";

import Button from "../../components/ui/button";
import Image from "../../components/ui/image";
import Loader from "../../components/ui/loader";

import { useProduct } from "./useProduct";

export default function ProductDetailPage() {
  const { productId = "" } = useParams();
  const { product: card, error, loading } = useProduct(productId);

  if (axios.isAxiosError(error) && error.response?.status === 404) {
    return (
      <div className="flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-bold">Not found</h1>
          <p className="text-gray-500">We couldn't find that product.</p>
        </div>
        <div>
          <Link to={paths.products} className="bg-blue-700 text-white px-4 py-3 rounded-md hover:bg-blue-800 cursor-pointer inline-block">
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  if (error) throw error;
  if (loading || !card)
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8 lg:gap-y-0">
      <div className="aspect-3/4 w-full h-auto p-6 lg:p-8 bg-gray-200 rounded-sm flex items-center justify-center">
        {card.imageUrl && <Image src={card.imageUrl} alt={card.title} className="aspect-auto w-full object-contain" />}
      </div>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">{card.title}</h1>
          <p dangerouslySetInnerHTML={{ __html: card.descriptionHtml }} className="text-gray-500 text-base" />
        </div>
        <Button onClick={() => {}}>Buy Me</Button>
      </div>
    </div>
  );
}
