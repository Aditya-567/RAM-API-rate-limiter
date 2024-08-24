import React from 'react';

const Modal = ({ isOpen, onClose, onSave, noteName, setNoteName, noteContent, setNoteContent }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50 backdrop-blur-sm">
            <div className="bg-gray-800 p-6 rounded-lg max-w-4xl w-full">
                <h2 className="text-3xl font-bold mb-4">Edit Policy</h2>
                <div className="mb-4">
                    <label className="block  font-bold mb-2">Policy Name:</label>
                    <input
                        type="text"
                        value={noteName}
                        style={{ fontFamily: 'monospace', fontSize: '16px' }}
                        onChange={(e) => setNoteName(e.target.value)}
                        className="w-full p-2 bg-gray-700 text-lg text-white rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-lg font-bold">Text Content:</label>
                    <textarea
                        value={noteContent}
                        onChange={(e) => setNoteContent(e.target.value)}
                        style={{ fontFamily: 'monospace', fontSize: '16px' }}
                        className="w-full p-2 bg-gray-700  text-white rounded"
                        rows="12"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-red-500 hover:bg-red-800 text-white font-bold py-1 px-4 rounded mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSave}
                        className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-1 px-4 rounded"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
