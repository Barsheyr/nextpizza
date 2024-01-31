import React, { useState, useEffect, useContext } from "react";

import Image from "next/image";

import SizeSelection from "./SizeSelection";
import CrustSelection from "./CrustSelection";
import Topping from "./Topping";
// context
import { CartContext } from "../context/CartContext";

const PizzaDetails = ({ pizza, setModal }) => {
  const [size, setSize] = useState("small");

  const [crust, setCrust] = useState("traditional");

  const [additionalTopping, setAdditionalTopping] = useState([]);

  const [additionalToppingPrice, setAdditionalToppingPrice] = useState(0);

  const [price, setPrice] = useState(0);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    size === "small"
      ? setPrice(parseFloat(pizza.priceSm + additionalToppingPrice).toFixed(2))
      : size === "medium"
      ? setPrice(parseFloat(pizza.priceMd + additionalToppingPrice).toFixed(2))
      : size === "large"
      ? setPrice(parseFloat(pizza.priceLg + additionalToppingPrice).toFixed(2))
      : null;
  });

  // SET ADDITIONAL TOPPINGS price
  useEffect(() => {
    if (additionalTopping.length > 0) {
      const toppingPrice = additionalTopping.reduce((a, c) => {
        return a + c.price;
      }, 0);
      setAdditionalToppingPrice(toppingPrice);
    } else {
      setAdditionalToppingPrice(0);
    }
  }, [additionalTopping]);

  return (
    <div className="flex flex-col lg:flex-row lg:ga[-x-8 h-full md:p-8">
      {/* top */}
      <div className="lg:flex-1 flex justify-center items-center">
        {/* pizza image */}
        <div className="max-w-[300px] lg:max-w-none mt-6 lg:mt-0">
          <Image
            width={450}
            height={450}
            src={pizza.image}
            alt="pizza"
            priority={1}
            className="mx-auto relative"
          />
        </div>
      </div>
      {/* details */}
      <div className="flex flex-col flex-1">
        <div className="flex-1 p-2 text-center lg:text-left">
          <div
            className="bg-white overflow-y-scroll h-[46vh]
             scrollbar-thin scrollbar-thumb-gray-200
           scrollbar-track-white pr-2"
          >
            <div className="font-semibold">
              <h2 className="capitalize text-3xl mb-1"> {pizza.name} </h2>

              {/* price and crust text */}
              <div className="mb-6 text-lg font-medium">
                <span>
                  {size === "small"
                    ? "25cm"
                    : size === "medium"
                    ? "30cm"
                    : size === "large"
                    ? "35cm"
                    : null}
                </span>

                <span>, {crust} crust </span>
              </div>
            </div>

            {/* size selection */}

            <SizeSelection pizza={pizza} size={size} setSize={setSize} />

            <CrustSelection crust={crust} setCrust={setCrust} />

            <div className="mb-4"> Choose topping </div>

            <div
              className="flex flex-wrap flex-1 gap-2 py-1 justify-center
            lg:justify-start"
            >
              {pizza.toppings?.map((topping, index) => {
                return (
                  <Topping
                    topping={topping}
                    additionalTopping={additionalTopping}
                    setAdditionalTopping={setAdditionalTopping}
                    key={index}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <div className="h-full flex items-center px-2 lg:items-end">
          <button
            onClick={() => {
              addToCart(
                pizza.id,
                pizza.name,
                pizza.image,
                price,
                additionalTopping,
                size,
                crust
              );
              setModal(false);
            }}
            className="btn btn-lg gradient w-full flex justify-center gap-x-2"
          >
            <div> Add to cart for </div>
            <div> $ {price} </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaDetails;