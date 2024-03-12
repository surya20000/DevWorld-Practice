import { useState, useEffect } from 'react';
import axios from 'axios';
import { backend_Uri } from '../config/constants';
import { useParams } from 'react-router-dom';
import '../components/Dev.Module.css'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Developer = () => {
  const { email } = useParams()
  const [developerInfo, setDeveloperInfo] = useState(null);
  console.log(email)
  useEffect(() => {
    const fetchDeveloperInfo = async () => {
      try {
        const response = await axios.get(`${backend_Uri}/api/v1/media/getDeveloper/${email}`);
        setDeveloperInfo(response.data);
      } catch (error) {
        console.error('Error fetching developer info:', error);
      }
    };

    fetchDeveloperInfo();
  }, []);

  return (
    <div>
      <h2>Developer Information</h2>
      {developerInfo ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: 0.1 }}
        >
          <div className="certificate-container">
            <h3 className="certificate-title">Patent Certificate</h3>
            <p className="certificate-body">
              This certificate is awarded to {developerInfo.name} in recognition of their
              contribution to the development of the project named <b> {developerInfo.projectname} </b>.
            </p>
            <p className="certificate-footer">
              Issued on {new Date().toLocaleDateString()}.
            </p>
          </div>
          <p>Name: {developerInfo.name}</p>
          <p>Email: {developerInfo.email}</p>
          <Link to='/displayMedias'> <button> Back </button> </Link>
          <hr />
        </motion.div>
      ) : (
        <p>Loading developer information...</p>
      )}
    </div>
  );

};

export default Developer;
