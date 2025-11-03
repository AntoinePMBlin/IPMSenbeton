
import React from 'react';
import { Page } from '../types';
import { BriefcaseIcon, ChartBarIcon, CogIcon, DocumentReportIcon } from './icons/Icons';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const navItems: { id: Page; label: string; icon: React.ReactElement }[] = [
    { id: 'dashboard', label: 'Portfolio', icon: <BriefcaseIcon /> },
    { id: 'reports', label: 'Reports', icon: <DocumentReportIcon /> },
    { id: 'settings', label: 'Settings', icon: <CogIcon /> },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-10 transition-colors duration-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <ChartBarIcon />
            <span className="font-bold text-xl text-gray-800">PatentManager</span>
          </div>
          <nav className="hidden md:flex space-x-4">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-indigo-500
                  ${
                    currentPage === item.id
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
           <div className="md:hidden">
             {/* Mobile menu button can be added here */}
           </div>
        </div>
      </div>
    </header>
  );
};

export default Header;