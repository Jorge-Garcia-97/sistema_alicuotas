import React from 'react';
import { Navbar } from '../components/navbar/Navbar';
import { Sidebar } from '../components/navbar/Sidebar';
import { Outlet } from 'react-router-dom';

export const RoutesApp = () => {
  return (
    <>
      <div className="vw-100 vh-100">
        <Navbar />
        <div className="container-fluid">
          <div className="row">
            <div className="col-auto px-0">
              <Sidebar />
            </div>
            <div className="col">
              <div className="row">
                <div
                  className="px-0 py-0"
                  style={{
                    height: 'calc(100vh - (57px))',
                    minWidth: 'calc(100vw - (200px))',
                    maxWidth: 'calc(100vw - (50px))',
                  }}
                >
                  <div className="p-2 h-100">
                    <div className="card h-100 overflow-auto p-2">
                      <Outlet></Outlet>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
