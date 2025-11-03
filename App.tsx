
import React from 'react';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import ReportsView from './components/ReportsView';
import TasksView from './components/TasksView';
import SearchView from './components/SearchView';
import SettingsView from './components/SettingsView';
import { usePortfolio } from './hooks/usePortfolio';
import { Page } from './types';
import FamilyDetailView from './components/FamilyDetailView';
import PatentDetailView from './components/PatentDetailView';
import ConcreteAnimation from './components/ConcreteAnimation';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState<Page>('dashboard');
  const [selectedFamilyId, setSelectedFamilyId] = React.useState<string | null>(null);
  const [selectedPatentId, setSelectedPatentId] = React.useState<string | null>(null);
  const portfolioHook = usePortfolio();

  const handleSelectFamily = (familyId: string) => {
    setSelectedFamilyId(familyId);
    setSelectedPatentId(null); 
  };

  const handleSelectPatent = (patentId: string) => {
    setSelectedPatentId(patentId);
  };
  
  const handleBackToDashboard = () => {
    setSelectedFamilyId(null);
    setSelectedPatentId(null);
  };

  const handleBackToFamily = () => {
    setSelectedPatentId(null);
  };

  const handleNavigateToPatent = (familyId: string, patentId: string) => {
    setSelectedFamilyId(familyId);
    setSelectedPatentId(patentId);
    setCurrentPage('dashboard');
  };

  const renderPage = () => {
    const selectedFamily = selectedFamilyId ? portfolioHook.families.find(f => f.id === selectedFamilyId) : null;
    const selectedPatent = selectedPatentId ? selectedFamily?.patents.find(p => p.id === selectedPatentId) : null;

    if (currentPage === 'dashboard') {
      if (selectedFamily && selectedPatent) {
        return (
          <PatentDetailView 
            family={selectedFamily}
            patent={selectedPatent} 
            onBack={handleBackToFamily} 
            onSelectPatent={handleSelectPatent}
            updatePatent={(patentId, updatedDetails) => portfolioHook.updatePatentDetails(selectedFamily.id, patentId, updatedDetails)}
            tasks={portfolioHook.tasks.filter(t => t.patentId === selectedPatent.id)}
            addTask={portfolioHook.addTask}
          />
        );
      }
      if (selectedFamily) {
        return <FamilyDetailView family={selectedFamily} onBack={handleBackToDashboard} onSelectPatent={handleSelectPatent} />;
      }
      return <DashboardView families={portfolioHook.families} onSelectFamily={handleSelectFamily} />;
    }

    switch (currentPage) {
      case 'reports':
        return <ReportsView families={portfolioHook.families} />;
      case 'tasks':
        return <TasksView tasks={portfolioHook.tasks} onNavigateToPatent={handleNavigateToPatent} onUpdateTaskStatus={portfolioHook.updateTaskStatus} />;
      case 'search':
        return <SearchView families={portfolioHook.families} onSelectPatent={handleNavigateToPatent} />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView families={portfolioHook.families} onSelectFamily={handleSelectFamily} />;
    }
  };

  return (
    <div className="bg-white text-gray-800 flex h-screen font-sans overflow-hidden">
      <div className="flex flex-1 min-w-0">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {renderPage()}
        </main>
      </div>
      <aside className="w-72 flex-shrink-0 border-l border-gray-200 bg-white">
        <ConcreteAnimation />
      </aside>
    </div>
  );
};

export default App;