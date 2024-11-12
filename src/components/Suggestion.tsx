import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ItemCard } from "./ItemCard";
import { getRandomProducts, Product } from "../services/productServices";
import useMediaQuery from "../shared/hooks/useMediaQuery";
import { toTitleCase } from "../utils/toTitleCase";
import Button from "./Button";

interface Props {
  title: string;
  viewButton?: boolean;
}

export const Suggestion: React.FC<Props> = ({
  viewButton = true,
  title,
}: Props) => {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [itemCount, setItemCount] = useState<number>(0);

  const navigate = useNavigate();

  const xsScreen = useMediaQuery("(max-width: 640px)");
  const smScreen = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    fetchSuggestion();
  }, []);

  useEffect(() => {
    setItemCount(xsScreen ? 2 : smScreen ? 3 : 4);
  }, [xsScreen, smScreen]);

  async function fetchSuggestion() {
    const productData = await getRandomProducts(4);
    setProductsData(productData);
  }

  return (
    <div className="flex flex-col items-stretch">
      <h1 className="md:text-5xl text-3xl lg:pt-20 pt-12 lg:pb-16 pb-8 text-center">
        {title}
      </h1>
      <div className="flex md:flex-nowrap flex-wrap md:justify-stretch justify-evenly gap-3">
        {productsData.slice(0, itemCount).map((p, index) => {
          return <ItemCard key={index} product={p} itemEachRows={itemCount} />;
        })}
      </div>
      {viewButton && (
        <div className="flex justify-center">
          <Button
            purpose="secondary"
            className="md:mt-10 lg:mb-16 mt-2 mb-10 sm:px-20 w-full sm:w-auto border-black border border-opacity-10"
            onClick={() => {
              navigate(`/category/${toTitleCase(title)}`);
            }}
          >
            View All
          </Button>
        </div>
      )}
    </div>
  );
};
