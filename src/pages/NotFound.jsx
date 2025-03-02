import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="text-gray-600 mb-8">Oops! Page not found.</p>
            <Button
                onClick={() => navigate('/')}
                className="bg-blue-600 hover:bg-blue-700"
            >
                Return to Home
            </Button>
        </div>
    );
} 