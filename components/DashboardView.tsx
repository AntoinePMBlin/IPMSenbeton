
import React from 'react';
import { PatentFamily } from '../types';

interface DashboardViewProps {
  families: PatentFamily[];
  onSelectFamily: (familyId: string) => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ families, onSelectFamily }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-normal text-gray-900">Dashboard</h1>
      
      <div className="bg-white border border-gray-200 overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-white">
            <tr>
              <th className="p-4 text-sm font-medium uppercase tracking-wider border-b border-gray-200">Famille de brevets</th>
              <th className="p-4 text-sm font-medium uppercase tracking-wider border-b border-gray-200">Juridictions</th>
            </tr>
          </thead>
          <tbody>
            {families.map(family => (
              <tr 
                key={family.id} 
                className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50/50 transition-colors cursor-pointer"
                onClick={() => onSelectFamily(family.id)}
              >
                <td className="p-4 align-top">
                  {family.name}
                </td>
                <td className="p-4 align-top">
                  <div className="flex flex-wrap gap-2">
                    {family.patents.map(patent => (
                      <span key={patent.id} className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 border border-gray-200">
                        {patent.countryCode}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardView;