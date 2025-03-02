import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { useAuth } from '../../context/AuthContext';
import { toggleLike, deletePost } from '../../services/posts';
import { format } from 'date-fns';

export default function PostCard({ post, onDelete }) {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [isLiked, setIsLiked] = useState(post.likes?.includes(currentUser?.uid));
    const [likeCount, setLikeCount] = useState(post.likes?.length || 0);

    const handleLike = async () => {
        if (!currentUser) return;

        try {
            await toggleLike(post.id, currentUser.uid, isLiked);
            setIsLiked(!isLiked);
            setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    };

    const handleDelete = async () => {
        if (!currentUser || currentUser.uid !== post.authorId) return;

        try {
            await deletePost(post.id);
            if (onDelete) onDelete(post.id);
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleCommentClick = () => {
        navigate(`/post/${post.id}?focus=comment`);
    };

    const formattedDate = post.createdAt ?
        format(new Date(post.createdAt.toDate ? post.createdAt.toDate() : post.createdAt), 'MMM d, yyyy') :
        'Just now';

    return (
        <Card className="mb-4">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                    {currentUser && currentUser.uid === post.authorId && (
                        <Button variant="ghost" size="sm" onClick={handleDelete}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                                <path d="M3 6h18"></path>
                                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"></path>
                                <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                            </svg>
                        </Button>
                    )}
                </div>
                <div className="text-sm text-gray-500">
                    Posted by {post.authorName} on {formattedDate}
                </div>
                <div className="text-sm text-gray-500">
                    Category: {post.category || 'General'}
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-gray-700">{post.content}</p>
                {post.skills && post.skills.length > 0 && (
                    <div className="mt-2">
                        <p className="text-sm font-medium text-gray-700">Skills:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                            {post.skills.map((skill, index) => (
                                <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex justify-between">
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleLike}
                        disabled={!currentUser}
                        className={isLiked ? "text-blue-600" : "text-gray-500"}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                        </svg>
                        {likeCount} {likeCount === 1 ? 'Like' : 'Likes'}
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        onClick={handleCommentClick}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                        </svg>
                        {post.comments?.length || 0} {post.comments?.length === 1 ? 'Comment' : 'Comments'}
                    </Button>
                </div>
                <Link to={`/post/${post.id}`}>
                    <Button variant="outline" size="sm">View Details</Button>
                </Link>
            </CardFooter>
        </Card>
    );
}