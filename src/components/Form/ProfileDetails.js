import React, { useState } from 'react';

const ProfileDetails = () => {
  const [showGithub, setShowGithub] = useState(false);
  const [showLinkedIn, setShowLinkedIn] = useState(false);
  const [showTwitter, setShowTwitter] = useState(false);
  const [showOther, setShowOther] = useState(false);

  return (
    <div className="bg-gray-800 p-4 rounded-md">
      <h2 className="text-xl mb-4">Personal Information</h2>
      <form>
        <div className="mb-2">
          <label className="block mb-1">Name</label>
          <input type="text" className="w-full p-2 rounded-md bg-gray-700 border border-gray-600" />
        </div>
        <div className="mb-2">
          <label className="block mb-1">A Short Bio</label>
          <input type="text" className="w-full p-3 rounded-md bg-gray-700 border border-gray-600" />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Email</label>
          <input type="email" className="w-full p-2 rounded-md bg-gray-700 border border-gray-600" />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Location</label>
          <input type="text" className="w-full p-2 rounded-md bg-gray-700 border border-gray-600" />
        </div>
      </form>

      <h2 className="text-xl mt-4 mb-4">Social Links</h2>
      <div className="flex space-x-4">
        <button onClick={() => setShowGithub(!showGithub)} className="bg-gray-700 p-2 rounded-md">GitHub</button>
        <button onClick={() => setShowLinkedIn(!showLinkedIn)} className="bg-gray-700 p-2 rounded-md">LinkedIn</button>
        <button onClick={() => setShowTwitter(!showTwitter)} className="bg-gray-700 p-2 rounded-md">Twitter</button>
        <button onClick={() => setShowOther(!showOther)} className="bg-gray-700 p-2 rounded-md">Other</button>
      </div>

      {showGithub && (
        <div className="mt-4">
          <label className="block mb-1">GitHub URL</label>
          <input type="text" className="w-full p-2 rounded-md bg-gray-700 border border-gray-600" />
        </div>
      )}

      {showLinkedIn && (
        <div className="mt-4">
          <label className="block mb-1">LinkedIn URL</label>
          <input type="text" className="w-full p-2 rounded-md bg-gray-700 border border-gray-600" />
        </div>
      )}

      {showTwitter && (
        <div className="mt-4">
          <label className="block mb-1">Twitter URL</label>
          <input type="text" className="w-full p-2 rounded-md bg-gray-700 border border-gray-600" />
        </div>
      )}

      {showOther && (
        <div className="mt-4">
          <label className="block mb-1">Other URL</label>
          <input type="text" className="w-full p-2 rounded-md bg-gray-700 border border-gray-600" />
        </div>
      )}
    </div>
  );
};

export default ProfileDetails;
