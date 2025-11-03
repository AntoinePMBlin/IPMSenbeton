
import React, { useState, useMemo } from 'react';
import { PatentFamily, Patent } from '../types';

interface ReportsViewProps {
  families: PatentFamily[];
}

const ReportsView: React.FC<ReportsViewProps> = ({ families }) => {
  const allPatents = useMemo(() => families.flatMap(f => f.patents.map(p => ({ ...p, familyName: f.name }))), [families]);

  const [selectedStatus, setSelectedStatus] = useState<Patent['status'][]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  const uniqueCountries = useMemo(() => [...new Set(allPatents.map(p => p.countryCode))].sort(), [allPatents]);
  const statuses: Patent['status'][] = ['Granted', 'Pending', 'Abandoned'];

  const filteredPatents = useMemo(() => {
    return allPatents.filter(patent => {
      const statusMatch = selectedStatus.length === 0 || selectedStatus.includes(patent.status);
      const countryMatch = selectedCountries.length === 0 || selectedCountries.includes(patent.countryCode);
      return statusMatch && countryMatch;
    });
  }, [allPatents, selectedStatus, selectedCountries]);
  
  const handleStatusChange = (status: Patent['status']) => {
      setSelectedStatus(prev => prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]);
  };
  
  const handleCountryChange = (country: string) => {
      setSelectedCountries(prev => prev.includes(country) ? prev.filter(c => c !== country) : [...prev, country]);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-normal text-gray-900">Modular Reports</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white border border-gray-200">
        <div>
          <h3 className="font-medium mb-3 text-gray-800">Filter by Status</h3>
          <div className="flex flex-wrap gap-2">
            {statuses.map(status => (
              <button key={status} onClick={() => handleStatusChange(status)} className={`px-3 py-1 text-sm border transition-all duration-200 ${selectedStatus.includes(status) ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}>
                {status}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-medium mb-3 text-gray-800">Filter by Country</h3>
          <div className="flex flex-wrap gap-2">
            {uniqueCountries.map(country => (
              <button key={country} onClick={() => handleCountryChange(country)} className={`px-3 py-1 text-sm border transition-all duration-200 ${selectedCountries.includes(country) ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-200 hover:bg-ray-50'}`}>
                {country}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 overflow-x-auto">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-medium">Report Results ({filteredPatents.length})</h2>
        </div>
        <table className="w-full text-left">
          <thead className="bg-white">
            <tr>
              <th className="p-4 text-sm font-medium uppercase tracking-wider border-b border-gray-300">Title</th>
              <th className="p-4 text-sm font-medium uppercase tracking-wider border-b border-gray-300">Family</th>
              <th className="p-4 text-sm font-medium uppercase tracking-wider border-b border-gray-300">Application #</th>
              <th className="p-4 text-sm font-medium uppercase tracking-wider border-b border-gray-300">Status</th>
              <th className="p-4 text-sm font-medium uppercase tracking-wider border-b border-gray-300">Filing Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatents.map(patent => (
              <tr key={patent.id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50/50 transition-colors">
                <td className="p-4">{patent.title}</td>
                <td className="p-4 text-gray-600">{patent.familyName}</td>
                <td className="p-4 text-gray-600">{patent.applicationNumber} [{patent.countryCode}]</td>
                <td className="p-4">{patent.status}</td>
                <td className="p-4 text-gray-600">{new Date(patent.filingDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredPatents.length === 0 && <p className="p-4 text-center text-gray-500">No patents match the selected criteria.</p>}
      </div>
    </div>
  );
};

export default ReportsView;