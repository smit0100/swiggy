
import React from 'react'

const CheckoutPage = () => {
    return (
        <>
            <div className="containerr mt-28 mb-10 h-fit shadow-black shadow-md backdrop-blur-md   rounded-md">
                <div className="grid grid-cols-1 grid-rows-3 gap-5">

                    <div className="w-full h-full  px-14 flex flex-col justify-center shadow-lg space-y-3">
                        <div className="flex space-x-3">
                            <p className="font-bold text-lg">Logged in</p>
                            <img src="./svg/github.svg" className="w-7 h-7" alt="temp" />
                        </div>
                        <div className="flex space-x-5">
                            <p className="font-semibold text-lg">Name</p> &nbsp;&nbsp;&nbsp; |
                            <p className="font-semibold text-lg">number</p>
                        </div>
                    </div>

                    <div className="w-full h-full row-span-2  px-14 flex shadow-md flex-col space-y-3">
                        <div className="flex flex-col ">
                            <p className="font-bold text-lg">Select delivery address</p>
                            <p className="font-[400] text-slate-500 ">You have a saved address in this location</p>
                        </div>
                        <div className="flex flex-wrap">

                            <div className="p-3 w-full sm:w-6/12 flex ">
                                <div className="shadow-black hover:shadow-xl anim bg-white p-3">
                                    <div>
                                        <img src="./svg/github.svg" alt="temp" className="w-10 h-10" />
                                    </div>
                                    <div className="py-2">
                                        <p className="font-semibold text-xl">Other</p>
                                        <p className="w-10/12 font-[350] text-slate-500">116, rangavdhut soc. punagam saroli road surat-395010</p>
                                        <p className="font-semibold text-sm uppercase py-5 ">16 mins</p>
                                        <button
                                            class="inline-block bg-white hover:text-white hover:bg-green-600 -bottom-4 font-bold  rounded border border-current px-8 py-[6px] text-xs uppercase  text-green-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-green-500"
                                            to="ewfsdf"
                                        >
                                            deliver here
                                        </button>
                                    </div>
                                </div>

                            </div>
                            <div className="p-3 w-full sm:w-6/12 flex ">
                                <div className="shadow-black hover:shadow-xl bg-white p-3">
                                    <div>
                                        <img src="./svg/github.svg" alt="temp" className="w-10 h-10" />
                                    </div>
                                    <div className="py-2">
                                        <p className="font-semibold text-xl">Add New Address</p>
                                        <p className="w-10/12 font-[350] text-slate-500">116, rangavdhut soc. punagam saroli road surat-395010</p>
                                        <button
                                            class="inline-block mt-7 bg-white hover:text-white hover:bg-green-600 -bottom-4 font-bold  rounded border border-current px-8 py-[6px] text-xs uppercase  text-green-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-green-500"
                                            to="ewfsdf"
                                        >
                                            add new
                                        </button>
                                    </div>
                                </div>

Poojan Sakhriliya, [1/22/2023 6:01 PM]
</div>
                        </div>
                    </div>
                    <div className="w-full h-full shadow-md px-14">Choose payment method</div>
                </div>
            </div>
        </>
    )
}

export default CheckoutPage