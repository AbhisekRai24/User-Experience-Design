import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import logo from '../asset/logo2.png';


export default function Footer() {
    return (
        <footer className="w-full bg-black text-white mt-16">
            <div className="px-[120px] py-12">
                <div className="grid grid-cols-[2fr_1fr_1fr] gap-16 mb-8">
                    {/* Brand Section */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#57C478] to-[#4BA3F2] flex items-center justify-center">
                                <img src={logo} alt="Logo" className="w-8 h-8" />
                            </div>
                            <span className="font-semibold text-[20px]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Local Space
                            </span>
                        </div>
                        <p className="text-[14px] text-white/70 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Connecting communities through meaningful events and experiences.
                        </p>

                        {/* Social Media */}
                        <div className="mt-6">
                            <h3 className="font-semibold text-[16px] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Follow Us
                            </h3>
                            <div className="flex items-center gap-3">
                                <a
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#57C478] flex items-center justify-center transition-colors"
                                >
                                    <img src="/fb.png" alt="Facebook" className="w-5 h-5" />
                                </a>

                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#57C478] flex items-center justify-center transition-colors"
                                >
                                    <img src="/ig.png" alt="Instagram" className="w-5 h-5" />
                                </a>


                            </div>

                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-semibold text-[16px] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Contact Us
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                                <Mail className="w-4 h-4 text-white/70 mt-0.5 flex-shrink-0" />
                                <span className="text-[14px] text-white/70" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    hello_localspace@gmail.com
                                </span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-white/70 flex-shrink-0" />
                                <span className="text-[14px] text-white/70" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    977-9873635278
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 text-white/70 mt-0.5 flex-shrink-0" />
                                <span className="text-[14px] text-white/70" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    Lalitpur, Nepal
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-[16px] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/about" className="text-[14px] text-white/70 hover:text-[#57C478] transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/help" className="text-[14px] text-white/70 hover:text-[#57C478] transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    Help & Support
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10">
                    <p className="text-[14px] text-white/50 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        © 2025 Local Space. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}