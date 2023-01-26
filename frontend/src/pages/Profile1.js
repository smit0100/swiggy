import React, { useState } from 'react'

const Profile1 = () => {
  const [openTab, setOpenTab] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const images = [
    'https://picsum.photos/id/27/200/300',
    'https://picsum.photos/id/237/200/300',
    'https://picsum.photos/id/217/200/300',
    'https://picsum.photos/id/327/200/300',
    'https://picsum.photos/id/537/200/300',
    'https://picsum.photos/id/47/200/300',
    'https://picsum.photos/id/37/200/300'
  ];
  const HandleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const handleClick = (index) => {
    setIsOpen(true);
    setImageIndex(index);
  }

  const handleClose = () => {
    setIsOpen(false);
  }

  const handlePrev = () => {
    setImageIndex((imageIndex + images.length - 1) % images.length);
  }

  const handleNext = () => {
    setImageIndex((imageIndex + 1) % images.length);
  }
  return (
    <>
      {/* image */}
      <div className=''>
        <div className="md:mx-36 top-60 mx-10 bg-cover bg-scale bg-no-repeat  md:h-[500px] h-[300px]  box-border  flex justify-center items-center" style={{ backgroundImage: `url('https://cdn.pixabay.com/photo/2013/11/28/10/03/river-219972_960_720.jpg')` }}></div>
      </div>
      <div className='md:mx-36 m-4  p-2 mx-10 '>
        {/* link */}
        <div className='w-full'>
          <div className="">
            <div className=" w-full">
              <div className='sticky  top-0 z-30 bg-white'>
                <div className='text-3xl'>Restro name</div>
                <div className='text-lg capitalize text-slate-600'>pizza,south indian,chinese</div>
                <div className='text-md text-slate-500 capitalize'>Address</div>
                <div className='text-md'><span className='text-orange-300'>Open now</span> - <span className='text-slate-700'>10am - 11.30pm</span></div>
                <ul className="flex space-x-2 relative">
                  <li>
                    <button onClick={() => { setOpenTab(1); HandleClick() }} className="inline-block px-4 py-2 text-gray-600 bg-white rounded shadow " >
                      Order Online
                    </button>
                  </li>

                  <li>
                    <button onClick={() => { setOpenTab(2); HandleClick() }} className="inline-block px-4 py-2 text-gray-600 bg-white rounded shadow">
                      Reviews
                    </button>
                  </li>

                  <li>
                    <button onClick={() => { setOpenTab(3); HandleClick() }} className="inline-block px-4 py-2 text-gray-600 bg-white rounded shadow">
                      Photos
                    </button>
                  </li>
                </ul>
                <div className='border-[1.5px] border-black mb-2'></div>
              </div>

              <div className="p-3 mt-6 bg-white border">
                <div className={openTab === 1 ? "block" : "hidden"}>
                  <div className='row overflow-auto'>
                    <div className=' w-full sm:w-2/6 p-4 sticky top-10 left-0 overflow-hidden'>

                      <ul>
                        <li>category 1</li>
                        <li>category 1</li>
                        <li>category 1</li>
                        <li>category 1</li>
                        <li>category 1</li>
                        <li>category 1</li>
                        <li>category 1</li>
                      </ul>
                    </div>
                    <div className='w-full sm:w-4/6 p-4 h-[800px] overflow-y-auto'>
                      <RestroCategoryCard />
                      <RestroCategoryCard />
                      <RestroCategoryCard />
                      <RestroCategoryCard />
                      <RestroCategoryCard />
                      <RestroCategoryCard />
                      <RestroCategoryCard />
                      <RestroCategoryCard />
                    </div>
                  </div>
                </div>

                <div className={openTab === 2 ? "block" : "hidden"}>
                  <section className="bg-white">
                    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                      <div className="mx-auto max-w-xl text-center">
                        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                          Read trusted reviews from our customers
                        </h2>

                        <p className="text-md ring-offset-warm-gray-500 mx-auto mt-4 max-w-lg">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
                          praesentium natus sapiente commodi. Aliquid sunt tempore iste
                          repellendus explicabo dignissimos placeat, autem harum dolore
                          reprehenderit quis! Quo totam dignissimos earum.
                        </p>
                      </div>

                      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-16 lg:grid-cols-3">
                        <UserReviewCard />
                        <UserReviewCard />
                        <UserReviewCard />
                        <UserReviewCard />
                        <UserReviewCard />
                      </div>
                    </div>
                  </section>

                </div>

                <div className={openTab === 3 ? "block" : "hidden"}>
                  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>

                    {images.map((image, index) => (
                      <div className='overflow-hidden'>
                        <img
                          key={image}
                          src={image}
                          className="w-[300px] h-[250px] object-cover rounded-sm transition-all duration-400 hover:scale-110 cursor-pointer z-40"
                          onClick={() => handleClick(index)}
                          alt="backbone of text"
                        />
                      </div>
                    ))}
                    {isOpen && (
                      <div className="fixed top-0 left-0 h-full w-full flex items-center justify-center z-50 bg-black/50" >
                        <div className="bg-gray-900 text-white rounded-lg overflow-hidden relative">
                          <img src={images[imageIndex]} className="w-[400px] h-[250px] sm:w-[500px]  sm:h-[350px] object-cover" alt='backbone' />
                          <button className="hover:bg-black/50 text-white p-2 absolute top-0 left-0 h-full w-[40px]" onClick={handlePrev}>
                            &lt;
                          </button>
                          <button className="hover:bg-black/50 text-white p-2 absolute top-0 right-0 h-full w-[40px]" onClick={handleNext}> {">"} </button>
                        </div>
                        <div className='absolute inset-0 h-screen w-screen bg-black/50 -z-10' onClick={handleClose}></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default Profile1

export const UserReviewCard = () => {

  const ReviewStar = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>)

  return (
    <div>
      <img alt="Woman" src="https://images.unsplash.com/photo-1599566219227-2efe0c9b7f5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" className="mx-auto h-24 w-24 rounded-full object-cover shadow-xl" />

      <blockquote className="-mt-6 flex flex-col justify-between rounded-lg p-12 text-center shadow-xl">
        <p className="text-lg font-bold text-gray-700">Sophie Lennon</p>
        <p className="mt-1 text-xs font-medium text-gray-500">
          Digital Marketing at Studio
        </p>
        <p className="mt-4 text-sm text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
          voluptatem alias ut provident sapiente repellendus.
        </p>

        <div className="mt-8 flex justify-center gap-0.5 text-green-500">
          {ReviewStar}
          {ReviewStar}
          {ReviewStar}
          {ReviewStar}
          {ReviewStar}
        </div>
      </blockquote>
    </div>
  )
}

export const RestroCategoryCard = ({ item }) => {


  return (
    <>
      <div className="flex flex-wrap-reverse justify-between anim py-3">
        <div className="sm:pt-5 lg:pt-0">
          <img alt="github" className="w-5 mr-1" src="./svg/github.svg" />
          <p className="font-bold capitalize">Pizza</p>
          <p className="text-sm">200</p>
        </div>
        <div className="relative ">
          <img className="h-36 w-36 rounded-md object-cover" src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="food" />

          <button className="inline-block absolute left-7 bg-white hover:text-white hover:bg-green-600 -bottom-4 font-bold  rounded border border-current px-8 py-[6px] text-xs uppercase  text-green-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-green-500"
          >
            Add
          </button>

        </div>
      </div>
    </>
  )
}

