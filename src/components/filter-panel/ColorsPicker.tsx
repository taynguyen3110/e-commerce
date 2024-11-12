import React, { useState } from "react";
import { formatTitle } from "../../utils/formatTitle";
import { AccordionItem } from "../AccordionItem";
import { Colors } from "../../services/productServices";

interface ColorsPickerProps {
    colors: Colors;
}

const ColorsPicker = ({colors} : ColorsPickerProps) => {
  const [colorInput, setColorInput] = useState("");

  return (
    <div>
      <AccordionItem title="Colors" heading={true} expand={true}>
        <div className="flex flex-wrap gap-3 mt-4">
          {Object.entries(colors).map(([key, value]) => (
            <button
              key={key}
              className="p-5 rounded-full border hover:border-black"
              title={formatTitle(key)}
              style={{
                backgroundColor: value,
                outline:
                  key === colorInput ? "2px solid black" : "2px solid white",
              }}
              onClick={() => {
                setColorInput(key);
              }}
            ></button>
          ))}
        </div>
      </AccordionItem>
    </div>
  );
};

export default ColorsPicker;
