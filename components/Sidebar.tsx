import React from 'react';
import { Page } from '../types';
// FIX: Imported CogIcon for the settings link.
import { ChartBarIcon, HomeIcon, ClipboardListIcon, SearchIcon, DocumentReportIcon, CogIcon } from './icons/Icons';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <HomeIcon /> },
    { id: 'tasks', label: 'Tâches', icon: <ClipboardListIcon /> },
    { id: 'search', label: 'Recherche', icon: <SearchIcon /> },
    { id: 'reports', label: 'Reports', icon: <DocumentReportIcon /> },
    // FIX: Added a navigation item for the settings page.
    { id: 'settings', label: 'Settings', icon: <CogIcon /> },
  ] as const;

  const NavLink: React.FC<{item: typeof navItems[number]}> = ({ item }) => {
    const isActive = currentPage === item.id;
    return (
        <button
            onClick={() => setCurrentPage(item.id)}
            className={`flex items-center w-full px-4 py-3 text-left transition-colors duration-200 focus:outline-none animated-underline hover:animated-underline
            ${
                isActive
                ? 'text-black font-semibold animated-underline-active'
                : 'text-gray-500 hover:text-black'
            }`}
        >
            <span className="mr-4">{React.cloneElement(item.icon, { className: 'h-6 w-6' })}</span>
            <span className="font-medium text-base">{item.label}</span>
        </button>
    );
  }

  return (
    <aside className="w-64 bg-white text-black flex flex-col p-4 border-r border-gray-200">
        <div className="flex items-start space-x-3 mb-10 px-2">
            <ChartBarIcon className="h-7 w-7 text-black flex-shrink-0 mt-1"/>
            <div>
                <h1 className="font-bold text-xl leading-tight">Eliseca</h1>
                <p className="text-xs text-gray-600 mt-1 leading-tight">Gestionnaire d'embolisation de vos dossiers brevets, dans un béton comprenant du ciment de type portland.</p>
            </div>
        </div>
        <nav className="flex-1 space-y-2">
            {navItems.map(item => <NavLink key={item.id} item={item} />)}
        </nav>
    </aside>
  );
};

export default Sidebar;