import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { submitContactForm } from '../services/contact';

export default function ContactUs() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!name.trim() || !email.trim() || !message.trim()) {
            setError('All fields are required');
            return;
        }

        try {
            setIsSubmitting(true);
            setError('');

            await submitContactForm({
                name: name.trim(),
                email: email.trim(),
                message: message.trim()
            });

            setSubmitted(true);
            setName('');
            setEmail('');
            setMessage('');
        } catch (error) {
            console.error('Contact form submission error:', error);
            // Display the specific error message from the service
            setError(error.message || 'Failed to send message. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Contact Us</h1>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
                    <p className="text-gray-600 mb-8">
                        Have questions, suggestions, or feedback? We'd love to hear from you! Fill out the form and our team will get back to you as soon as possible.
                    </p>

                    <div className="space-y-6">
                        <Card className="border-0 shadow-none">
                            <CardContent className="p-0">
                                <div className="flex items-start space-x-4">
                                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                            <polyline points="22,6 12,13 2,6"></polyline>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">Email</h3>
                                        <p className="text-gray-600">jitenverma076@gmail.com</p>
                                        <p className="text-gray-500 text-sm mt-1">We'll respond within 24 hours</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-none">
                            <CardContent className="p-0">
                                <div className="flex items-start space-x-4">
                                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                            <circle cx="12" cy="10" r="3"></circle>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">Address</h3>
                                        <p className="text-gray-600">India</p>
                                        <p className="text-gray-500 text-sm mt-1">Available for remote collaboration</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-none">
                            <CardContent className="p-0">
                                <div className="flex items-start space-x-4">
                                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">Phone</h3>
                                        <p className="text-gray-600">+91 XXX-XXX-XXXX</p>
                                        <p className="text-gray-500 text-sm mt-1">Available Mon-Fri, 9AM-6PM IST</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div>
                    <Card className="shadow-md">
                        <CardHeader>
                            <CardTitle>Send a Message</CardTitle>
                            <CardDescription>
                                Fill out the form below to get in touch with our team
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {submitted ? (
                                <Alert className="bg-green-50 border-green-200">
                                    <AlertDescription className="text-green-700">
                                        Thank you for your message! We'll get back to you soon.
                                    </AlertDescription>
                                </Alert>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {error && (
                                        <Alert variant="destructive">
                                            <AlertDescription>{error}</AlertDescription>
                                        </Alert>
                                    )}
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-sm font-medium">Name</Label>
                                        <Input
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Your name"
                                            className="focus:ring-2"
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Your email address"
                                            className="focus:ring-2"
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="message" className="text-sm font-medium">Message</Label>
                                        <Textarea
                                            id="message"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder="Your message"
                                            rows={5}
                                            className="focus:ring-2 resize-none"
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </form>
                            )}
                        </CardContent>
                        {!submitted && (
                            <CardFooter className="border-t pt-6">
                                <Button
                                    onClick={handleSubmit}
                                    className="w-full"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </Button>
                            </CardFooter>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
}