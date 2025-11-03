
import React from 'react';
import { Patent } from '../types';
import { EditIcon } from './icons/Icons';

interface PatentCardProps {
  patent: Patent;
  onEdit: () => void;
}

const PatentCard: React.FC<PatentCardProps> = ({ patent, onEdit }) => {
  const getStatusClasses = (status: Patent['status']) => {
    switch (status) {
      case 'Granted': return 'text-green-600';
      case 'Pending': return 'text-yellow-700';
      case 'Abandoned': return 'text-red-700';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white border border-gray-200 p-4 flex flex-col justify-between transition-colors duration-300 hover:border-gray-900">
      <div>
        <div className="flex justify-between items-start">
            <h3 className="font-medium text-gray-900 mb-2 pr-2">{patent.title}</h3>
            <button
                onClick={onEdit}
                className="p-1 rounded-full text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-black flex-shrink-0"
                aria-label="Edit patent title"
            >
                <EditIcon className="w-4 h-4" />
            </button>
        </div>
        <p className="text-sm text-gray-500 mb-1">{patent.applicationNumber} [{patent.countryCode}]</p>
        <p className="text-sm text-gray-500">Filed: {new Date(patent.filingDate).toLocaleDateString()}</p>
      </div>
      <div className="mt-4">
        <span className={`px-1 py-1 text-xs font-semibold ${getStatusClasses(patent.status)}`}>
          {patent.status}
        </span>
      </div>
    </div>
  );
};

export default PatentCard;