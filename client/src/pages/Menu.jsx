import React, { useEffect, useState } from 'react'
import MenuButtons from '../components/MenuButtons'
import MenuListing from '../components/MenuListing'
import { useMenu } from '../context/MenuContext';

const Menu = () => {
  const {menus} = useMenu();
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    if (menus?.length > 0) {
      setActiveCategory(menus[0]._id);
    }
  }, [menus]);
  return (
    <div className="min-h-screen bg-black">
      <MenuButtons onCategoryChange={setActiveCategory}  activeCategory={activeCategory} />
      <MenuListing category={activeCategory} />
    </div>
  )
}

export default Menu 