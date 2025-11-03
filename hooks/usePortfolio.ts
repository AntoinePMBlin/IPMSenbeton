
import { useState, useCallback } from 'react';
import { PatentFamily, Patent, Task, TaskImportance } from '../types';
import { MOCK_FAMILIES } from '../constants';

const MOCK_TASKS: Task[] = [
    { id: 'task-1', patentId: 'pat-103', familyId: 'fam-101', patentTitle: 'Enduit de lissage au chocolat, faible en calories', familyName: 'Placo-plâtre Gastronomique', description: 'Vérifier la date de péremption de l\'enduit', dueDate: '2024-09-30', importance: 'Haute', status: 'À faire' },
    { id: 'task-2', patentId: 'pat-107', familyId: 'fam-102', patentTitle: 'Dalle de béton qui devient moelleuse sous les pieds fatigués', familyName: 'Béton à Réaction Émotionnelle', description: 'Calibrer la douceur de la dalle', dueDate: '2024-10-15', importance: 'Moyenne', status: 'À faire' },
    { id: 'task-3', patentId: 'pat-135', familyId: 'fam-109', patentTitle: 'Enduit de façade qui absorbe le bruit de la ville', familyName: 'Cimenterie Sonore et Musicale', description: 'Payer l\'annuité pour le brevet de l\'enduit silencieux', dueDate: '2024-09-25', importance: 'Basse', status: 'Terminé' },
];

export const usePortfolio = () => {
  const [families, setFamilies] = useState<PatentFamily[]>(MOCK_FAMILIES);
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);

  const updateFamilyName = useCallback((familyId: string, newName: string) => {
    setFamilies(currentFamilies =>
      currentFamilies.map(family =>
        family.id === familyId ? { ...family, name: newName } : family
      )
    );
  }, []);

  const updatePatentDetails = useCallback((familyId: string, patentId: string, updatedDetails: Partial<Patent>) => {
    setFamilies(currentFamilies =>
      currentFamilies.map(family =>
        family.id === familyId
          ? {
              ...family,
              patents: family.patents.map(patent =>
                patent.id === patentId ? { ...patent, ...updatedDetails } : patent
              ),
            }
          : family
      )
    );
  }, []);
  
  const addTask = useCallback((taskData: Omit<Task, 'id' | 'status'>) => {
      const newTask: Task = {
          ...taskData,
          id: `task-${Date.now()}`,
          status: 'À faire',
      };
      setTasks(currentTasks => [...currentTasks, newTask]);
  }, []);

  const updateTaskStatus = useCallback((taskId: string, newStatus: Task['status']) => {
      setTasks(currentTasks => 
          currentTasks.map(task => 
              task.id === taskId ? { ...task, status: newStatus } : task
          )
      );
  }, []);

  return { families, tasks, addTask, updateTaskStatus, updateFamilyName, updatePatentDetails };
};
