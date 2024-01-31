"use client";

import Image from "next/image";

import Modal from "react-modal";

import PizzaDetails from "./PizzaDetails";

import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";

Modal.setAppElement("body");

const modalStyles = {
  overlay: {
    backgroundColor: "rgba (0,0,0,0)",
  },
};

const Pizza = ({ pizza }) => {
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  return (
    <div className="group py-2 bg-slate-100 px-4 rounded-xl xl:px-2">
      <Image
        onClick={openModal}
        className="lg:group-hover:translate-y-3 transition-all duration-300 mb-8 cursor-pointer"
        width={270}
        height={270}
        src={pizza.image}
        alt=""
        priority={1}
      />

      <div onClick={openModal}>
        <div className="text-xl font-bold mb-3 capitalize cursor-pointer">
          {pizza.name}
        </div>
      </div>

      <div className="text-sm font-medium min-h-[60px] mb-6">
        {pizza.description}
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div className="hidden lg:flex text-xl font-semibold">
          Starts at {pizza.priceSm}
        </div>

        <button className="hidden lg:flex gradient text-white rounded-lg btn-sm font-semibold text-sm">
          Choose
        </button>

        <button
          onClick={openModal}
          className="btn btn-sm gradient text-sm lg:hidden px-3"
        >
          Start at {pizza.priceSm}
        </button>
      </div>

      {modal && (
        <Modal
          isOpen={modal}
          style={modalStyles}
          onRequestClose={closeModal}
          contentLabel="Pizza Modal"
          className="bg-white w-full h-full lg:max-w-[900px] lg:max-h-[600px] lg:rounded-[30px] lg:fixed lg:top-[50%] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[-50%] outline-none"
        >
          <div className="absolute z-30 right-2 top-2">
            <IoCloseOutline
              onClick={closeModal}
              className="text-4xl text-orange hover:scale-110 duration-200 cursor-pointer"
            />
          </div>

          <PizzaDetails pizza={pizza} modal={modal} setModal={setModal} />
        </Modal>
      )}
    </div>
  );
};

export default Pizza;
