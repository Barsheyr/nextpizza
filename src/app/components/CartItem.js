import { BiPlus, BiMinus } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";

import Image from "next/image";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartItem = ({ pizza }) => {
  const { removeItem, increaseAmount, decreaseAmount } =
    useContext(CartContext);
  return (
    <div className="select-none">
      <div className="flex gap-x-4 mb-2">
        {/* image */}
        <div className="flex justify-center items-center">
          {/* <Image src={pizza.image} width={90} height={90} alt="" /> */}
          <Image alt="ee" src={pizza} />
        </div>

        {/* info */}
        <div className="flex-1 items-center gap-x-1">
          <div className="text-lg capitalize font-bold"> {pizza.name} </div>
          <div className="flex flex-col gap-y-1">
            <div className="capitalize font-medium text-[15px]">
              {pizza.crust} crust
            </div>
            <div className="capitalize mb-2 font-medium text-[15px]">
              {pizza.size} size
            </div>

            {/* quality control */}
            <div className="flex items-center gap-x-5">
              <div
                onClick={() => decreaseAmount(pizza.id, pizza.price)}
                className="w-[18px] h-[18px] rounded-full flex justify-center
              item-center cursor-pointer text-white gradient"
              >
                <BiMinus />
              </div>
              <div
                className="font-semibold max-w-[30px] justify-center items-center
              text-sm flex flex-1"
              >
                {pizza.amount}
              </div>
              <div
                onClick={() => increaseAmount(pizza.id, pizza.price)}
                className="w-[18px] h-[18px] rounded-full flex justify-center
              item-center cursor-pointer text-white gradient"
              >
                <BiPlus />
              </div>
            </div>
          </div>
        </div>

        {/* amount and remove */}
        <div className="flex flex-col justify-between">
          <div
            onClick={() => removeItem(pizza.id, pizza.price)}
            className="text-2xl text-orange flex justify-center items-center self-end cursor-pointer
              hover:scale-110 duration-100 transition-all"
          >
            <IoCloseOutline />
          </div>

          <div>
            <span className="text-[17px] font-medium font-robotoCondensed">
              ${parseFloat(pizza.price * pizza.amount).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* topping */}
      <div className="flex flex-wrap items-center gap-3 p-6 border-b border-black/10">
        <div className="font-medium">
          Toppings: {pizza.additionalTopping.length === 0 && "None"}{" "}
        </div>
        {pizza.additionalTopping.map((topping, index) => {
          return (
            <div
              key={index}
              className="capitalize text-sm gradient font-medium px-3 py-1 rounded-full leading-none"
            >
              {topping.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CartItem;
