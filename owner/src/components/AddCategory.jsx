import React from 'react'


const AddCategory = () => {
  return (
    <>
      <div className='mx-10'>
        <div className='m-5 shadow-md'>
          <h1 className='text-2xl font-semibold py-5 pl-2'>Add Product</h1><hr />
          <div className='flex flex-wrap py-3'>
            <div className='w-2/5 px-2'>
              <h1 className='text-xl text-slate-800'>Select Category</h1>
              <div class="flex justify-center">
  <div class="mb-3 xl:w-96">
    <select data-te-select-init>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
      <option value="4">Four</option>
      <option value="5">Five</option>
    </select>
    <label data-te-select-label-ref>Example label</label>
  </div>
</div>
            </div>
            <div className='w-3/5 px-4 border-l-2'>
              <h1 className='text-xl text-slate-800 border-b-2'>Product Details</h1>
              <form className='pt-5'>
                <div className="relative w-full mb-3">
                  <label className="block capitalize text-blueGray-600 text-md pb-1" htmlFor="productName">
                    Product Name
                  </label>
                  <input
                    type="text"
                    id='productName'
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Enter Product name" />
                </div>
                <div>
                  <label className="block capitalize text-blueGray-600 text-md pb-1" htmlFor="price">
                    Product Price
                  </label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">₹</span>
                    </div>
                    <input
                      type="number"
                      id="price"
                      className="block w-full px-4 py-2 pr-12 border-t border-b border-l border-gray-300 rounded focus:outline-none focus:ring ease-linear transition-all duration-150 pl-7 sm:text-sm"
                      placeholder="Product price" />
                  </div>
                </div>
                <div className="relative w-full my-3">
                  <label className="block capitalize text-blueGray-600 text-md pb-1" htmlFor="description">
                    Product Description
                  </label>
                  <textarea
                    id="description"
                    rows="4"
                    className="resize-none block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  dark:placeholder-gray-400 focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Write Product description..."></textarea>
                </div>
                <button className="inline-block ml-2 mt-3 bg-white hover:text-white hover:bg-blue-600 -bottom-4 font-bold  rounded border border-current px-8 py-[6px] text-xs uppercase  text-blue-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-blue-500">
                  Add Product
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddCategory