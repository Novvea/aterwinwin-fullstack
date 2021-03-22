import { useState, createContext, ReactChild } from 'react'

export const CardContext = createContext<any>(null)

export const CardProvider = (props: {children: React.ReactChild}) => {
  const [indexContext, setIndexContext] = useState(0)
  const [likedPicturesContext, setLikedPicturesContext] = useState([])
  const { children } = props;

  return (
    <CardContext.Provider value={{indexContext, setIndexContext, likedPicturesContext, setLikedPicturesContext}} >
      {children}
    </CardContext.Provider>
  )
}
