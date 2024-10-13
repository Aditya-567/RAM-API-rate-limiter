import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'; // Correctly import the icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Add this import
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'; // Import updateDoc here
import React, { useEffect, useState } from 'react';
import arrow from '../assets/arrow.png';
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
                text: textContent,
                createdAt: new Date() // Add creation timestamp
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
        <div className="mx-32 my-40 text-white min-h-screen">
            <div className='flex gap-20'>
                <div><h1 className='text-5xl font-bold mb-10 ' >JSON Policy Manager</h1>
                    <h1 className='text-lg font-bold' style={{ fontFamily: 'monospace', width: '600px' }}>Here, you can effortlessly write and save your JSON policies for
                        future use. Whether you're fine-tuning API requests, setting up configurations, or simply experimenting,
                        JSON Lab is your go-to tool. Save your work securely and edit your policies
                        anytime you want, making it easier to manage and reuse your JSON scripts efficiently.</h1>

                    <ul className='list-disc my-2 text-lg'>
                        <li style={{ fontFamily: 'monospace', }}><span className='text-yellow-500 font-bold ' style={{ fontFamily: 'Digital-7 Mono', }} >Easy Creation and Editing:</span >  Craft your JSON policies with an intuitive editor that lets you focus on what matters most—your code.</li>
                        <li style={{ fontFamily: 'monospace', }}><span className='text-yellow-500 font-bold' style={{ fontFamily: 'Digital-7 Mono', }}>Secure Storage: </span> Your policies are stored securely, ensuring that your important configurations are always accessible when you need them.</li>

                    </ul>
                    <h1 className='text-lg font-bold'>Start creating, and let JSON Policy Manager handle the rest!</h1>
                </div>
                <div className=''>
                    <div className="mb-2">

                        <textarea
                            value={textContent}
                            onChange={(e) => setTextContent(e.target.value)}
                            className="w-full p-2 bg-gray-700 text-black rounded"
                            rows="6"
                            style={{
                                fontFamily: 'monospace',
                                fontSize: '16px',
                                height: '350px',
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
                            className=" font-bold rounded text-lg p-2 relative overflow-hidden hover:text-blue-900 "
                            style={{
                                height: '50px',
                                width: '150px',
                                borderRadius: '10px',
                                boxShadow: '1px 1px 4px blue',

                            }}
                        >
                            <span className="relative z-10">Save Policy</span>
                        </button>

                    </div>
                    <h1
                        className='text-white font-bold text-xl mt-6 cursor-pointer'
                        onClick={() => document.getElementById('saved').scrollIntoView({ behavior: 'smooth' })}
                    >
                        ⬇️ <span className='text-blue-500'>Click here !!!</span> to save your policy ⬇️
                    </h1>
                </div>
            </div>
            <div className='text-center mt-40  mb-10'> {/* Centered text content */}
                <h2 className="text-4xl font-bold mb-4">Saved Policies</h2>
                <div className="flex justify-center items-center"> {/* Centering wrapper */}
                    <div className="relative flex items-center"> {/* Wrapper for input and icon */}
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className="absolute left-4 text-gray-500"
                            style={{ fontSize: '18px' }}
                        /> {/* Search icon inside input */}
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} // Update search term on change
                            placeholder="Search your policies" // Updated placeholder
                            className="rounded-full pl-12 font-bold text-gray-900 w-full" // Changed to rounded-full with padding for icon
                            style={{
                                height: '50px', // Adjusted height
                                width: '800px', // Set width
                                backgroundColor: '#e0e0e0', // Light background color
                                borderRadius: '20px', // Fully rounded corners
                                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', // Softer shadow
                                border: 'none', // Removed border

                            }}
                        />
                    </div>
                </div>


            </div>

            <div id='saved' className="my-8">
                <div className="flex justify-between items-center text-white font-bold border-b border-gray-700 pb-2 mb-4">
                    <div className="w-1/2">Name</div>
                    <div className="w-1/2 text-left">EDITED AT</div>

                </div>

                {notes.filter(note => note.name.toLowerCase().includes(searchTerm.toLowerCase())).map((note) => (
                    <div key={note.id} className="flex justify-between items-center bg-gray-800 text-white rounded-lg py-2 px-4 mb-2">
                        <div className="flex items-center w-1/2">
                            <img src={arrow} alt="PDF Icon" className="h-6 mr-2" style={{ filter: 'invert(100%)' }} />
                            <h3
                                className="text-lg font-semibold cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap"
                                onClick={() => handleEditNote(note)}
                                style={{ maxWidth: 'calc(100% - 30px)' }}
                            >
                                {note.name}
                            </h3>
                        </div>

                        <div className="flex items-center justify-between w-1/2">
                            <div className="text-gray-400 text-right">
                                {/* Display actual creation time */}
                                You created • {note.createdAt ? new Date(note.createdAt.seconds * 1000).toLocaleString() : 'Unknown time'} {/* Convert Firestore timestamp */}
                            </div>
                            <button
                                onClick={() => handleDeleteNote(note.id)}
                                className="border-2 border-red-600 p-2 relative overflow-hidden hover:text-red-900  text-sm font-bold px-3 py-1 ml-4"
                            >
                                <span className="relative z-10">Delete</span>
                            </button>
                        </div>
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