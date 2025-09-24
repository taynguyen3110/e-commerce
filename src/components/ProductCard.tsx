import React from "react";

export interface Product {
  category: string;
  colors: string[];
  description: string;
  imagePrefix: string;
  imgSource: string;
  name: string;
  price: number;
  rating: number;
  sale: number;
}

const ProductCard: React.FC<Product> = ({
  category,
  colors,
  description,
  imagePrefix,
  imgSource,
  name,
  price,
  rating,
  sale,
}) => {
  return (
    <a className="cursor-pointer" href={`/product/${imagePrefix}`}>
      <div className="bg-white !cursor-pointer rounded-lg shadow-md overflow-hidden flex flex-col max-w-[80%]">
        <img src={imgSource} alt={name} className="w-full h-56 object-cover" />
        <div className="p-4 flex flex-col gap-2">
          <h2 className="cursor-pointer text-md font-normal">{name}</h2>
          {/* <div className="flex gap-2">
            {colors.map((color) => (
              <span
                key={color}
                className="cursor-pointer px-2 py-1 text-xs bg-gray-100 rounded-full"
              >
                {color.replace("+", " ")}
              </span>
            ))}
          </div> */}
          <p className="cursor-pointer text-sm text-gray-600 line-clamp-2">{description}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="cursor-pointer text-lg font-bold text-black">${price}</span>
            {sale > 0 && (
              <span className="cursor-pointer text-xs text-red-500 bg-red-100 px-2 py-1 rounded-full">
                {sale}% OFF
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <span className="cursor-pointer text-yellow-500">&#9733;</span>
            <span className="cursor-pointer text-sm">{rating}</span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ProductCard;
