import React, { useState, useEffect } from "react";

import Image from "next/image";

import { IoMdCheckmark } from "react-icons/io";

const Topping = ({ topping, additionalTopping, setAdditionalTopping }) => {
  const [isChecked, setIsChecked] = useState(false);

  // handle checkbox
  const handleCheckBox = () => {
    setIsChecked(!isChecked);
  };

  // handle topping
  const handleTopping = () => {
    // use set to ensure unique values
    if (isChecked) {
      const newToppings = new Set([...additionalTopping, { ...topping }]);
      setAdditionalTopping(Array.from(newToppings));
    } else {
      const newToppings = additionalTopping.filter((toppingObject) => {
        return toppingObject.name !== topping.name;
      });
      setAdditionalTopping(newToppings);
    }
  };

  useEffect(() => {
    handleTopping();
  }, [isChecked]);

  return (
    <div
      className={`${
        isChecked && "border-orange"
      } w-full max-w-[110px] h-[140px] p-1 flex flex-col item-center justify-center
       border rounded-md bg-white relative`}
    >
      <Image src={topping.image} width={70} height={70} className="mb-2" />

      <div className="text-sm capitalize text-center font-medium">
        {topping.name}
      </div>

      <input
        className="absolute w-full h-full opacity-0 cursor-pointer"
        type="checkbox"
        checked={isChecked}
        onClick={handleCheckBox}
      />

      <div
        className={`${isChecked ? "opacity-100" : "opacity-0"} 
      absolute top-1 right-1`}
      >
        <IoMdCheckmark className="text-xl text-orange" />
      </div>
    </div>
  );
};

export default Topping;
