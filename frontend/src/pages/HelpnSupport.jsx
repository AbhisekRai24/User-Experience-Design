import { Search, Mail, MessageCircle, Phone, Calendar, UserCheck, CreditCard, Settings, ChevronDown } from "lucide-react";
import { useState } from "react";

const HelpPage = () => {
    const [openFaq, setOpenFaq] = useState(0);

    const faqs = [
        {
            question: "How do I register for an event?",
            answer: "Click on any event card and select 'View Details' button. In the event details modal, click 'Join Event' button and fill out the registration form with your name, email, phone number, and number of attendees."
        },
        {
            question: "Can I cancel my event registration?",
            answer: "Yes, you can cancel your registration by going to 'Event History' in the navigation menu. Find the event you want to cancel and click the delete icon. Your registration will be removed immediately."
        },
        {
            question: "How do I view my registered events?",
            answer: "Click on 'Event History' in the top navigation bar to see all events you've joined. You can view event details, registration information, and manage your registrations from there."
        },
        {
            question: "How do I receive event notifications?",
            answer: "Go to Settings from the navigation menu and enable 'Event Reminders'. You'll receive notifications 24 hours before events you've joined. Admin update notifications are always enabled to keep you informed of important changes."
        },
        {
            question: "How do I search for specific events?",
            answer: "Use the search bar at the top of the dashboard or events page. You can search by event title, location, or category to find events that match your interests."
        },
        {
            question: "What if I need to change my registration details?",
            answer: "Currently, to modify registration details, you'll need to cancel your existing registration from Event History and register again with the updated information."
        },
        {
            question: "How do I know if my registration was successful?",
            answer: "After submitting the registration form, you'll see a success notification at the top of the screen confirming your registration."
        },
        {
            question: "Can I register multiple people for one event?",
            answer: "Yes! When filling out the registration form, you can specify the number of attendees you're registering for the event."
        }
    ];

    const helpCategories = [
        {
            icon: Calendar,
            title: "Event Registration",
            description: "Learn how to browse and register for community events",
            color: "#57C478"
        },
        {
            icon: UserCheck,
            title: "Account Management",
            description: "Manage your profile and event history",
            color: "#4BA3F2"
        },
        {
            icon: CreditCard,
            title: "Donations",
            description: "Information about optional event donations",
            color: "#1AA928"
        },
        // {
        //     icon: Settings,
        //     title: "Technical Support",
        //     description: "Troubleshooting and technical assistance",
        //     color: "#6B6B6B"
        // }
    ];

    return (
        <div className="min-h-screen bg-base-200 py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-gray-800 mb-4">
                        Help & Support Center
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Find answers to your questions and get the help you need
                    </p>


                </div>

                {/* Help Categories */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">
                        Browse by Category
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {helpCategories.map((category, index) => {
                            const Icon = category.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-[#4BA3F2] hover:shadow-lg transition-all cursor-pointer group"
                                >
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                                        style={{ backgroundColor: `${category.color}20` }}
                                    >
                                        <Icon className="w-6 h-6" style={{ color: category.color }} />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                        {category.title}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {category.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                                >
                                    <h3 className="text-base font-medium text-gray-800 pr-4">
                                        {faq.question}
                                    </h3>
                                    <ChevronDown
                                        className={`w-5 h-5 text-gray-600 transition-transform flex-shrink-0 ${openFaq === index ? 'rotate-180' : ''
                                            }`}
                                    />
                                </button>
                                {openFaq === index && (
                                    <div className="px-6 pb-5 pt-0">
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Support Section */}
                <div className="bg-gradient-to-br from-[#57C478] to-[#4BA3F2] rounded-2xl p-8 text-white">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold mb-3">
                            Still Need Help?
                        </h2>
                        <p className="text-lg text-white/90">
                            Our support team is here to assist you
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Email Support */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-colors">
                            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                                <Mail className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">
                                Email Support
                            </h3>
                            <p className="text-sm text-white/80 mb-3">
                                Get help via email
                            </p>
                            <a
                                href="mailto:hello_localspace@gmail.com"
                                className="text-sm font-medium hover:underline"
                            >
                                hello_localspace@gmail.com
                            </a>
                        </div>

                        {/* Live Chat */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-colors">
                            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                                <MessageCircle className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">
                                Live Chat
                            </h3>
                            <p className="text-sm text-white/80 mb-3">
                                Chat with our team
                            </p>
                            <button className="text-sm font-medium hover:underline">
                                977-9849816321
                            </button>
                        </div>

                        {/* Phone Support */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-colors">
                            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                                <Phone className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">
                                Phone Support
                            </h3>
                            <p className="text-sm text-white/80 mb-3">
                                Mon-Fri, 9AM-6PM
                            </p>
                            <a
                                href="tel:+9779873635278"
                                className="text-sm font-medium hover:underline"
                            >
                                977-9873635278
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpPage;