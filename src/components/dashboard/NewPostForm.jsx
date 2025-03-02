import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { createPost } from '../../services/posts';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Alert, AlertDescription } from '../ui/alert';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

export default function NewPostForm({ onPostCreated }) {
    const { currentUser } = useAuth();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [skillInput, setSkillInput] = useState('');
    const [skills, setSkills] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAddSkill = () => {
        if (skillInput.trim() && !skills.includes(skillInput.trim())) {
            setSkills([...skills, skillInput.trim()]);
            setSkillInput('');
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentUser) {
            setError('You must be logged in to create a post');
            return;
        }

        if (!title.trim() || !content.trim() || !category) {
            setError('Title, content, and category are required');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const newPost = {
                title: title.trim(),
                content: content.trim(),
                category,
                skills: skills.length > 0 ? skills : [],
                authorId: currentUser.uid,
                authorName: currentUser.displayName || currentUser.email
            };

            const postId = await createPost(newPost);

            setTitle('');
            setContent('');
            setCategory('');
            setSkills([]);
            setIsFormOpen(false); // Close form after successful post

            if (onPostCreated) {
                onPostCreated({ id: postId, ...newPost, createdAt: new Date(), likes: [], comments: [] });
            }
        } catch (error) {
            setError('Failed to create post. Please try again.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (!currentUser) {
        return (
            <div className="max-w-2xl mx-auto px-4">
                <Card className="mb-6 shadow-sm">
                    <CardContent>
                        <div className="flex items-center justify-between py-3">
                            <span className="text-gray-600">Want to share your ideas?</span>
                            <Link to="/login">
                                <Button variant="outline" size="sm">
                                    Sign In
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!isFormOpen) {
        return (
            <div className="max-w-2xl mx-auto px-4">
                <Card className="mb-6 shadow-sm">
                    <CardContent>
                        <div className="flex items-center justify-between py-3">
                            <span className="text-gray-600">Share your thoughts with the community</span>
                            <Button onClick={() => setIsFormOpen(true)} variant="default">
                                Create Post
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto px-4">
            <Card className="mb-6 shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
                    <CardTitle className="text-xl font-semibold">Create a New Post</CardTitle>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsFormOpen(false)}
                        className="hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
                    >
                        <X className="h-4 w-4 mr-1" />
                        Cancel
                    </Button>
                </CardHeader>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <Alert variant="destructive" className="mb-6">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        <div className="space-y-3">
                            <Label htmlFor="title" className="text-sm font-medium">Title</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Give your post a title"
                                required
                                className="focus:ring-2"
                            />
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="category" className="text-sm font-medium">Category</Label>
                            <Select value={category} onValueChange={setCategory} required>
                                <SelectTrigger className="focus:ring-2">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Idea">Idea</SelectItem>
                                    <SelectItem value="Project">Project</SelectItem>
                                    <SelectItem value="Skill">Skill</SelectItem>
                                    <SelectItem value="Resource">Resource</SelectItem>
                                    <SelectItem value="Question">Question</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="content" className="text-sm font-medium">Content</Label>
                            <Textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Describe your idea, project, or skill in detail..."
                                rows={5}
                                required
                                className="focus:ring-2 resize-none"
                            />
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="skills" className="text-sm font-medium">Skills (Optional)</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="skills"
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    placeholder="Add relevant skills"
                                    className="flex-1 focus:ring-2"
                                />
                                <Button type="button" onClick={handleAddSkill} variant="outline">
                                    Add
                                </Button>
                            </div>
                            {skills.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {skills.map((skill, index) => (
                                        <div key={index} className="flex items-center bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1.5 rounded-full">
                                            {skill}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveSkill(skill)}
                                                className="ml-1.5 hover:text-blue-900"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="border-t pt-6">
                    <Button
                        onClick={handleSubmit}
                        disabled={loading || !title.trim() || !content.trim() || !category}
                        className="w-full"
                    >
                        {loading ? 'Posting...' : 'Post'}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}