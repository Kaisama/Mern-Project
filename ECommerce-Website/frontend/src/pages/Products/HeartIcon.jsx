import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFavoritesFromLocalStorage, getFavoritesFromLocalStorage, removeFavoritesFromLocalStorage } from '../../Utils/localStorage'
import { addToFavorites, removeFromFavorites, setFavorites } from '../../redux/features/favorites/favoriteSlice'
import { FaHeart } from 'react-icons/fa'

const HeartIcon = ({product}) => {
    const dispatch=useDispatch()
    const favorites=useSelector(state=>state.favorites)||[]
    const isFavorite=favorites.some((p)=>p._id===product._id)

    useEffect(()=>{
        const favoritesFromLocalStorage=getFavoritesFromLocalStorage()
        dispatch(setFavorites(favoritesFromLocalStorage))
    },[])

    const toggleFavorites=()=>{
        if(isFavorite){
            dispatch(removeFromFavorites(product))
            //remove the product from local storage
            removeFavoritesFromLocalStorage(product._id)
        }else{
            dispatch(addToFavorites(product));
            //add the product to  localStorage 
            addFavoritesFromLocalStorage(product)
        }
    }
  return (
    <div onClick={toggleFavorites} className='absolute cursor-pointer top-4 right-4'>
        {isFavorite?(<FaHeart  className='text-pink-500'/>):(
            <FaHeart className='text-gray'/>
        )}
        
    </div>
  )
}

export default HeartIcon