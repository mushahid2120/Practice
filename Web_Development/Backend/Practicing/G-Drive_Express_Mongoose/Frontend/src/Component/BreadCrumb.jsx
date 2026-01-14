import React from 'react';
import { Link } from 'react-router-dom';

function Breadcrumb({ path = [] }) {
  return (
    <nav className="flex items-center space-x-2 py-3 px-1" aria-label="Breadcrumb">
      {/* Home Icon */}
      <Link
        to="/"
        className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-blue-100 transition-colors duration-200 group"
      >
        <svg 
          className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      </Link>

      {/* Breadcrumb Items */}
      {path.map(({name,_id:id}, index) => {
        if(index===0) return
        
        return (
          <div key={index} className="flex items-center space-x-2">
            {/* Separator */}
            <svg 
              className="w-5 h-5 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>

            {/* Breadcrumb Link or Text */}
              <Link
                to={`/directory/${id}`}
                className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              >
                {name}
              </Link>
          </div>
        );
      })}
    </nav>
  );
}

export default Breadcrumb;
