import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "../utils/firebase.utils";

const ProfilePicture = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(auth.currentUser);
  const [profilePicture, setProfilePicture] = useState(null);
  const [file, setFile] = useState(null);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (!user) {
        navigate('/signin');
      }
      else {
        setUserId(user.uid); 
        setUser(user);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  useEffect(() => {
    if (userId) {
      fetchProfilePictureFromBackend();
    }
  }, [userId]);  
  

  const fetchProfilePictureFromBackend = async () => {
    try {
      console.log(userId);
      const response = await fetch(`http://localhost:5000/api/getProfilePicture?userId=${userId}`);
        const data = await response.json();
        setProfilePicture(data.data.profilePictureUrl);
    } catch (error) {
      console.error('Error fetching profile picture:', error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setProfilePicture(null);
    }
  };

  const handleUpload = async () => {
    if (file && user) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', user.uid);

      try {
        const response = await fetch('http://localhost:5000/api/uploadProfilePicture', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setProfilePicture(data.profilePictureUrl);
          setFile(null);
        } else {
          throw new Error('Upload failed');
        }
      } catch (error) {
        console.error('Error uploading profile picture:', error);
      }
    }
    navigate('/payment');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">Profile Picture</h2>
        {profilePicture ? (
          <div className="mb-4 text-center">
            <img src={profilePicture} alt="Profile" className="w-32 h-32 rounded-full mx-auto" />
            <p className="mt-2">Current Profile Picture</p>
          </div>
        ) : (
          <p className="mb-4 text-center">No profile picture selected</p>
        )}
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full mb-4 text-purple-500"
          style={{ color: 'purple' }}
        />
        <button
          onClick={handleUpload}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition duration-300"
          disabled={!file}
          style={{ display: 'block', margin: '0 auto' }}
        >
          {profilePicture ? 'Update Profile Picture' : 'Upload Profile Picture'}
        </button>
      </div>
    </div>
  );
};

export default ProfilePicture;