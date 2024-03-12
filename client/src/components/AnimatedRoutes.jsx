import { Route, Routes, useLocation } from 'react-router-dom';
import Developer from '../components/Developer';
import PatentForm from '../components/PatentForm';
import EditCapstone from '../components/EditCapstone';
import Login from '../components/Login';
import Users from '../components/Users';
import LandingPage from '../components/LandingPage';
import UploadForm from '../components/UploadForm';
import UploadsList from '../components/UploadsList';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { backend_Uri } from '../config/constants';
import { AnimatePresence } from 'framer-motion';



const AnimatedRoutes = () => {

    const [medias, setMedias] = useState([]);
    const location = useLocation()


    useEffect(() => {
        getAllMedias();
    }, []);

    const getAllMedias = () => {
        axios
            .get(`${backend_Uri}/api/v1/media/all`)
            .then((res) => {
                setMedias(res.data);
                console.log(medias);
            })
            .catch((err) => {
                setMedias([]);
                console.log('Error', err);
            });
    };

    return (
        <div>
            <AnimatePresence>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/users" element={<Users />} />
                    <Route
                        path="/uploadMedias"
                        element={<UploadForm getAllMedias={getAllMedias} />}
                    />
                    <Route
                        path="/displayMedias"
                        element={<UploadsList medias={medias} />}
                    />
                    <Route path="/developer/:email" element={<Developer />} />
                    <Route path="/patentForm" element={<PatentForm />} />
                    <Route path="/editMedia/:id" element={<EditCapstone />} />
                </Routes>
            </AnimatePresence>
        </div>
    )
}

export default AnimatedRoutes
