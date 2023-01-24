import React,{useState} from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
const Profile1 = () => {
    const [openTab, setOpenTab] = useState(3);
    return (
        <>
            {/* image */}
            <div className=''>
                <div
                    className="md:mx-36  mx-10 bg-cover bg-scale bg-no-repeat  md:h-[500px] h-[300px]  box-border  flex justify-center items-center"
                    style={{
                        backgroundImage:
                            `url('https://cdn.pixabay.com/photo/2013/11/28/10/03/river-219972_960_720.jpg')`
                    }}

                >
                </div>
            </div>
            <div className='md:mx-36 m-4  p-2 mx-10'>
                {/* link */}
                <div className=''>
            <div className="">
                <div className=" w-full">
                    <ul className="flex space-x-2">
                        <li>
                            <button
                                href="#"
                                onClick={() => setOpenTab(1)}
                                className="inline-block px-4 py-2 text-gray-600 bg-white rounded shadow"
                            >
                                React Tabs 1
                            </button>
                        </li>
                        <li>
                            <button
                                href="#"
                                onClick={() => setOpenTab(2)}
                                className="inline-block px-4 py-2 text-gray-600 bg-white rounded shadow"
                            >
                                React Tabs 2
                            </button>
                        </li>
                        <li>
                            <button
                                href="#"
                                onClick={() => setOpenTab(3)}
                                className="inline-block px-4 py-2 text-gray-600 bg-white rounded shadow"
                            >
                                React Tabs 3
                            </button>
                        </li>
                            </ul>
                            <div className='border-[1.5px] border-black my-2'></div>
                    <div className="p-3 mt-6 bg-white border">
                        <div className={openTab === 1 ? "block" : "hidden"}>
                            
                                    <div>
                                        <div>category</div>
                                        <div>item</div>
                            </div>
                        </div>
                        <div className={openTab === 2 ? "block" : "hidden"}>
                            React JS with Tailwind CSS Tab 2 Content show
                        </div>
                        <div className={openTab === 3 ? "block" : "hidden"}>
                            React JS with Tailwind CSS Tab 3 Content show
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