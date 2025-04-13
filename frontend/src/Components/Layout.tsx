import React from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { Loading } from './ui/Loading';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface LayoutProps {
  children: React.ReactNode;
  loading?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, loading }) => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        {loading ? (
          <Loading fullScreen />
        ) : (
          <>
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </>
        )}
      </div>
    </ErrorBoundary>
  );
}; 