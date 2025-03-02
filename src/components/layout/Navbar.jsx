import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { useAuth } from '../../context/AuthContext';
import { logoutUser } from '../../services/auth';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';

export default function Navbar() {
    const { currentUser } = useAuth();
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchUserName = async () => {
            if (currentUser?.uid) {
                try {
                    // Try to get user data from Firestore
                    const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        // Get first name from displayName
                        const firstName = userData.displayName?.split(' ')[0] || userData.displayName;
                        setUserName(firstName);
                    } else if (currentUser.displayName) {
                        // Fallback to auth displayName if Firestore doc doesn't exist
                        const firstName = currentUser.displayName.split(' ')[0];
                        setUserName(firstName);
                    } else {
                        // Last fallback: use email without domain
                        const emailName = currentUser.email.split('@')[0];
                        setUserName(emailName);
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    // Fallback to email without domain if there's an error
                    const emailName = currentUser.email.split('@')[0];
                    setUserName(emailName);
                }
            }
        };

        fetchUserName();
    }, [currentUser]);

    const handleLogout = async () => {
        try {
            await logoutUser();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <nav className="bg-white border-b border-gray-200 px-6 py-3">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-blue-600">
                    Social Sphere
                </Link>

                <div className="flex-1 flex justify-center items-center space-x-8">
                    <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
                        Home
                    </Link>
                    <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">
                        About
                    </Link>
                    <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium">
                        Contact
                    </Link>
                </div>

                <div className="flex items-center">
                    {currentUser ? (
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-700">
                                Hi, {userName || 'User'}
                            </span>
                            <Button onClick={handleLogout} variant="outline">
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <Link to="/login">
                            <Button variant="default">Account</Button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}