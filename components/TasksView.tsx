
import React, { useState, useMemo } from 'react';
import { Task, TaskImportance, TaskStatus } from '../types';

interface TasksViewProps {
  tasks: Task[];
  onNavigateToPatent: (familyId: string, patentId: string) => void;
  onUpdateTaskStatus: (taskId: string, newStatus: TaskStatus) => void;
}

const importanceOrder: Record<TaskImportance, number> = { 'Haute': 1, 'Moyenne': 2, 'Basse': 3 };

const getImportanceClasses = (importance: TaskImportance) => {
  switch (importance) {
    case 'Haute': return 'bg-red-100 text-red-800';
    case 'Moyenne': return 'bg-yellow-100 text-yellow-800';
    case 'Basse': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const TasksView: React.FC<TasksViewProps> = ({ tasks, onNavigateToPatent, onUpdateTaskStatus }) => {
  const [sortBy, setSortBy] = useState<'dueDate' | 'importance'>('dueDate');

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      if (sortBy === 'importance') {
        return importanceOrder[a.importance] - importanceOrder[b.importance];
      }
      // Default to dueDate
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  }, [tasks, sortBy]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-normal text-gray-900">Tâches</h1>
      
      <div className="flex items-center gap-4 p-4 bg-white border border-gray-200">
        <span className="font-medium text-gray-700">Trier par:</span>
        <div className="flex flex-wrap gap-2">
            <button onClick={() => setSortBy('dueDate')} className={`px-3 py-1 text-sm border transition-all duration-200 ${sortBy === 'dueDate' ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}>
                Date d'échéance
            </button>
            <button onClick={() => setSortBy('importance')} className={`px-3 py-1 text-sm border transition-all duration-200 ${sortBy === 'importance' ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}>
                Importance
            </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-white">
            <tr>
              <th className="p-4 text-sm font-medium uppercase tracking-wider border-b border-gray-300">Importance</th>
              <th className="p-4 text-sm font-medium uppercase tracking-wider border-b border-gray-300">Tâche</th>
              <th className="p-4 text-sm font-medium uppercase tracking-wider border-b border-gray-300">Brevet Associé</th>
              <th className="p-4 text-sm font-medium uppercase tracking-wider border-b border-gray-300">Échéance</th>
              <th className="p-4 text-sm font-medium uppercase tracking-wider border-b border-gray-300">Statut</th>
            </tr>
          </thead>
          <tbody>
            {sortedTasks.map(task => (
              <tr 
                key={task.id} 
                className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50/50 transition-colors group"
              >
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getImportanceClasses(task.importance)}`}>
                    {task.importance}
                  </span>
                </td>
                <td 
                    className="p-4 font-medium cursor-pointer" 
                    onClick={() => onNavigateToPatent(task.familyId, task.patentId)}
                >
                    {task.description}
                </td>
                <td 
                    className="p-4 text-gray-600 cursor-pointer"
                    onClick={() => onNavigateToPatent(task.familyId, task.patentId)}
                >
                    <div className="text-sm">{task.patentTitle}</div>
                    <div className="text-xs text-gray-500">{task.familyName}</div>
                </td>
                <td className="p-4 text-gray-600">{new Date(task.dueDate).toLocaleDateString()}</td>
                <td className="p-4">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpdateTaskStatus(task.id, task.status === 'À faire' ? 'Terminé' : 'À faire');
                    }}
                    className={`px-3 py-1 text-sm font-medium border rounded-md transition-colors ${
                      task.status === 'À faire'
                        ? 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                        : 'bg-green-600 text-white border-green-600'
                    }`}
                  >
                    {task.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {tasks.length === 0 && <p className="p-4 text-center text-gray-500">Aucune tâche à afficher.</p>}
      </div>
    </div>
  );
};

export default TasksView;