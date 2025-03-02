import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export const submitContactForm = async (contactData) => {
    try {
        // Validate inputs
        if (!contactData.name || !contactData.email || !contactData.message) {
            throw new Error('All fields are required');
        }

        if (!validateEmail(contactData.email)) {
            throw new Error('Please enter a valid email address');
        }

        const contactsRef = collection(db, 'contacts');
        const docRef = await addDoc(contactsRef, {
            ...contactData,
            createdAt: serverTimestamp(),
            status: 'new'
        });

        if (!docRef.id) {
            throw new Error('Failed to create contact message');
        }

        return docRef.id;
    } catch (error) {
        console.error('Error submitting contact form:', error);
        if (error.code === 'permission-denied') {
            throw new Error('Server configuration error. Please try again later.');
        }
        throw error;
    }
}; 