export interface Patent {
  id: string;
  title: string;
  applicationNumber: string;
  countryCode: string;
  status: 'Pending' | 'Granted' | 'Abandoned';
  filingDate: string;
  publicationDate: string;
  abstract: string;
  inventors: string[];
  applicant: string;
  documents?: Array<{ name: string; url: string; }>;
}

export interface PatentFamily {
  id: string;
  name: string;
  patents: Patent[];
}

export type Page = 'dashboard' | 'tasks' | 'search' | 'reports' | 'settings';

export type TaskImportance = 'Haute' | 'Moyenne' | 'Basse';
export type TaskStatus = 'À faire' | 'Terminé';

export interface Task {
  id: string;
  patentId: string;
  familyId: string;
  patentTitle: string; 
  familyName: string; 
  description: string;
  dueDate: string;
  importance: TaskImportance;
  status: TaskStatus;
}