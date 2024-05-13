//add a product to local storage
export const addFavoritesFromLocalStorage=(product)=>{
    const favorites=getFavoritesFromLocalStorage()
    if(!favorites.some((p)=>p._id===product._id)){
        favorites.push(product);
        localStorage.setItem("favorites",JSON.stringify(favorites))

    }
}

//remove a product to local storage
export const removeFavoritesFromLocalStorage=(productId)=>{
    const favorites=getFavoritesFromLocalStorage()
    const updateFavorites=favorites.filter((product)=>product._id!==productId)
    localStorage.setItem("favorites",JSON.stringify(updateFavorites))

}


//retrieve favorites from a local storage
export const getFavoritesFromLocalStorage=()=>{
    const favoritesJSON=localStorage.getItem("favorites");
    return favoritesJSON ? JSON.parse(favoritesJSON):[];
}