import React, { useState, useRef, useEffect } from "react";
import menubg from "../assets/menubanner.png";
import axios from "axios";
import { useMenu } from "../context/MenuContext";

const api =
  import.meta.env.VITE_ENV == "LOCAL" ? import.meta.env.VITE_BASEAPI : "";

const MenuButtons = ({ onCategoryChange , activeCategory }) => {
  // const [menus, setMenus] = useState([])
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { menus, setMenus, fetchMenus } = useMenu();

  useEffect(() => {
    handlefetchMenus();
  }, []);

  const handlefetchMenus = async () => {
    try {
      await fetchMenus();

      if (menus.length > 0) {
        onCategoryChange(menus[0]._id);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch menus:", error);
      setIsLoading(false);
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleCategoryClick = (categoryId) => {
    console.log("Clicked category:", categoryId);
    
    onCategoryChange(categoryId);
  };

  if (isLoading) {
    return (
      <div className="relative w-full py-3 sm:py-6 bg-black">
        <div className="text-white text-center">Loading menu categories...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full py-3 sm:py-6">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${menubg})`,
          backgroundRepeat: "repeat-x",
          backgroundSize: "auto 100%",
        }}
      />

      <div className="relative max-w-full mx-auto">
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black to-transparent z-10"></div>

        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black to-transparent z-10"></div>

        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
          className="relative z-10 flex overflow-x-auto px-4 sm:px-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth cursor-grab active:cursor-grabbing"
        >
          <div className="flex gap-2 sm:gap-4 mx-auto">
            {menus?.map((menu) => (
              <div key={menu._id} className="snap-center shrink-0">
                <button
                  onClick={() => handleCategoryClick(menu._id)}
                  className={`whitespace-nowrap cursor-pointer px-4 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-bold transition-all duration-300
                    ${
                      activeCategory === menu._id
                        ? "bg-[#1E90FF] text-white"
                        : "bg-black text-white hover:bg-[#1E90FF] border-2 border-[#1E90FF]"
                    } 
                    uppercase tracking-wider`}
                >
                  {menu?.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuButtons;
