import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/Logo.png";

const Logo = () => {
  return (
    <Link to="/"
    className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
    <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
    DRS
  </Link>
  )
}

export default Logo