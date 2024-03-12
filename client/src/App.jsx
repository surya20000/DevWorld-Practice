// import { useState, useEffect } from 'react'
// import './App.css'
// import UploadForm from './components/UploadForm'
// import UploadsList from './components/UploadsList'
// import axios from 'axios'
// import { backend_Uri } from './config/constants'
// import { Route, Routes } from 'react-router-dom'
// import Developer from './components/Developer'
// import PatentForm from './components/PatentForm'
// import EditCapstone from './components/EditCapstone'
// import Login from './components/Login'
// import Users from './components/Users'
// import LandingPage from './components/LandingPage'

// const App = () => {
//   const [medias, setMedias] = useState([])

//   useEffect(() => {
//     getAllMedias()
//   }, [])

//   const getAllMedias = () => {
//     axios.get(`${backend_Uri}/api/v1/media/all`)
//       .then(res => {
//         setMedias(res.data)
//         console.log(medias);
//       })
//       .catch(err => {
//         setMedias([])
//         console.log('Error', err);
//       })
//   }

//   return (
//     <>
//     <Routes>
//       <Route path='/' element={<LandingPage/>} />
//       <Route path='/login' element={<Login/>} />
//       <Route path='/users' element={<Users/>} />
//       <Route path='/uploadMedias' element={<UploadForm getAllMedias={getAllMedias}/>}/>
//       <Route path = '/displayMedias' element={<UploadsList medias={medias}/>}/>
//       <Route path='/developer/:email' element={<Developer/>} />
//       <Route path='/patentForm' element={<PatentForm/>} />
//       <Route path='/editMedia/:id' element={<EditCapstone/>} />
//     </Routes>
//       <div className='row'>
        
//       </div>
//     </>
//   )
// }

// export default App


import './App.css';
import { Link } from 'react-router-dom';
import AnimatedRoutes from './components/AnimatedRoutes';
import { useState } from 'react';
import Motion from './components/Motion';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-link">DevWorld</Link>
      <div className="navbar-links">
        <Link to="/login" className="navbar-link">Login</Link>
        <Link to="/users" className="navbar-link">Users</Link>
        <Link to="/uploadMedias" className="navbar-link">Upload Projects</Link>
        <Link to="/displayMedias" className="navbar-link">Browse Projects</Link>
      </div>
    </nav>
  );
};

const App = () => {

  const [motionOpen, setMotionOpen] = useState(false)
  const close = () => setMotionOpen(false)
  const open = () => setMotionOpen(true)

  return (
    <>
      <Navbar />
      <AnimatedRoutes/>
      <div>
        <motion.button
          whileHover={{scale:1.1}}
          whileTap={{scale:0.9}}
          onClick={() => (motionOpen ? close(): open())}
        >
          Launch Motion
          {motionOpen && <Motion motionOpen={motionOpen} handelClose={close} />}
        </motion.button>
        <AnimatePresence
        initial={false}
        mode='wait'
        >

        </AnimatePresence>
      </div>
    </>
  );
};

export default App;
