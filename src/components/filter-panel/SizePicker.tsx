import React, { useState } from "react";
import { AccordionItem } from "../AccordionItem";

const SizePicker = () => {
  const [sizeInput, setSizeInput] = useState("");

  return (
    <div>
      <AccordionItem title="Size" heading={true} expand={true}>
        <div className="mt-3 flex flex-wrap gap-3">
          <button
            className="px-5 py-2 bg-background rounded-full"
            onClick={() => {
              setSizeInput("S");
            }}
            style={
              sizeInput === "S"
                ? { backgroundColor: "black", color: "white" }
                : {}
            }
          >
            Small
          </button>
          <button
            className="px-5 py-2 bg-background rounded-full"
            onClick={() => {
              setSizeInput("M");
            }}
            style={
              sizeInput === "M"
                ? { backgroundColor: "black", color: "white" }
                : {}
            }
          >
            Medium
          </button>
          <button
            className="px-5 py-2 bg-background rounded-full"
            onClick={() => {
              setSizeInput("L");
            }}
            style={
              sizeInput === "L"
                ? { backgroundColor: "black", color: "white" }
                : {}
            }
          >
            Large
          </button>
        </div>
      </AccordionItem>
    </div>
  );
};

export default SizePicker;
