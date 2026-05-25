import React from 'react';
import axios from 'axios';
import './ProfileMenu.css';

const ProfileMenu = ({
  isProfileDropdown,
  setIsProfileDropdown,
}) => {

  // Hide menu if false

  if (!isProfileDropdown) {
    return null;
  }
   const handleLogout = async () => {

    try {

      await axios.get(

        "http://localhost:5000/logout",

        {
          withCredentials: true,
        }

      );

      window.location.href =
        "http://localhost:3000/signup";
      } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="profile-dropdown">

      <button

        className="dropdown-item"

        onClick={handleLogout}
        >

        Logout

      </button>

    </div>

  );
};

export default ProfileMenu;

