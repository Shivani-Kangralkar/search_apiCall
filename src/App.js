import React from 'react'
import Search from './Search'
import Pagination from './Pagination'
import News from './News'
// import useGlobalContext from './Context'
import "./App.css"

const App = () => {

  // const data =  useGlobalContext()
  return (
    <>
      <Search />
      <Pagination />
      <News />
      </>
  )
}

export default App
