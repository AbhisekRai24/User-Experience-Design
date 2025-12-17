import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full bg-black text-white mt-16">
            <div className="px-[120px] py-12">
                <div className="grid grid-cols-3 gap-32 mb-8">
                    {/* Brand Section */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#57C478] to-[#4BA3F2] flex items-center justify-center">
                                <div className="w-8 h-8 rounded-full bg-white/20"></div>
                            </div>
                            <span className="font-semibold text-[20px]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Local Space
                            </span>
                        </div>
                        <p className="text-[14px] text-white/70 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Connecting communities through meaningful events and experiences.
                        </p>
                    </div>

                    {/* Quick Links */}
                    {/* <div>
                        <h3 className="font-semibold text-[16px] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-[14px] text-white/70 hover:text-[#57C478] transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-[14px] text-white/70 hover:text-[#57C478] transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    Events
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-[14px] text-white/70 hover:text-[#57C478] transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    Event History
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-[14px] text-white/70 hover:text-[#57C478] transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    About Us
                                </a>
                            </li>
                        </ul>
                    </div> */}



                    {/* Social Media */}
                    <div>
                        <h3 className="font-semibold text-[16px] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Follow Us
                        </h3>
                        <div className="flex items-center gap-3">
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#57C478] flex items-center justify-center transition-colors"
                            >
                                <Facebook className="w-5 h-5 text-white" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#57C478] flex items-center justify-center transition-colors"
                            >
                                <Instagram className="w-5 h-5 text-white" />
                            </a>
                            {/* <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#57C478] flex items-center justify-center transition-colors"
                            >
                                <Twitter className="w-5 h-5 text-white" />
                            </a> */}
                        </div>
                    </div>
                    {/* Contact Info */}
                    <div>
                        <h3 className="font-semibold text-[16px] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Contact Us
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-white/70" />
                                <span className="text-[14px] text-white/70" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    hello_localspace@gmail.com
                                </span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-white/70" />
                                <span className="text-[14px] text-white/70" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    977-9873635278
                                </span>
                            </li>
                            <li className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-white/70" />
                                <span className="text-[14px] text-white/70" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    Lalitpur, Nepal
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                    <p className="text-[14px] text-white/50" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        © 2025 Local Space. All rights reserved.
                    </p>
                    {/* <div className="flex items-center gap-6">
                        <a href="#" className="text-[14px] text-white/50 hover:text-white transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Privacy Policy
                        </a>
                        <a href="#" className="text-[14px] text-white/50 hover:text-white transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Terms of Service
                        </a>
                    </div> */}
                </div>
            </div>
        </footer>
    );
}