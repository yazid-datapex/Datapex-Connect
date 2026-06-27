import type { ProductProfile } from "@/types/content";

type ProductCardProps = {
  product: ProductProfile;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article>
      <h2>{product.name}</h2>
      <p>{product.summary}</p>
    </article>
  );
}
