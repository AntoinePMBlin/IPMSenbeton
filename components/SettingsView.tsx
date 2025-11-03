
import React from 'react';

const SettingsView: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-normal text-gray-800">Settings</h1>
      <div className="p-6 bg-white border border-gray-200">
        <h2 className="text-xl font-medium mb-4 text-gray-700">Appearance</h2>
        <p className="text-gray-600">The application is set to the default light theme.</p>
      </div>
    </div>
  );
};

export default SettingsView;