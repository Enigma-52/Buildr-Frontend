import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "../utils/firebase.utils"; // Import auth

const ProfilePicture = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (!user) {
        navigate('/signin');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Optionally, you can preview the selected image
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result); // This sets the preview image URL
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
          setProfilePicture(data.profilePictureUrl);
          setFile(null);
        } else {
          throw new Error('Upload failed');
        }
      } catch (error) {
        console.error('Error uploading profile picture:', error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">Profile Picture</h2>
        {profilePicture ? (
          <div className="mb-4 text-center">
            <img src={profilePicture} alt="Profile" className="w-32 h-32 rounded-full mx-auto" />
            <p className="mt-2">Selected Profile Picture</p>
          </div>
        ) : (
          <p className="mb-4 text-center">No profile picture selected</p>
        )}
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full mb-4 text-gray-900"
        />
        <button
          onClick={handleUpload}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition duration-300"
          disabled={!file} // Disable button if no file is selected
        >
          {profilePicture ? 'Update Profile Picture' : 'Upload Profile Picture'}
        </button>
      </div>
    </div>
  );
};

export default ProfilePicture;
