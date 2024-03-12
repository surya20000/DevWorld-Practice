import Backdrop from "./Backdrop"
import { motion } from "framer-motion"
import '../App.css'

const Motion = ({ handelClose, text }) => {

    const dropIn = {
        hidden: {
            y: "-100vh",
            opacity: 0

        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.1,
                type: "spring",
                damping: 25,
                stiffness: 500,
            }
        },
        exit: {
            y: "100vh",
            opacity: 0
        },
    }

    return (
        <Backdrop onClick={handelClose}>
            <motion.div
                onClick={(e) => e.stopPropagation()}
                className="modal orange-gradient"
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <p>{text}</p>
                <button onClick={handelClose}>Close</button>
            </motion.div>

        </Backdrop>
    )
}

export default Motion

