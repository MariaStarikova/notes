import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/shared/config/firebase/firebase-config';
import type { Note } from '@/entities/note/model/note-type';

const notesCollection = collection(db, 'notes');

export const addNote = async (note: Omit<Note, 'id'>): Promise<Note> => {
  const docRef = await addDoc(notesCollection, note);
  return {
    id: docRef.id,
    ...note
  };
};

export const getAllNotes = async (): Promise<Note[]> => {
  const snapshot = await getDocs(notesCollection);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<Note, 'id'>)
  }));
};

export const deleteNote = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'notes', id));
};

export const updateNote = async (id: string, title: string, content: string): Promise<void> => {
  await updateDoc(doc(db, 'notes', id), { title, content });
};
