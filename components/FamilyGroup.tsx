
import React, { useState } from 'react';
import { PatentFamily } from '../types';
import PatentCard from './PatentCard';
import { EditIcon, ChevronDownIcon } from './icons/Icons';

interface FamilyGroupProps {
  family: PatentFamily;
  onEditFamily: (familyId: string, currentName: string) => void;
  onEditPatent: (familyId: string, patentId: string, currentTitle: string) => void;
}

const FamilyGroup: React.FC<FamilyGroupProps> = ({ family, onEditFamily, onEditPatent }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-white border border-gray-200 overflow-hidden transition-all duration-500">
      <div
        className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50/50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-medium text-gray-900">{family.name}</h2>
          <span className="px-2 py-1 text-xs font-medium text-gray-700 border border-gray-200">
            {family.patents.length} patents
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEditFamily(family.id, family.name);
            }}
            className="p-1 rounded-full text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-black transition-transform duration-300 hover:scale-110"
            aria-label="Edit family name"
          >
            <EditIcon />
          </button>
          <ChevronDownIcon className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>
      {isOpen && (
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {family.patents.map(patent => (
              <PatentCard
                key={patent.id}
                patent={patent}
                onEdit={() => onEditPatent(family.id, patent.id, patent.title)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FamilyGroup;