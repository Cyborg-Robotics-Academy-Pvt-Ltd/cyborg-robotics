import React from "react";

const AuthLoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="loader">
          <div className="loadingio-spinner-double-ring-6j7x6x6g8o">
            <div className="ldio-8x7x6x6g8o">
              <div></div>
              <div></div>
              <div>
                <div></div>
              </div>
              <div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-4 text-gray-600 text-sm">Checking authentication...</p>
      </div>
    </div>
  );
};

export default AuthLoadingSpinner;
