import React, { useContext, useReducer, useEffect } from "react";
import reducer from "./Reducer"


const initialState = {
  isLoading: true,
  query: "HTML",
  nbPages: 0,
  page: 0,
  hits: []
}

const API = "https://hn.algolia.com/api/v1/search?"
const AppContext = React.createContext()

const AppProvider = ({children}) => {
  const [state,dispatch] = useReducer(reducer,initialState)

  const fetchApiData = async(url) => {

    dispatch({type: "SET_LOADING"})
      try {
          const res = await fetch (url)
          const data = await res.json()
          console.log(data);
          dispatch({
            type: "GET_STORIES",
            payload: {
              hits: data.hits,
              nbPages: data.nbPages
            }
          })
      }
      catch (error) {
          console.log(error);
      }
  }
  
  //To remove data
  const removePost = (post_ID) => {
    dispatch({type: "REMOVE_POST",payload: post_ID})
  }

  //To Search
  const searchPost = (searchQuery) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload:searchQuery
    })
  }

  //Prev and Next Page
  const getPrevPage = () => {
    dispatch({type: "PREV_PAGE"})
  }

  const getNextPage = () => {
    dispatch({type: "NEXT_PAGE"})
  }

  useEffect(() => {
      fetchApiData(`${API}query=${state.query}&page=${state.page}`)
  },[state.query,state.page])

    return (
        <AppContext.Provider value ={{...state, removePost, searchPost, getPrevPage, getNextPage}}>{children}</AppContext.Provider>
    )
}

const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider, useGlobalContext}