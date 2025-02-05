import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "../config/firebase";

const COLLECTION_NAME = "students";

export const addStudent = async (studentData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), studentData);
    return docRef.id;
  } catch (error) {
    console.error("Error adding student:", error);
    throw error;
  }
};

export const updateStudent = async (id, studentData) => {
  try {
    const studentRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(studentRef, studentData);
  } catch (error) {
    console.error("Error updating student:", error);
    throw error;
  }
};

export const deleteStudent = async (id) => {
  try {
    const studentRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(studentRef);
  } catch (error) {
    console.error("Error deleting student:", error);
    throw error;
  }
};

export const getAllStudents = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting students:", error);
    return []; // Return empty array on error
  }
};
