import React, { useState, useEffect } from 'react'
import axios from 'axios'
import topleftimage from '../assets/topleftimage.png'
import bottomright from '../assets/bottomright.png'
import menubg from '../assets/menubg.png'
import { useMenu } from '../context/MenuContext'

const api = import.meta.env.VITE_ENV == "LOCAL" ?  import.meta.env.VITE_BASEAPI  : ''

const MenuListing = ({ category }) => {
  const [menuItems, setMenuItems] = useState([])
  const [menuInfo, setMenuInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const {getMenu , fetchMenuItems} = useMenu()

  useEffect(() => {
    if (category) {
      handleFetchMenuItems()
    }
  }, [category])

  const handleFetchMenuItems = async () => {
    try {
      setIsLoading(true)
      const menuResponse = await getMenu(category)

      console.log("menuresponse",menuResponse);
      
      setMenuInfo(menuResponse)
      
      const itemsResponse = await fetchMenuItems(category)

      console.log(itemsResponse);
      
      setMenuItems(itemsResponse)
      setIsLoading(false)
    } catch (error) {
      console.error('Failed to fetch menu items:', error)
      setIsLoading(false)
    }
  }

  if (!category) {
    return (
      <div className="text-center text-white py-12">
        Please select a menu category
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="text-center text-white py-12">
        Loading menu items...
      </div>
    )
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto px-8 sm:px-12 py-12 sm:py-16">
      <div 
        className="relative border border-white/30 rounded-lg p-6 sm:p-8 md:p-12"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(${menubg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute -translate-x-1/2 -translate-y-1/2 left-0 top-0 w-16 sm:w-20 md:w-24">
          <img 
            src={topleftimage} 
            alt="" 
            className="w-full h-auto"
          />
        </div>
        <div className="absolute translate-x-1/2 translate-y-1/2 right-0 bottom-0 w-16 sm:w-20 md:w-24">
          <img 
            src={bottomright} 
            alt="" 
            className="w-full h-auto"
          />
        </div>

        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white uppercase tracking-wider">
            {menuInfo?.name || 'Menu'}
          </h2>
          {menuInfo?.description && (
            <p className="text-gray-400 mt-2 text-sm sm:text-base">
              {menuInfo.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-16 gap-y-6 md:gap-y-8">
          {menuItems?.map((item) => (
            <div key={item._id} className="border-b border-gray-700 pb-4 md:pb-6">
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-white text-lg sm:text-xl font-medium uppercase">
                  {item.name}
                </h3>
                <div className="text-white text-lg sm:text-xl ml-4 whitespace-nowrap">
                  ${item.price}
                </div>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {menuItems?.length === 0 && !isLoading && (
          <div className="text-center text-gray-400 py-8">
            No items available in this menu category
          </div>
        )}
      </div>
    </div>
  )
}

export default MenuListing 