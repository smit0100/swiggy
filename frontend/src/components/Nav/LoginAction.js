import { Link } from "react-router-dom"
import { MdLogin } from "react-icons/md"
import { motion } from "framer-motion"

const LoginAction = ({text,  mobile,currentColor}) => {
  console.log("==currentColor",currentColor);
  return (
    <Link to="/login">
        <motion.div
          className={`flex items-center gap-3 border border-${currentColor == "slate-800" ? "black" : "white"} px-3 py-1 rounded-lg cursor-pointer`}
          whileTap={{ scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          
        >
          <MdLogin className={` ${mobile && 'text-2xl text-white'} text-${currentColor}`} />
          {text && <p className={`font-mono text-${currentColor}`}>{text}</p>}
        </motion.div>
    </Link>
  )
}

export default LoginAction