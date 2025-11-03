import React, { useState } from 'react';
import { PatentFamily } from '../types';
import FamilyGroup from './FamilyGroup';
import EditModal from './EditModal';

interface DashboardViewProps {
  families: PatentFamily[];
  updateFamilyName: (familyId: string, newName: string) => void;
  updatePatentTitle: (familyId: string, patentId: string, newTitle: string) => void;
}

interface EditState {
  type: 'family' | 'patent';
  familyId: string;
  patentId?: string;
  currentValue: string;
}

const DashboardView: React.FC<DashboardViewProps> = ({ families, updateFamilyName, updatePatentTitle }) => {
  const [editing, setEditing] = useState<EditState | null>(null);

  const handleEditFamily = (familyId: string, currentName: string) => {
    setEditing({ type: 'family', familyId, currentValue: currentName });
  };

  const handleEditPatent = (familyId: string, patentId: string, currentTitle: string) => {
    setEditing({ type: 'patent', familyId, patentId, currentValue: currentTitle });
  };

  const handleSave = (newValue: string) => {
    if (!editing) return;
    if (editing.type === 'family') {
      updateFamilyName(editing.familyId, newValue);
    } else if (editing.type === 'patent' && editing.patentId) {
      updatePatentTitle(editing.familyId, editing.patentId, newValue);
    }
    setEditing(null);
  };

  return (
    <div className="space-y-8">
       <h1 className="text-3xl font-bold text-gray-800">Patent Portfolio</h1>
      {families.map(family => (
        <FamilyGroup
          key={family.id}
          family={family}
          onEditFamily={handleEditFamily}
          onEditPatent={handleEditPatent}
        />
      ))}
      {editing && (
        <EditModal
          isOpen={!!editing}
          onClose={() => setEditing(null)}
          onSave={handleSave}
          initialValue={editing.currentValue}
          title={editing.type === 'family' ? 'Edit Family Name' : 'Edit Patent Title'}
        />
      )}
    </div>
  );
};

export default DashboardView;