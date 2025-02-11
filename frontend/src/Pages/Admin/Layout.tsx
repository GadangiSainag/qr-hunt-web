import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '@/Components/NavigationBar/NavBar';

const Layout: React.FC = () => {
  return (
    <div >
      
      <div className='mb-8'>
        <Outlet />
      </div>
      {/* Bottom Navigation */}
      <div className="left-0 fixed bottom-0 w-full mx-auto">
      <NavBar />

      </div>
    </div>
  );
};

export default Layout;
