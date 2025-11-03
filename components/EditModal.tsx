
import React, { useState, useEffect } from 'react';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newValue: string) => void;
  initialValue: string;
  title: string;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, onSave, initialValue, title }) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(value);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white border border-gray-300 p-6 w-full max-w-md m-4 transform transition-all duration-300 scale-95 animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        <style>{`.animate-scale-in { animation: scale-in 0.2s ease-out forwards; } @keyframes scale-in { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }`}</style>
        <h2 className="text-2xl font-medium mb-4 text-gray-900">{title}</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={value}
            onChange={e => setValue(e.target.value)}
            className="w-full p-2 border border-gray-300 bg-white text-black focus:ring-1 focus:ring-black focus:border-black"
            rows={4}
            autoFocus
          />
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-black bg-black text-white hover:bg-gray-800 font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-black"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;