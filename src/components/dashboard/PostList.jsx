import { useState, useEffect } from 'react';
import { getPosts } from '../../services/posts';
import PostCard from './PostCard';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';

export default function PostList({ onPostsChange }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [category, setCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
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

        fetchPosts();
    }, []);

    const handleDeletePost = async (deletedPostId) => {
        setPosts(posts.filter(post => post.id !== deletedPostId));
        // Notify parent component to refresh posts
        if (onPostsChange) {
            await onPostsChange();
        }
    };

    const filteredPosts = posts.filter(post => {
        const matchesCategory = category === 'all' || post.category === category;
        const searchLower = searchTerm?.toLowerCase() || '';

        // Safely check each field with optional chaining
        const titleMatch = post.title?.toLowerCase()?.includes(searchLower) || false;
        const contentMatch = post.content?.toLowerCase()?.includes(searchLower) || false;
        const authorMatch = post.authorName?.toLowerCase()?.includes(searchLower) || false;

        return matchesCategory && (titleMatch || contentMatch || authorMatch);
    });

    if (loading) {
        return <div className="text-center py-10">Loading posts...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">{error}</div>;
    }

    return (
        <div>
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <Input
                        placeholder="Search posts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full"
                    />
                </div>
                <div className="w-full sm:w-48">
                    <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="Idea">Ideas</SelectItem>
                            <SelectItem value="Project">Projects</SelectItem>
                            <SelectItem value="Skill">Skills</SelectItem>
                            <SelectItem value="Resource">Resources</SelectItem>
                            <SelectItem value="Question">Questions</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {filteredPosts.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-lg">
                    <p className="text-gray-600">No posts found. Try changing your filters or create a new post!</p>
                </div>
            ) : (
                <div>
                    {filteredPosts.map((post) => (
                        <PostCard key={post.id} post={post} onDelete={handleDeletePost} />
                    ))}
                </div>
            )}
        </div>
    );
}