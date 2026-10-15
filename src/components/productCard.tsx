import type { ProductSummary } from "../api/types";
import Image from "./ui/image";

interface ProductCardProps {
  card: ProductSummary;
}

const ProductCard = ({ card }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg h-full w-full flex flex-col gap-y-4">
      <div className="aspect-2/3 w-full h-auto p-8 bg-gray-200 rounded-sm flex items-center justify-center">
        <Image src={card.imageUrl} alt={card.title} className="aspect-auto w-full object-contain" />
      </div>
    </div>
  );
};

export default ProductCard;
