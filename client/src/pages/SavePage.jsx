import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'; // Import updateDoc here
import React, { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';

const SavePage = () => {
    const [noteName, setNoteName] = useState('');
    const [textContent, setTextContent] = useState('');
    const [notes, setNotes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentNoteId, setCurrentNoteId] = useState(null);
    const [currentNoteName, setCurrentNoteName] = useState('');
    const [currentNoteContent, setCurrentNoteContent] = useState('');
    const { state } = useAuth();

    const handleSaveNote = async () => {
        try {
            await addDoc(collection(db, "notes"), {
                uid: state.user.uid,  // Save the UID of the current user
                name: noteName,
                text: textContent
            });
            loadNotes();
            setNoteName('');
            setTextContent('');
        } catch (error) {
            console.error("Error saving note:", error);
        }
    };

    const loadNotes = async () => {
        if (state.user) {
            const q = query(collection(db, "notes"), where("uid", "==", state.user.uid));
            const querySnapshot = await getDocs(q);
            const notesList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setNotes(notesList);
        }
    };

    const handleEditNote = (note) => {
        setCurrentNoteId(note.id);
        setCurrentNoteName(note.name);
        setCurrentNoteContent(note.text);
        setIsModalOpen(true);
    };

    const handleSaveEditedNote = async () => {
        try {
            await updateDoc(doc(db, "notes", currentNoteId), {
                name: currentNoteName,
                text: currentNoteContent
            });
            loadNotes();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error updating note:", error);
        }
    };

    const handleDeleteNote = async (noteId) => {
        try {
            await deleteDoc(doc(db, "notes", noteId));
            loadNotes();
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    useEffect(() => {
        loadNotes();
    }, [state.user]);  // Reload notes when the user state changes

    return (
        <div className="mx-20 my-36 text-white min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Save Notes</h1>
            <div>
                <div className="mb-4">
                    <label className="block mb-2">Text Content:</label>
                    <textarea
                        value={textContent}
                        onChange={(e) => setTextContent(e.target.value)}
                        className="w-full p-2 bg-gray-700 text-black rounded"
                        rows="6"
                        style={{
                            fontFamily: 'monospace',
                            fontSize: '16px',
                            height: '300px',
                            width: '630px',
                            borderRadius: '10px',
                            boxShadow: '1px 1px 5px white',
                            background: 'linear-gradient(to bottom, #ffffff, #d3d3d3)'
                        }}
                        placeholder="Enter JSON Policy here..."
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Note Name:</label>
                    <input
                        type="text"
                        value={noteName}
                        onChange={(e) => setNoteName(e.target.value)}
                        placeholder="Note Name"
                        className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                    />
                    <button
                        onClick={handleSaveNote}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Save Note
                    </button>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Saved Notes</h2>
                {notes.map((note) => (
                    <div key={note.id} className="mb-4 p-4 bg-gray-800 rounded">
                        <h3
                            className="text-lg font-semibold cursor-pointer"
                            onClick={() => handleEditNote(note)}
                        >
                            {note.name}
                        </h3>
                        <p>{note.text}</p>
                        <button
                            onClick={() => handleDeleteNote(note.id)}
                            className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveEditedNote}
                noteName={currentNoteName}
                setNoteName={setCurrentNoteName}
                noteContent={currentNoteContent}
                setNoteContent={setCurrentNoteContent}
            />
        </div>
    );
};

export default SavePage;
