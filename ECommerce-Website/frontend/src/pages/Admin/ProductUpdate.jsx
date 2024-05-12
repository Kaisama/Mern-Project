import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useDeleteProductMutation, useGetProductByIdQuery, useUpdateProductMutation, useUploadProductImageMutation } from '../../redux/api/productApiSlice'

const ProductUpdate = () => {
    const params=useParams()

    const {data:productData}=useGetProductByIdQuery(params._id)

    const [image,setImage]=useState(productData?.image||"")
    const [name,setName]=useState(productData?.name||"")
    const[description,setDescription]=useState(productData?.description||"")
    const[price,setPrice]=useState(productData?.price||"")
    const [category,setCategory]=useState(productData?.category||"")
    const [quantity,setQuantity]=useState(productData?.quantity||"")

    const [brand,setBrand]=useState(productData?.brand||"")
    const [stock,setStock]=useState(productData?.countInStock)

    const navigate=useNavigate()

    const {data:categories=[]}=useGetProductByIdQuery()
    const[uploadProductImage]=useUploadProductImageMutation()
    const [updateProduct]=useUpdateProductMutation()
    const[deleteProduct]=useDeleteProductMutation()

    useEffect(()=>{
        if(productData && productData._id){
            setName(productData.name)
            setDescription(productData.description)
            setPrice(productData.price)
            setCategory(productData.categories?._id)
            setBrand(productData.brand)
            setStock(productData.countInStock)
            setImage(productData.image)
            setQuantity(productData.quantity)
        }
    },[productData])


  return (
    <div>ProductUpdate</div>
  )
}

export default ProductUpdate