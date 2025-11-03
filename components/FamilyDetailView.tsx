
import React from 'react';
import { PatentFamily, Patent } from '../types';
import { ArrowLeftIcon, ExternalLinkIcon } from './icons/Icons';

interface FamilyDetailViewProps {
  family: PatentFamily;
  onBack: () => void;
  onSelectPatent: (patentId: string) => void;
}

const getStatusClasses = (status: Patent['status']) => {
    switch (status) {
      case 'Granted': return 'text-green-600';
      case 'Pending': return 'text-yellow-700';
      case 'Abandoned': return 'text-red-700';
      default: return 'text-gray-600';
    }
};

const getPatentOfficeLink = (patent: Patent) => {
    // Using Google Patents as a universal link source
    return `https://patents.google.com/patent/${patent.applicationNumber}`;
};

const FamilyDetailView: React.FC<FamilyDetailViewProps> = ({ family, onBack, onSelectPatent }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
            onClick={onBack}
            className="p-2 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-black transition-colors"
            aria-label="Back to dashboard"
        >
            <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <h1 className="text-3xl font-normal text-gray-900">{family.name}</h1>
      </div>
      
      <div className="bg-white border border-gray-200 overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-white">
            <tr>
              <th className="p-4 text-sm font-medium uppercase tracking-wider border-b border-gray-300">Titre</th>
              <th className="p-4 text-sm font-medium uppercase tracking-wider border-b border-gray-300">Numéro de demande</th>
              <th className="p-4 text-sm font-medium uppercase tracking-wider border-b border-gray-300">Date de dépôt</th>
              <th className="p-4 text-sm font-medium uppercase tracking-wider border-b border-gray-300">Statut</th>
              <th className="p-4 text-sm font-medium uppercase tracking-wider border-b border-gray-300">Lien</th>
            </tr>
          </thead>
          <tbody>
            {family.patents.map(patent => (
              <tr 
                key={patent.id} 
                className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50/50 transition-colors cursor-pointer"
                onClick={() => onSelectPatent(patent.id)}
              >
                <td className="p-4">{patent.title}</td>
                <td className="p-4 text-gray-600">{patent.applicationNumber} [{patent.countryCode}]</td>
                <td className="p-4 text-gray-600">{new Date(patent.filingDate).toLocaleDateString()}</td>
                <td className={`p-4 font-semibold ${getStatusClasses(patent.status)}`}>{patent.status}</td>
                <td className="p-4">
                  <a
                    href={getPatentOfficeLink(patent)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-black transition-colors"
                    aria-label={`View patent ${patent.applicationNumber} on patent office website`}
                    onClick={(e) => e.stopPropagation()} // Prevents row click when clicking the link
                  >
                    <ExternalLinkIcon className="h-5 w-5" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FamilyDetailView;