import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from 'pages/Home';
import { NotFound } from 'pages/NotFound';
import { Finished } from 'pages/Finished';
import { Archived } from 'pages/Archived';

export const Router: React.VFC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/finished" element={<Finished />} />
        <Route path="/archived" element={<Archived />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
