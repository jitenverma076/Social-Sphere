import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { addComment } from '../../services/posts';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Alert, AlertDescription } from '../ui/alert';

export default function CommentForm({ postId, onCommentAdded }) {
    const { currentUser } = useAuth();
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentUser) {
            setError('You must be logged in to comment');
            return;
        }

        if (!content.trim()) {
            setError('Comment cannot be empty');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const newComment = {
                content: content.trim(),
                authorId: currentUser.uid,
                authorName: currentUser.displayName || currentUser.email,
                createdAt: new Date()
            };

            await addComment(postId, newComment);
            setContent('');

            if (onCommentAdded) {
                onCommentAdded(newComment);
            }
        } catch (error) {
            setError('Failed to add comment. Please try again.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (!currentUser) {
        return (
            <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-gray-600 mb-2">Please log in to comment</p>
                <Button variant="default" onClick={() => window.location.href = '/login'}>
                    Login
                </Button>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 p-4 rounded-lg">
            <form onSubmit={handleSubmit}>
                {error && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Add a comment..."
                    className="mb-4"
                    rows={3}
                />
                <Button type="submit" disabled={loading || !content.trim()}>
                    {loading ? 'Posting...' : 'Post Comment'}
                </Button>
            </form>
        </div>
    );
}