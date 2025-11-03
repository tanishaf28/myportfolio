import React, { useState } from 'react';

const Contact: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const to = 'tanisha.fonseca2807@gmail.com';
        const subject = encodeURIComponent(`Website message from ${name || 'Visitor'}`);
        const body = encodeURIComponent(`${message}\n\nFrom: ${name || 'Anonymous'}\nEmail: ${email || 'Not provided'}`);
        const mailto = `mailto:${to}?subject=${subject}&body=${body}`;
        window.location.href = mailto;
    };

    return (
        <section id="contact" className="py-20 bg-gray-100">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Get in Touch</h2>
                <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" id="name" className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                        <textarea value={message} onChange={(e) => setMessage(e.target.value)} id="message" rows={4} className="mt-1 block w-full border border-gray-300 rounded-md p-2" required></textarea>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600 transition duration-200">Send Message</button>
                </form>
            </div>
        </section>
    );
};

export default Contact;