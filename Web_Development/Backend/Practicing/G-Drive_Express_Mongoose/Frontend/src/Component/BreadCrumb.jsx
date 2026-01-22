import React from 'react';
import { Link } from 'react-router-dom';

function Breadcrumb({ path = [] }) {

  return (
    <nav className="mb-6" aria-label="Breadcrumb">
      <div className="bg-white border-2 border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="flex items-center divide-x-2 divide-gray-200">
          {/* Home Icon */}
          <Link
            to="/home"
            className="flex items-center justify-center px-4 py-3 hover:bg-blue-50 transition-all duration-200 group flex-shrink-0"
          >
            <svg 
              className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span className="ml-2 text-sm font-semibold text-gray-600 group-hover:text-blue-600 hidden sm:inline">
              Home
            </span>
          </Link>

          {/* Breadcrumb Items */}
          {path.map(({ name, _id: id }, index) => {
            if (index === 0) return null;
            const isLast = index === path.length - 1;
            
            return (
              <div key={id} className="flex items-center flex-1 min-w-0">
                <Link
                  to={`/directory/${id}`}
                  className={`flex items-center gap-2 px-4 py-3 w-full transition-all duration-200 ${
                    isLast
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold cursor-default pointer-events-none'
                      : 'hover:bg-blue-50 text-gray-700 hover:text-blue-600 font-medium'
                  }`}
                >
                  {/* Chevron Icon */}
                  <svg 
                    className={`w-4 h-4 flex-shrink-0 ${isLast ? 'text-white/70' : 'text-gray-400'}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  
                  {/* Folder Name */}
                  <span className="text-sm truncate">{name}</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default Breadcrumb;
