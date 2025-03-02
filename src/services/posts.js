import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    query,
    orderBy,
    serverTimestamp,
    updateDoc,
    deleteDoc,
    arrayUnion,
    arrayRemove
} from 'firebase/firestore';
import { db } from './firebase';

export const createPost = async (postData) => {
    try {
        // Validate required fields
        if (!postData.authorId) {
            throw new Error('Author ID is required');
        }
        if (!postData.content) {
            throw new Error('Post content is required');
        }

        // Create the post with required fields and defaults
        const postRef = await addDoc(collection(db, 'posts'), {
            authorId: postData.authorId,
            content: postData.content,
            title: postData.title || '',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            likes: [],
            comments: [],
            imageUrl: postData.imageUrl || null,
        });

        // Fetch the created post to return complete data
        const postSnap = await getDoc(postRef);
        return {
            id: postRef.id,
            ...postSnap.data()
        };
    } catch (error) {
        console.error('Error creating post:', error);
        throw new Error(
            error.code === 'permission-denied'
                ? 'You do not have permission to create posts. Please make sure you are logged in.'
                : 'Failed to create post. Please try again.'
        );
    }
};

export const getPosts = async () => {
    try {
        const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        throw error;
    }
};

export const getPostById = async (postId) => {
    try {
        const postDoc = await getDoc(doc(db, 'posts', postId));
        if (postDoc.exists()) {
            return { id: postDoc.id, ...postDoc.data() };
        } else {
            throw new Error('Post not found');
        }
    } catch (error) {
        throw error;
    }
};

export const addComment = async (postId, comment) => {
    try {
        if (!postId) {
            throw new Error('Post ID is required');
        }
        if (!comment.content || !comment.authorId || !comment.authorName) {
            throw new Error('Comment must include content, authorId, and authorName');
        }

        const postRef = doc(db, 'posts', postId);

        // Get the post first to verify it exists
        const postSnap = await getDoc(postRef);
        if (!postSnap.exists()) {
            throw new Error('Post not found');
        }

        // Add timestamp to the comment
        const commentWithTimestamp = {
            ...comment,
            createdAt: new Date().toISOString(),
            id: Math.random().toString(36).substr(2, 9) // Simple unique ID
        };

        await updateDoc(postRef, {
            comments: arrayUnion(commentWithTimestamp)
        });

        return commentWithTimestamp;
    } catch (error) {
        console.error('Error adding comment:', error);
        throw new Error(
            error.code === 'permission-denied'
                ? 'You must be logged in to comment'
                : 'Failed to add comment. Please try again.'
        );
    }
};

export const toggleLike = async (postId, userId, isLiked) => {
    try {
        const postRef = doc(db, 'posts', postId);
        if (isLiked) {
            await updateDoc(postRef, {
                likes: arrayRemove(userId)
            });
        } else {
            await updateDoc(postRef, {
                likes: arrayUnion(userId)
            });
        }
    } catch (error) {
        throw error;
    }
};

export const deletePost = async (postId) => {
    try {
        await deleteDoc(doc(db, 'posts', postId));
    } catch (error) {
        throw error;
    }
};