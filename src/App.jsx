import { useState } from 'react'
import Navbar from './components/navbar'
import InventoryHomepage from './Pages/inventoryhomepage'
// import AddProductForm from './Pages/productform'


function App() {
 

  return (
    <>
      <Navbar/>
      {/* <AddProductForm/> */}
      <InventoryHomepage/>
    </>
  )
}

export default App
