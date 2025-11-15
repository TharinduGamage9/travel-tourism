"use client";

import Image from "next/image";
import { useState } from "react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: "", message: "" });

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitStatus({
                    type: 'success',
                    message: "Thank you for your message! We'll get back to you soon.",
                });
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    subject: "",
                    message: "",
                });
            } else {
                setSubmitStatus({
                    type: 'error',
                    message: data.error || 'Failed to send message. Please try again.',
                });
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus({
                type: 'error',
                message: 'An error occurred. Please try again later.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen pt-[100px] pb-16">
            {/* Hero Section */}
            <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden mb-12">
                <div className="absolute inset-0">
                    <Image
                        src="/images/galle.jpg"
                        alt="Contact Us"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>
                <div className="relative z-10 flex items-center justify-center h-full px-4">
                    <div className="text-center text-white">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 unbounded-font">
                            Contact Us
                        </h1>
                        <p className="text-lg md:text-xl text-gray-200">
                            Get in touch with us for your travel needs
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Form and Info Section */}
            <section className="px-4 sm:px-8 lg:px-[10%] mb-16">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Contact Form */}
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <h2 className="text-2xl font-semibold text-[#193555] mb-6 unbounded-font">
                                Send us a Message
                            </h2>
                            
                            {/* Status Messages */}
                            {submitStatus.message && (
                                <div
                                    className={`p-4 rounded-lg mb-6 ${
                                        submitStatus.type === 'success'
                                            ? 'bg-green-50 text-green-800 border border-green-200'
                                            : 'bg-red-50 text-red-800 border border-red-200'
                                    }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <i
                                            className={`${
                                                submitStatus.type === 'success'
                                                    ? 'ri-checkbox-circle-fill'
                                                    : 'ri-error-warning-fill'
                                            } text-xl`}
                                        ></i>
                                        <p className="text-sm font-medium">{submitStatus.message}</p>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-[#193555] mb-2"
                                    >
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#193555] focus:border-transparent"
                                        placeholder="Enter your name"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-[#193555] mb-2"
                                    >
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#193555] focus:border-transparent"
                                        placeholder="Enter your email"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="block text-sm font-medium text-[#193555] mb-2"
                                    >
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#193555] focus:border-transparent"
                                        placeholder="Enter your phone number"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="subject"
                                        className="block text-sm font-medium text-[#193555] mb-2"
                                    >
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#193555] focus:border-transparent"
                                        placeholder="Enter subject"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block text-sm font-medium text-[#193555] mb-2"
                                    >
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="5"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#193555] focus:border-transparent resize-none"
                                        placeholder="Enter your message"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full bg-[#193555] hover:bg-[#1a3f66] text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <i className="ri-loader-4-line animate-spin"></i>
                                            Sending...
                                        </span>
                                    ) : (
                                        'Send Message'
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-6">
                            {/* Contact Details Card */}
                            <div className="bg-white rounded-lg shadow-lg p-8">
                                <h2 className="text-2xl font-semibold text-[#193555] mb-6 unbounded-font">
                                    Get in Touch
                                </h2>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-[#193555] w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                                            <i className="ri-map-pin-fill text-white text-xl"></i>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-[#193555] mb-1">Address</h3>
                                            <p className="text-[#697e8a] text-sm leading-relaxed">
                                                74.BaduluPitiya,<br />
                                                Uva,Badulla<br />
                                                Sri Lanka
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="bg-[#193555] w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                                            <i className="ri-phone-fill text-white text-xl"></i>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-[#193555] mb-1">Phone</h3>
                                            <a
                                                href="tel:0787962180"
                                                className="text-[#697e8a] hover:text-[#193555] transition-colors text-sm"
                                            >
                                                0787962180
                                            </a>
                                            <br />
                                            <a
                                                href="tel:0787962180"
                                                className="text-[#697e8a] hover:text-[#193555] transition-colors text-sm"
                                            >

                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="bg-[#193555] w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                                            <i className="ri-mail-fill text-white text-xl"></i>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-[#193555] mb-1">Email</h3>
                                            <a
                                                href="mailto:Ceylonetravels@gmail.com"
                                                className="text-[#697e8a] hover:text-[#193555] transition-colors text-sm"
                                            >
                                                Ceylonetravels@gmail.com
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="bg-[#193555] w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                                            <i className="ri-time-line text-white text-xl"></i>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-[#193555] mb-1">Business Hours</h3>
                                            <p className="text-[#697e8a] text-sm">
                                                Monday - Saturday: 8:00 AM - 5:00 PM<br />
                                                Sunday: Closed
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* WhatsApp Contact Card */}
                            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-8 text-white">
                                <h3 className="text-2xl font-semibold mb-4 unbounded-font">
                                    Quick Contact via WhatsApp
                                </h3>
                                <p className="mb-6 text-green-100">
                                    Feel free to ask anything without hesitation. We're here to help!
                                </p>
                                <a
                                    href="https://wa.me/94787962180"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                                >
                                    <i className="ri-whatsapp-fill text-2xl"></i>
                                    Message on WhatsApp
                                </a>
                            </div>

                            {/* Social Media */}
                            <div className="bg-white rounded-lg shadow-lg p-8">
                                <h3 className="text-xl font-semibold text-[#193555] mb-4 unbounded-font">
                                    Follow Us
                                </h3>
                                <div className="flex gap-4">
                                    <a
                                        href="#"
                                        className="w-12 h-12 bg-[#193555] hover:bg-[#1a3f66] rounded-full flex items-center justify-center transition-colors text-white"
                                        aria-label="Facebook"
                                    >
                                        <i className="ri-facebook-fill text-xl"></i>
                                    </a>
                                    <a
                                        href="#"
                                        className="w-12 h-12 bg-[#193555] hover:bg-[#1a3f66] rounded-full flex items-center justify-center transition-colors text-white"
                                        aria-label="Twitter"
                                    >
                                        <i className="ri-twitter-x-fill text-xl"></i>
                                    </a>
                                    <a
                                        href="#"
                                        className="w-12 h-12 bg-[#193555] hover:bg-[#1a3f66] rounded-full flex items-center justify-center transition-colors text-white"
                                        aria-label="Instagram"
                                    >
                                        <i className="ri-instagram-fill text-xl"></i>
                                    </a>
                                    <a
                                        href="#"
                                        className="w-12 h-12 bg-[#193555] hover:bg-[#1a3f66] rounded-full flex items-center justify-center transition-colors text-white"
                                        aria-label="Flickr"
                                    >
                                        <i className="ri-flickr-fill text-xl"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Google Maps Section */}
            <section className="px-4 sm:px-8 lg:px-[10%] mb-16">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-2xl font-semibold text-[#193555] mb-6 unbounded-font">
                            Find Us
                        </h2>
                        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.1234567890123!2d81.0556!3d6.9934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTknMzYuMiJOIDgxwrAwMycyMC4xIkU!5e0!3m2!1sen!2slk!4v1234567890123!5m2!1sen!2slk"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full h-full"
                                title="Ceylon Travels Location"
                            ></iframe>
                        </div>
                        <div className="mt-4 text-center">
                            <p className="text-[#697e8a] text-sm">
                                74.BaduluPitiya, Uva, Badulla, Sri Lanka
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

