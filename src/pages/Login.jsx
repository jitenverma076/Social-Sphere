import LoginForm from '../components/auth/LoginForm';

export default function Login() {
    return (
        <div className="max-w-md mx-auto py-8">
            <h1 className="text-3xl font-bold text-center mb-6">Login to Social Sphere</h1>
            <LoginForm />
        </div>
    );
}