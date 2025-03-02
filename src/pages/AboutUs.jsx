export default function AboutUs() {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">About Social Sphere</h1>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                <p className="text-gray-700 mb-4">
                    Social Sphere is a community collaboration platform designed to connect people with ideas, skills, and resources.
                    We believe that great things happen when people come together to share knowledge and collaborate on projects.
                </p>
                <p className="text-gray-700">
                    Our mission is to create a space where individuals can easily find collaborators, share expertise,
                    and bring ideas to life through meaningful connections and community support.
                </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-xl font-medium mb-2">Idea Sharing</h3>
                        <p className="text-gray-700">
                            Share your innovative ideas and get feedback from the community. Find collaborators who can help turn your vision into reality.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-medium mb-2">Skill Exchange</h3>
                        <p className="text-gray-700">
                            Offer your skills or find people with the expertise you need. Our platform makes it easy to connect with talented individuals.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-medium mb-2">Resource Sharing</h3>
                        <p className="text-gray-700">
                            Share useful resources, tools, and learning materials with the community. Access resources shared by others to enhance your projects.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-medium mb-2">Community Support</h3>
                        <p className="text-gray-700">
                            Ask questions, provide answers, and engage in meaningful discussions. Our supportive community is here to help you succeed.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
                <ul className="space-y-4">
                    <li className="flex">
                        <div className="mr-4 text-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-medium">Collaboration</h3>
                            <p className="text-gray-700">We believe in the power of working together to achieve greater outcomes than what can be accomplished alone.</p>
                        </div>
                    </li>
                    <li className="flex">
                        <div className="mr-4 text-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-medium">Inclusivity</h3>
                            <p className="text-gray-700">We welcome people from all backgrounds and skill levels, creating a diverse and supportive environment.</p>
                        </div>
                    </li>
                    <li className="flex">
                        <div className="mr-4 text-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-medium">Innovation</h3>
                            <p className="text-gray-700">We encourage creative thinking and new approaches to problem-solving through community collaboration.</p>
                        </div>
                    </li>
                    <li className="flex">
                        <div className="mr-4 text-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-medium">Knowledge Sharing</h3>
                            <p className="text-gray-700">We value the open exchange of ideas, skills, and resources that helps everyone grow and learn.</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}