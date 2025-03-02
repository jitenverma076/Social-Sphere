import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { getPostById } from '../services/posts';
import { Button } from '../components/ui/button';
import CommentList from '../components/dashboard/CommentList';
import CommentForm from '../components/dashboard/CommentForm';
import { format } from 'date-fns';

export default function PostDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const commentFormRef = useRef(null);
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const fetchedPost = await getPostById(id);
                setPost(fetchedPost);
                setComments(fetchedPost.comments || []);

                // Check if we should focus on comments
                if (searchParams.get('focus') === 'comments' && commentFormRef.current) {
                    commentFormRef.current.scrollIntoView({ behavior: 'smooth' });
                }
            } catch (error) {
                setError('Failed to fetch post details');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id, searchParams]);

    const handleCommentAdded = (newComment) => {
        setComments([...comments, newComment]);
    };

    if (loading) {
        return <div className="text-center py-10">Loading post details...</div>;
    }

    if (error || !post) {
        return (
            <div className="text-center py-10">
                <p className="text-red-500 mb-4">{error || 'Post not found'}</p>
                <Button variant="outline" onClick={() => navigate('/')}>
                    Return to Dashboard
                </Button>
            </div>
        );
    }

    const formattedDate = post.createdAt ?
        format(new Date(post.createdAt.toDate ? post.createdAt.toDate() : post.createdAt), 'MMM d, yyyy') :
        'Recently';

    return (
        <div>
            <Button
                variant="ghost"
                className="mb-4"
                onClick={() => navigate('/')}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back to Dashboard
            </Button>

            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
                <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4">
                    <span className="mr-4">Posted by {post.authorName}</span>
                    <span className="mr-4">on {formattedDate}</span>
                    <span>Category: {post.category || 'General'}</span>
                </div>

                <div className="prose max-w-none mb-6">
                    <p className="text-gray-700 whitespace-pre-line">{post.content}</p>
                </div>

                {post.skills && post.skills.length > 0 && (
                    <div className="mb-6">
                        <h3 className="text-lg font-medium mb-2">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {post.skills.map((skill, index) => (
                                <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Comments ({comments.length})</h2>
                <CommentList comments={comments} />
            </div>

            <div className="bg-white rounded-lg shadow p-6" ref={commentFormRef}>
                <h2 className="text-xl font-bold mb-4">Add a Comment</h2>
                <CommentForm postId={id} onCommentAdded={handleCommentAdded} />
            </div>
        </div>
    );
}