import React from 'react'

const CategoryForm = ({value,setValue,handleSubmit,buttonText="Submit",handleDelete}) => {
  return (
    <div className='p-3'>
        <form 
        onSubmit={handleSubmit}
        className='space-y-3'
        >
        <input 
        type='text'
        className='w-full px-4 py-3 border rounded-lg'
        placeholder='Write Category Name'
        value={value}
        onChange={(e)=>setValue(e.target.value)}
        />

        <div className="flex justify-between">
            <button className="px-4 py-2 bg-pink-500 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-pink-500 focus:ring-opacity-50">
                {buttonText}
            </button>

            {handleDelete &&(
                <button 
                onClick={handleDelete}
                className='px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus-within:ring-opacity-50'>Delete</button>
            )}
        </div>
            
        </form>
    </div>
  )
}

export default CategoryForm