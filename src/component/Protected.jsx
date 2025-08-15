import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Navbar from './Navbar';

const Protected = ({ Element }) => {
  const userId = useSelector((state) => state.user?.user?._id);

  if (!userId) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Element />
    </>
  );
};

export default Protected;
