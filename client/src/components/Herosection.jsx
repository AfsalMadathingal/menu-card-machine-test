import React, { useState } from "react";
import heroimage from "../assets/herosection.jpeg";
import MenuModal from "./MenuModal";
import MenuItemModal from "./MenuItemModal";
import { useMenu } from "../context/MenuContext";

const Herosection = () => {
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isMenuItemModalOpen, setIsMenuItemModalOpen] = useState(false);

  const handleModalOpenAndClose = () => {
    setIsMenuModalOpen(!isMenuModalOpen);
  };

  const handleMenuItemModalOpenAndClose = () => {
    setIsMenuItemModalOpen(!isMenuItemModalOpen);
  };

  return (
    <div className="relative w-full h-[80vh] bg-black m-0 p-0">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${heroimage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: "0.6",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-4">MENU</h1>
        <p className="text-lg md:text-xl text-white max-w-2xl mx-auto">
          Please take a look at our menu featuring food, drinks, and brunch. If
          you'd like to place an order, use the "Order Online" button located
          below the menu.
        </p>
        <div className=" left-0 right-0 flex justify-center mt-10">
          <button
            onClick={handleModalOpenAndClose}
            className="bg-blue-400 text-white text-2xl font-bold cursor-pointer px-4 py-2  "
          >
            Add Menu +{" "}
          </button>
          <button
            onClick={handleMenuItemModalOpenAndClose}
            className="bg-red-400 text-white text-2xl font-bold cursor-pointer px-4 py-2  ml-4 "
          >
            Add Items +{" "}
          </button>
        </div>
      </div>
      <MenuModal
        isOpen={isMenuModalOpen}
        onClose={handleModalOpenAndClose}
        onSuccess={handleModalOpenAndClose}
      />
      <MenuItemModal
        isOpen={isMenuItemModalOpen}
        onClose={handleMenuItemModalOpenAndClose}
        onSuccess={handleMenuItemModalOpenAndClose}
      />
    </div>
  );
};

export default Herosection;
