import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export const registerUser = async (email, password, displayName) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        await updateProfile(userCredential.user, { displayName });

        
        try {
            await setDoc(doc(db, 'users', userCredential.user.uid), {
                uid: userCredential.user.uid,
                email,
                displayName,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
        } catch (dbError) {
            console.error('Error creating user document:', dbError);
            // Even if the document creation fails, the user is still created
            // You might want to handle this case in your application
        }

        return userCredential.user;
    } catch (error) {
        console.error('Registration error:', error);
        throw new Error(
            error.code === 'auth/email-already-in-use'
                ? 'This email is already registered. Please try logging in instead.'
                : error.code === 'auth/weak-password'
                    ? 'Password should be at least 6 characters long.'
                    : 'Failed to create account. Please try again.'
        );
    }
};

export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        throw error;
    }
};