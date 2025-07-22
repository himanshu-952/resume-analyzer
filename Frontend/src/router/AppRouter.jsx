import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import Analysis from '../components/Analysis';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/analyze" element={<Analysis />} />
    </Routes>
  );
};

export default AppRouter;
