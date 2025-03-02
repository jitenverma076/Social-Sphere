import { format } from 'date-fns';

export default function CommentList({ comments }) {
    if (!comments || comments.length === 0) {
        return (
            <div className="text-center py-6 text-gray-500">
                No comments yet. Be the first to comment!
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {comments.map((comment, index) => {
                const formattedDate = comment.createdAt ?
                    format(new Date(comment.createdAt.toDate ? comment.createdAt.toDate() : comment.createdAt), 'MMM d, yyyy h:mm a') :
                    'Just now';

                return (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between">
                            <p className="font-medium">{comment.authorName}</p>
                            <p className="text-sm text-gray-500">{formattedDate}</p>
                        </div>
                        <p className="mt-2 text-gray-700">{comment.content}</p>
                    </div>
                );
            })}
        </div>
    );
}