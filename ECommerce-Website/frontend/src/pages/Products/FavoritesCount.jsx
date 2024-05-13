import React from 'react'
import { useSelector } from 'react-redux'

const FavoritesCount = () => {
    const favorites=useSelector(state=>state.favorites)
    const favoriteCount=favorites.length;
  return (
    <div className='absolute left-3 top-11'>
        {favoriteCount > 0 && (
            <span className='px-1 py-0 text-black bg-pink-500 rounded-full text-s'>
                {favoriteCount}
            </span>
        )}
    </div>
  )
}

export default FavoritesCount