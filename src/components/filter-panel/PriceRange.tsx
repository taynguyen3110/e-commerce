import React, { useState } from "react";
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";
import { AccordionItem } from "../AccordionItem";

const PriceRange = () => {
  const [minPrice, setMinPrice] = useState(50);
  const [maxPrice, setMaxPrice] = useState(200);
  return (
    <div>
      <AccordionItem title="Price" heading={true} expand={true}>
        <div className="range-input">
          <MultiRangeSlider
            id="multi-range-slider-css"
            min={0}
            max={250}
            step={50}
            minValue={minPrice}
            maxValue={maxPrice}
            ruler={false}
            label={false}
            onInput={(e: ChangeResult) => {
              setMinPrice(e.minValue);
              setMaxPrice(e.maxValue);
            }}
          ></MultiRangeSlider>
        </div>
      </AccordionItem>
    </div>
  );
};

export default PriceRange;
