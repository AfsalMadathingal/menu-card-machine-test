import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const api = import.meta.env.VITE_ENV == "LOCAL" ? import.meta.env.VITE_BASEAPI : ''

const MenuContext = createContext()

export const MenuProvider = ({ children }) => {
  const [menus, setMenus] = useState([])
  const [menuItems, setMenuItems] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  // Fetch all menus
  const fetchMenus = async () => {
    try {
      const response = await axios.get(`${api}/api/menus`)
      setMenus(response.data)
      setIsLoading(false)
    } catch (error) {
      console.error('Failed to fetch menus:', error)
      setIsLoading(false)
    }
  }

  // Fetch menu items for a specific menu
  const fetchMenuItems = async (menuId) => {
    try {
      const response = await axios.get(`${api}/api/menu-items/menu/${menuId}`)
      setMenuItems(prev => ({
        ...prev,
        [menuId]: response.data
      }))
      return response.data
    } catch (error) {
      console.error('Failed to fetch menu items:', error)
      return []
    }
  }

  // Add new menu
  const addMenu = async (menuData) => {
    try {
      const response = await axios.post(`${api}/api/menus`, menuData)
      setMenus(prev => [...prev, response.data])
      return response.data
    } catch (error) {
      console.error('Failed to add menu:', error)
      throw error
    }
  }

  // Add new menu item
  const addMenuItem = async (menuItemData) => {
    try {
      const response = await axios.post(`${api}/api/menu-items`, menuItemData)
      const menuId = menuItemData.menuId
      setMenuItems(prev => ({
        ...prev,
        [menuId]: [...(prev[menuId] || []), response.data]
      }))
      return response.data
    } catch (error) {
      console.error('Failed to add menu item:', error)
      throw error
    }
  }

  //get menu by id
  const getMenu = async (menuId) => {
    try {
      const response = await axios.get(`${api}/api/menus/${menuId}`)
      return response.data
    } catch (error) {
      console.error('Failed to get menu:', error)
      throw error
    }
  }




  // Initial fetch
  useEffect(() => {
    fetchMenus()
  }, [])

  const value = {
    menus,
    menuItems,
    isLoading,
    getMenu,
    fetchMenus,
    fetchMenuItems,
    addMenu,
    addMenuItem,
    
  }

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  )
}

export const useMenu = () => {
  const context = useContext(MenuContext)
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider')
  }
  return context
} 