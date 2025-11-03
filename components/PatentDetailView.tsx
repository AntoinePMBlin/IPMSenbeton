
import React, { useState, useEffect } from 'react';
import { Patent, PatentFamily, Task, TaskImportance } from '../types';
import { ArrowLeftIcon, EditIcon, CheckIcon, XIcon, ExternalLinkIcon } from './icons/Icons';

// Reusable components for this view
const InfoField: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
    <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{label}</h3>
        <div className="text-base text-gray-800 mt-1 whitespace-pre-wrap">{children}</div>
    </div>
);

const EditField: React.FC<{ label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void; type?: string; rows?: number; options?: string[] }> = ({ label, name, value, onChange, type = 'text', rows, options }) => (
    <div className="mb-4">
        <label htmlFor={name} className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
        {type === 'textarea' ? (
            <textarea id={name} name={name} value={value} onChange={onChange} rows={rows} className="w-full p-2 border border-gray-300 bg-white text-black focus:ring-1 focus:ring-black focus:border-black" />
        ) : type === 'select' && options ? (
            <select id={name} name={name} value={value} onChange={onChange} className="w-full p-2 border border-gray-300 bg-white text-black focus:ring-1 focus:ring-black focus:border-black">
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
        ) : (
            <input type={type} id={name} name={name} value={value} onChange={onChange} className="w-full p-2 border border-gray-300 bg-white text-black focus:ring-1 focus:ring-black focus:border-black" />
        )}
    </div>
);

interface PatentDetailViewProps {
    family: PatentFamily;
    patent: Patent;
    onBack: () => void;
    onSelectPatent: (patentId: string) => void;
    updatePatent: (patentId: string, updatedDetails: Partial<Patent>) => void;
    tasks: Task[];
    addTask: (task: Omit<Task, 'id' | 'status'>) => void;
}

const predefinedTasks = [
    'Réponse à une notification officielle',
    'Paiement d\'une annuité',
    'Dépôt d\'une traduction',
    'Validation européenne',
    'Requête en examen',
    'Autre'
];

const PatentDetailView: React.FC<PatentDetailViewProps> = ({ family, patent, onBack, onSelectPatent, updatePatent, tasks, addTask }) => {
    const [activeTab, setActiveTab] = useState('Biblio');
    const [editMode, setEditMode] = useState(false);
    const [editablePatent, setEditablePatent] = useState<Patent>(patent);
    
    // Task form state
    const [taskDesc, setTaskDesc] = useState(predefinedTasks[0]);
    const [customTaskDesc, setCustomTaskDesc] = useState('');
    const [taskDueDate, setTaskDueDate] = useState('');
    const [taskImportance, setTaskImportance] = useState<TaskImportance>('Moyenne');

    useEffect(() => {
        setEditablePatent(patent);
        setEditMode(false); // Exit edit mode when patent changes
        setActiveTab('Biblio'); // Reset to biblio tab on patent change
    }, [patent]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditablePatent(prev => ({ ...prev, [name]: value }));
    };
    
    const handleInventorsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setEditablePatent(prev => ({ ...prev, inventors: value.split(',').map(s => s.trim()) }));
    }

    const handleSave = () => {
        updatePatent(patent.id, editablePatent);
        setEditMode(false);
    };

    const handleCancel = () => {
        setEditablePatent(patent);
        setEditMode(false);
    };

    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!taskDueDate) {
            alert("Veuillez sélectionner une date d'échéance.");
            return;
        }
        const description = taskDesc === 'Autre' ? customTaskDesc : taskDesc;
        if (!description) {
            alert("Veuillez entrer une description pour la tâche.");
            return;
        }

        addTask({
            patentId: patent.id,
            familyId: family.id,
            patentTitle: patent.title,
            familyName: family.name,
            description,
            dueDate: taskDueDate,
            importance: taskImportance,
        });

        // Reset form
        setTaskDesc(predefinedTasks[0]);
        setCustomTaskDesc('');
        setTaskDueDate('');
        setTaskImportance('Moyenne');
    };

    const tabs = ['Biblio', 'Tâches', 'Revendications', 'Description', 'Documents'];

    const renderBiblioContent = () => {
        // (content remains the same as previous version)
        if (editMode) {
            return (
                <div className="p-1">
                    <EditField label="Title" name="title" value={editablePatent.title} onChange={handleChange} type="textarea" rows={3} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                        <EditField label="Application Number" name="applicationNumber" value={editablePatent.applicationNumber} onChange={handleChange} />
                        <EditField label="Country Code" name="countryCode" value={editablePatent.countryCode} onChange={handleChange} />
                        <EditField label="Filing Date" name="filingDate" value={editablePatent.filingDate} onChange={handleChange} type="date" />
                        <EditField label="Publication Date" name="publicationDate" value={editablePatent.publicationDate} onChange={handleChange} type="date" />
                        <EditField label="Status" name="status" value={editablePatent.status} onChange={handleChange} type="select" options={['Pending', 'Granted', 'Abandoned']} />
                        <EditField label="Applicant/Assignee" name="applicant" value={editablePatent.applicant} onChange={handleChange} />
                    </div>
                    <EditField label="Inventor(s) (comma separated)" name="inventors" value={editablePatent.inventors.join(', ')} onChange={handleInventorsChange} />
                    <EditField label="Abstract" name="abstract" value={editablePatent.abstract} onChange={handleChange} type="textarea" rows={6} />
                </div>
            )
        }
        return (
             <div>
                <InfoField label="Abstract">{patent.abstract}</InfoField>
                <InfoField label="Inventor(s)">{patent.inventors.join(', ')}</InfoField>
                <InfoField label="Applicant/Assignee">{patent.applicant}</InfoField>
                <div className="grid grid-cols-2 gap-x-8">
                    <InfoField label="Filing Date">{new Date(patent.filingDate).toLocaleDateString()}</InfoField>
                    <InfoField label="Publication Date">{new Date(patent.publicationDate).toLocaleDateString()}</InfoField>
                    <InfoField label="Status">{patent.status}</InfoField>
                    <InfoField label="Publication">{patent.applicationNumber} [{patent.countryCode}]</InfoField>
                </div>
            </div>
        )
    }

    const renderTasksContent = () => (
        <div className="space-y-8">
            <div>
                <h2 className="text-lg font-medium mb-4">Ajouter une nouvelle tâche</h2>
                <form onSubmit={handleAddTask} className="p-4 bg-white border border-gray-200 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Chose à faire</label>
                        <select value={taskDesc} onChange={(e) => setTaskDesc(e.target.value)} className="w-full p-2 border border-gray-300 bg-white text-black">
                            {predefinedTasks.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>
                    {taskDesc === 'Autre' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Description personnalisée</label>
                            <input type="text" value={customTaskDesc} onChange={e => setCustomTaskDesc(e.target.value)} className="w-full p-2 border border-gray-300 bg-white text-black" />
                        </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Date d'échéance</label>
                            <input type="date" value={taskDueDate} onChange={e => setTaskDueDate(e.target.value)} className="w-full p-2 border border-gray-300 bg-white text-black" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Importance</label>
                            <select value={taskImportance} onChange={e => setTaskImportance(e.target.value as TaskImportance)} className="w-full p-2 border border-gray-300 bg-white text-black">
                                <option value="Haute">Haute</option>
                                <option value="Moyenne">Moyenne</option>
                                <option value="Basse">Basse</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="px-4 py-2 border border-black bg-black text-white hover:bg-gray-800 font-medium transition-colors">
                            Ajouter la tâche
                        </button>
                    </div>
                </form>
            </div>
             <div>
                <h2 className="text-lg font-medium mb-4">Tâches existantes</h2>
                {tasks.length > 0 ? (
                    <ul className="space-y-2">
                        {tasks.map(task => (
                            <li key={task.id} className="p-3 bg-white border border-gray-200 flex justify-between items-center">
                                <div>
                                    <p className="font-medium">{task.description}</p>
                                    <p className="text-sm text-gray-500">Échéance: {new Date(task.dueDate).toLocaleDateString()}</p>
                                </div>
                                <span className="text-sm font-semibold">{task.importance}</span>
                            </li>
                        ))}
                    </ul>
                ) : <p className="text-gray-500">Aucune tâche pour ce brevet.</p>}
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Top Header */}
            <header className="flex items-start justify-between pb-4 border-b border-gray-200 mb-4 flex-wrap">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                    <button onClick={onBack} className="p-2 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-black transition-colors flex-shrink-0" aria-label="Back to family view">
                        <ArrowLeftIcon className="h-5 w-5" />
                    </button>
                    <div className="flex-1 min-w-0">
                        <h1 className="text-2xl font-normal text-gray-900 leading-tight truncate">{patent.title}</h1>
                    </div>
                </div>
                <div className="flex-shrink-0 mt-2 sm:mt-0 sm:ml-4">
                    <button onClick={() => setEditMode(!editMode)} className={`flex items-center px-4 py-2 border text-sm font-medium transition-colors ${editMode ? 'bg-gray-100 text-gray-800' : 'bg-white text-gray-800 hover:bg-gray-50 border-gray-300'}`}>
                        <EditIcon className="w-4 h-4 mr-2" />
                        {editMode ? 'Viewing' : 'Edit'}
                    </button>
                </div>
            </header>

            {/* Main 3-column Layout */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left Sidebar: Family Patents */}
                <aside className="w-1/4 max-w-xs flex-shrink-0 border-r border-gray-200 pr-4 overflow-y-auto">
                    <h2 className="font-medium text-gray-800 mb-2 px-2">Vue famille</h2>
                    <nav>
                        <ul>
                            {family.patents.map(p => (
                                <li key={p.id}>
                                    <button
                                        onClick={() => onSelectPatent(p.id)}
                                        className={`w-full text-left p-2 text-sm transition-colors my-1 ${patent.id === p.id ? 'bg-gray-100 font-semibold text-black' : 'text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        <span className="font-bold mr-2">{p.countryCode}</span>
                                        {p.applicationNumber}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 px-6 overflow-y-auto">
                    <div className="border-b border-gray-200 mb-6">
                        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                            {tabs.map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`py-3 px-1 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black hover:border-gray-300'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="relative">
                        {activeTab === 'Biblio' && renderBiblioContent()}
                        {activeTab === 'Tâches' && renderTasksContent()}
                        {activeTab === 'Documents' && (
                             <div>
                                <h2 className="text-lg font-medium mb-4">Related Documents</h2>
                                {patent.documents && patent.documents.length > 0 ? (
                                    <ul className="space-y-3">
                                        {patent.documents.map((doc, index) => (
                                            <li key={index} className="flex items-center justify-between p-3 bg-white border border-gray-200">
                                                <span className="text-gray-800">{doc.name}</span>
                                                <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black">
                                                    <ExternalLinkIcon className="w-5 h-5"/>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                ) : <p className="text-gray-500">No documents available.</p>}
                            </div>
                        )}
                        {activeTab !== 'Biblio' && activeTab !== 'Documents' && activeTab !== 'Tâches' && (
                            <div className="text-gray-500 p-4 bg-white border border-gray-200">
                                Content for {activeTab} will be displayed here.
                            </div>
                        )}

                        {editMode && activeTab === 'Biblio' && (
                            <div className="mt-6 flex justify-end space-x-3 p-4 bg-gray-50/50 border-t border-gray-200 sticky bottom-0">
                                <button onClick={handleCancel} className="flex items-center px-4 py-2 border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 font-medium transition-colors">
                                    <XIcon className="w-5 h-5 mr-2" /> Cancel
                                </button>

                                <button onClick={handleSave} className="flex items-center px-4 py-2 border border-black bg-black text-white hover:bg-gray-800 font-medium transition-colors">
                                    <CheckIcon className="w-5 h-5 mr-2" /> Save Changes
                                </button>
                            </div>
                        )}
                    </div>
                </main>

                {/* Right Sidebar: Figures */}
                <aside className="w-1/4 max-w-sm flex-shrink-0 border-l border-gray-200 pl-4">
                     <h2 className="font-medium text-gray-800 mb-4">Image</h2>
                     <div className="bg-gray-100 border border-gray-200 h-64 flex items-center justify-center text-gray-500">
                         <p>Patent figures would be displayed here.</p>
                     </div>
                </aside>
            </div>
        </div>
    );
};

export default PatentDetailView;