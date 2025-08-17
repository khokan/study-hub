import React from 'react';
import logo from '../../../assets/logo.png'
import { Link } from 'react-router';

const StudyHubLogo = () => {
    return (
        <Link to="/">
            <div className='flex items-center font-bold'>
                <img className='size-12' src={logo} alt="" />
                <p className="text-blue-500">
                Study<span className="text-gray-500">Hub</span>
          </p>
            </div>
        </Link>
    );
};

export default StudyHubLogo;