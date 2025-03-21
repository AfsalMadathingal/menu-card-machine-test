import React, { useState } from 'react'
import MenuButtons from '../components/MenuButtons'
import MenuListing from '../components/MenuListing'

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('')

  return (
    <div className="min-h-screen bg-black">
      <MenuButtons onCategoryChange={setActiveCategory} />
      <MenuListing category={activeCategory} />
    </div>
  )
}

export default Menu 