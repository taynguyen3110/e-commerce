import React, { useEffect, useState } from "react";
import { AccordionItem } from "../AccordionItem";
import { ItemCard } from "../ItemCard";
import { getProductsColors, Colors } from "../../services/productServices";
import filerIcon from "../../assets/icons/filter.png";
import { formatTitle } from "../../utils/formatTitle";
import { ListItem } from "../ListItem";
import { motion } from "framer-motion";
import Button from "../Button";
import PriceRange from "./PriceRange";
import ColorsPicker from "./ColorsPicker";
import SizePicker from "./SizePicker";

interface FilterPanelProps {
  closeFilter: () => void;
}

export const FilterPanel = ({ closeFilter }: FilterPanelProps) => {
  const [colors, setColors] = useState<Colors>({});

  useEffect(() => {
    fetchProductsColors();
  }, []);

  async function fetchProductsColors() {
    const colors = await getProductsColors();
    setColors(colors);
  }

  return (
    <>
      <div className="fixed lg:hidden top-0 left-0 bg-black opacity-20 h-full w-screen z-10"></div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="sm:sticky lg:static lg:h-auto top-0 left-0 h-0 lg:w-[25%] sm:w-0 w-full z-40"
      >
        <div className="relative lg:w-full sm:w-96 sm:h-auto bg-white border border-opacity-20 z-50 rounded-2xl w-[calc(100%+32px)] sm:left-0 -left-4">
          <div className="filter-container container px-4 py-3 lg:h-auto sm:h-screen h-auto sm:overflow-y-scroll sm:overflow-x-hidden">
            <div className="flex justify-between relative items-center">
              <h4 className="font-bold text-xl">Filters</h4>
              <i
                className="bx bx-x relative -right-[6px] opacity-40 text-3xl lg:hidden"
                onClick={() => closeFilter()}
              ></i>
              <img
                src={filerIcon}
                className="self-end hidden lg:block"
                alt="Filter Icon"
              />
            </div>
            <hr className="my-2" />
            <div>
              <AccordionItem title="T-shirts">
                <ul>
                  <ListItem>Basic Tees</ListItem>
                  <ListItem>Long Sleeve Tees</ListItem>
                  <ListItem>Short Sleeve Tees</ListItem>
                </ul>
              </AccordionItem>
              <AccordionItem title="Shorts">
                <ul>
                  <ListItem>Athletic Shorts</ListItem>
                  <ListItem>Running Shorts</ListItem>
                </ul>
              </AccordionItem>
              <AccordionItem title="Shirts">
                <ul>
                  <ListItem>Casual Shirts</ListItem>
                  <ListItem>Button-Down Shirts</ListItem>
                  <ListItem>Oxford Shirts</ListItem>
                </ul>
              </AccordionItem>
              <AccordionItem title="Hoodie">
                <ul>
                  <ListItem>Pullover Hoodies</ListItem>
                  <ListItem>Crop Hoodies</ListItem>
                </ul>
              </AccordionItem>
              <AccordionItem title="Jeans">
                <ul>
                  <ListItem>Straight-Leg Jeans</ListItem>
                  <ListItem>Skinny Jeans</ListItem>
                </ul>
              </AccordionItem>
            </div>
            <hr className="my-2" />
            <PriceRange />
            <hr className="my-2" />
            <ColorsPicker colors={colors} />
            <hr className="my-2" />
            <SizePicker />
            <hr className="my-2" />
            <div>
              <AccordionItem title="Dress Style" heading={true} expand={true}>
                <AccordionItem title="Casual">
                  <ul>
                    <ListItem>Everyday wear</ListItem>
                    <ListItem>Casual outings</ListItem>
                  </ul>
                </AccordionItem>
                <AccordionItem title="Formal">
                  <ul>
                    <ListItem>Business attire</ListItem>
                    <ListItem>Formal events</ListItem>
                    <ListItem>Dress shirts</ListItem>
                    <ListItem>Suits</ListItem>
                  </ul>
                </AccordionItem>
                <AccordionItem title="Party">
                  <ul>
                    <ListItem>Evening wear</ListItem>
                    <ListItem>Cocktail dresses</ListItem>
                    <ListItem>Party outfits</ListItem>
                  </ul>
                </AccordionItem>
                <AccordionItem title="Gym">
                  <ul>
                    <ListItem>Activewear</ListItem>
                    <ListItem>Sportswear</ListItem>
                    <ListItem>Gym gear</ListItem>
                  </ul>
                </AccordionItem>
              </AccordionItem>
            </div>
            <div className="flex items-center justify-center mt-3">
              <Button className="w-full">Apply Filter</Button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
