import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'; // Import the magnifying glass icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
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
    const [searchTerm, setSearchTerm] = useState(''); // Add state for search term
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
            <div className='flex gap-20'>
                <div>
                    <h1 className="text-2xl font-bold mb-4">Save Notes</h1>
                </div>
                <div>
                    <div className="mb-2">

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
                            placeholder=" Write your JSON Policy here..."
                        />
                    </div>
                    <div className="flex gap-4">
                        <input
                            type="text"
                            value={noteName}
                            onChange={(e) => setNoteName(e.target.value)}
                            placeholder=" Name your JSON Policy"
                            style={{
                                fontFamily: 'monospace',
                                fontSize: '16px',
                                height: '50px',
                                width: '466px',
                                borderRadius: '10px',
                                boxShadow: '1px 1px 4px white',
                                background: 'linear-gradient(to bottom, #ffffff, #d3d3d3)'
                            }}
                            className="w-full p-2  bg-gray-700 text-black rounded"
                        />
                        <button
                            onClick={handleSaveNote}
                            className=" text-white font-bold rounded "
                            style={{
                                height: '50px',
                                width: '150px',
                                borderRadius: '10px',
                                boxShadow: '1px 1px 4px blue',

                            }}
                        >
                            Save Note
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex gap-2 mt-10'>
                <h2 className="text-xl font-bold mb-4">Saved Notes</h2>
                <div className="relative flex items-center"> {/* Wrapper for input and icon */}
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Update search term on change
                        placeholder="Search notes..."
                        className="rounded pl-10 text-black w-full"
                        style={{
                            height: '30px',
                            borderRadius: '4px',
                            boxShadow: '1px 1px 5px blue',
                        }}
                    />
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="absolute left-3 text-gray-500"
                    />
                </div>
            </div>

            <div className=" flex flex-wrap gap-4 mt-8">

                {notes.filter(note => note.name.toLowerCase().includes(searchTerm.toLowerCase())).map((note) => ( // Filter notes based on search term
                    <div key={note.id}
                        style={{
                            paddingRight: '16px',
                            paddingLeft: '20px',
                            height: '60px',
                            width: '250px',
                            fontSize: '16px',
                            borderRadius: '10px',
                            boxShadow: '1px 1px 5px blue',
                            overflow: 'hidden',  // Prevent overflow
                            textOverflow: 'ellipsis',  // Add ellipsis for overflowed text
                            whiteSpace: 'nowrap',  // Prevent text wrapping
                            display: 'flex',  // Center items
                            flexDirection: 'row',  // Align items vertically
                            justifyContent: 'space-between',  // Space between items
                            alignItems: 'center'  // Center items vertically
                        }}
                        className="flex gap-2 justify-center rounded">
                        <h3
                            className="text-lg font-semibold cursor-pointer"
                            onClick={() => handleEditNote(note)}
                        >
                            {note.name.length > 16 ? note.name.slice(0, 16) + '..' : note.name}
                        </h3>

                        <button
                            onClick={() => handleDeleteNote(note.id)}
                            className=" bg-red-600 hover:bg-red-700 px-2 py-1 text-white text-sm font-bold  rounded"
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