import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useCreateReviewMutation, useGetProductsDetailsQuery } from '../../redux/api/productApiSlice'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import HeartIcon from './HeartIcon'
import { FaBox, FaShoppingCart, FaStar } from 'react-icons/fa'
import Rating from './Ratings'
import Ratings from './Ratings'
import ProductTabs from './ProductTabs'

const ProductDetails = () => {
    const { id: productId } = useParams()
    const navigate = useNavigate()

    const [qty, setQty] = useState()
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const { data: product, isLoading, refetch, error } = useGetProductsDetailsQuery(productId)

    const { userInfo } = useSelector(state => state.auth)
    const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation()

    return (
        <>
            <div>
                <Link to='/' className='font-semibold text-black hover:underline ml-[10rem]'>Go Back</Link>
            </div>
            {isLoading ? (<Loader />) : error ? (<Message variant='danger'>{error?.data?.message || error.message}</Message>) : (
                <>
                    <div className="relative flex flex-wrap items-between mt-[2rem] ml-[10rem]">
                        <div>
                            <img src={product.image} alt={product.name} className='w-full xl:w-[50rem] lg:w-[45rem] md:w-[30rem] sm:w-[20rem] mr-[2rem]' />
                            <HeartIcon product={product} />
                        </div>

                        <div className="flex flex-wrap justify-between">
                            <h2 className="text-2xl font-semibold">{product.name}</h2>
                            <p className='my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-[#B0B0B0]'>{product.description}</p>
                            <p className="my-4 text-5xl font-extrabold">$ {product.price}</p>
                            <div className="two">
                                <h1 className="flex items-center mb-6">
                                    <FaStar className="mr-2 text-white" /> Ratings: {rating}
                                </h1>
                                <h1 className="flex items-center mb-6">
                                    <FaShoppingCart className="mr-2 text-white" /> Quantity:{" "}
                                    {product.quantity}
                                </h1>
                                <h1 className="flex items-center mb-6 w-[10rem]">
                                    <FaBox className="mr-2 text-white" /> In Stock:{" "}
                                    {product.countInStock}
                                </h1>
                            </div>
                            <div className="flex flex-wrap justify-between">
                                <Ratings
                                    value={product.rating}
                                    text={`${product.numReviews} reviews`}
                                />
                                {product.countInStock > 0 && (
                                    <div>
                                        <select
                                            value={qty}
                                            onChange={(e) => setQty(e.target.value)}
                                            className="p-2 w-[6rem] ml-[50rem]rounded-lg text-black"
                                        >
                                            {[...Array(product.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>

                            <div className="btn-container">
                                <button
                                    //onClick={addToCartHandler}
                                    disabled={product.countInStock === 0}
                                    className="px-4 py-2 mt-4 text-black bg-pink-600 border-black rounded-lg md:mt-0"
                                >
                                    Add To Cart
                                </button>
                                <p className="ml-2 text-black">In Stock: {product.countInStock}</p>
                            </div>

                        </div>

                        <div className="mt-[5rem] container flex flex-wrap items-start justify-between ml-[10rem]">
                            <ProductTabs
                                loadingProductReview={loadingProductReview}
                                userInfo={userInfo}
                                // submitHandler={submitHandler}
                                rating={rating}
                                setRating={setRating}
                                comment={comment}
                                setComment={setComment}
                                product={product}
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

Ratings.defaultProps = {
    color: "yellow-500"
}

export default ProductDetails
