import React, {useState, useEffect} from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { onMessageListener } from '../firebase';

const Notification = () => {
  const [notification, setNotification] = useState({title: '', body: '',image:""});
  function notify() {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            {
              notification?.image && (

                <div className="flex-shrink-0 pt-0.5">
              <img
                className="h-10 w-10 rounded-full"
                src={notification?.image}
                alt=""
                />
            </div>
                )
              }
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                {notification?.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {notification?.body}
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </div>
      </div>
    ))
  };

  useEffect(() => {
    if (notification?.title ){
     notify()
     document.title = "Frontend - 1 new notification"
     setTimeout(() => {
     document.title = "Frontend"
     }, 2000);
    }
  }, [notification])

  onMessageListener()
    .then((payload) => {
      console.log("===notification recieved",payload);
      setNotification({title: payload?.notification?.title, body: payload?.notification?.body,image:payload?.notification?.image});     
    })
    .catch((err) => console.log('failed: ', err));

  return (
     <Toaster position='top-right'/>
  )
}

export default Notification