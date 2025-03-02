import { useState, useEffect } from 'react';
import { getPosts } from '../services/posts';
import NewPostForm from '../components/dashboard/NewPostForm';
import PostList from '../components/dashboard/PostList';

export default function Dashboard() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchPosts = async () => {
        try {
            const fetchedPosts = await getPosts();
            setPosts(fetchedPosts);
        } catch (error) {
            setError('Failed to fetch posts');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handlePostCreated = async (newPost) => {
        // Optimistically add the new post to the state
        setPosts(prevPosts => [newPost, ...prevPosts]);

        // Fetch fresh data to ensure everything is in sync
        await fetchPosts();
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Social Sphere</h1>
                <p className="text-gray-600">Connect, share ideas, and collaborate with others</p>
            </div>

            <NewPostForm onPostCreated={handlePostCreated} />

            {loading ? (
                <div className="text-center py-10">Loading posts...</div>
            ) : error ? (
                <div className="text-center py-10 text-red-500">{error}</div>
            ) : (
                <PostList posts={posts} onPostsChange={fetchPosts} />
            )}
        </div>
    );
}