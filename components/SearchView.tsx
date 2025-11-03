
import React, { useState, useMemo } from 'react';
import { PatentFamily, Patent } from '../types';
import { SearchIcon } from './icons/Icons';

// Add familyName to Patent type for local use
interface PatentWithFamily extends Patent {
  familyName: string;
  familyId: string;
}

interface SearchViewProps {
  families: PatentFamily[];
  onSelectPatent: (familyId: string, patentId: string) => void;
}

const SearchView: React.FC<SearchViewProps> = ({ families, onSelectPatent }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PatentWithFamily[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const allPatents: PatentWithFamily[] = useMemo(() => 
    families.flatMap(f => 
      f.patents.map(p => ({ ...p, familyName: f.name, familyId: f.id }))
    ), [families]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const lowerCaseQuery = query.toLowerCase();
    const filteredResults = allPatents.filter(patent => {
      return (
        patent.title.toLowerCase().includes(lowerCaseQuery) ||
        patent.applicationNumber.toLowerCase().includes(lowerCaseQuery) ||
        patent.countryCode.toLowerCase().includes(lowerCaseQuery) ||
        patent.abstract.toLowerCase().includes(lowerCaseQuery) ||
        patent.inventors.join(', ').toLowerCase().includes(lowerCaseQuery) ||
        patent.applicant.toLowerCase().includes(lowerCaseQuery) ||
        patent.familyName.toLowerCase().includes(lowerCaseQuery) ||
        patent.status.toLowerCase().includes(lowerCaseQuery)
      );
    });
    setResults(filteredResults);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-normal text-gray-900">Recherche</h1>
      <p className="text-gray-600 mt-2">
        Effectuez une recherche simple dans l'ensemble de votre portefeuille. La recherche s'applique aux titres, numéros, inventeurs, etc.
      </p>

      <form onSubmit={handleSearch} className="flex gap-2 items-center p-4 bg-white border border-gray-200">
        <div className="relative flex-grow">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un brevet..."
            className="w-full p-3 pl-10 border border-gray-300 bg-white text-black focus:ring-1 focus:ring-black focus:border-black"
          />
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        <button
          type="submit"
          className="px-6 py-3 border border-black bg-black text-white hover:bg-gray-800 font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-black"
        >
          Rechercher
        </button>
      </form>

      <div className="bg-white border border-gray-200 overflow-x-auto">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-medium">Résultats de la recherche ({results.length})</h2>
        </div>
        {hasSearched && results.length > 0 ? (
          <table className="w-full text-left">
            <thead className="bg-white">
              <tr>
                <th className="p-4 text-sm font-medium uppercase tracking-wider border-b border-gray-300">Titre</th>
                <th className="p-4 text-sm font-medium uppercase tracking-wider border-b border-gray-300">Famille</th>
                <th className="p-4 text-sm font-medium uppercase tracking-wider border-b border-gray-300">Application #</th>
                <th className="p-4 text-sm font-medium uppercase tracking-wider border-b border-gray-300">Statut</th>
              </tr>
            </thead>
            <tbody>
              {results.map(patent => (
                <tr 
                    key={patent.id} 
                    className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50/50 transition-colors cursor-pointer"
                    onClick={() => onSelectPatent(patent.familyId, patent.id)}
                >
                  <td className="p-4">{patent.title}</td>
                  <td className="p-4 text-gray-600">{patent.familyName}</td>
                  <td className="p-4 text-gray-600">{patent.applicationNumber} [{patent.countryCode}]</td>
                  <td className="p-4">{patent.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : hasSearched ? (
          <p className="p-4 text-center text-gray-500">Aucun brevet ne correspond à votre recherche.</p>
        ) : (
             <p className="p-4 text-center text-gray-500">Veuillez lancer une recherche pour afficher des résultats.</p>
        )}
      </div>
    </div>
  );
};

export default SearchView;