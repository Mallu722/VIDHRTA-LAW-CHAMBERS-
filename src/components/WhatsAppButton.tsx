import { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";

const WhatsAppButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const whatsappNumber = "919986010124";
    const message = encodeURIComponent("Hello Vidhrta Law Chambers, I'd like to inquire about legal services.");
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`fixed bottom-8 right-8 z-[100] group flex items-center gap-3 transition-all duration-500 transform ${
                isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-16 opacity-0 scale-50"
            }`}
            aria-label="Chat on WhatsApp"
        >
            {/* Pulsing Background */}
            <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20 group-hover:scale-125 transition-transform duration-500"></div>

            {/* Main Button */}
            <div className="relative bg-[#25D366] text-white p-4 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] transition-all duration-300 group-hover:scale-110 group-active:scale-95 border-2 border-white/10 overflow-hidden">
                <svg
                    viewBox="0 0 24 24"
                    className="w-7 h-7 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.284l-.539 2.016 2.049-.575c1.011.603 1.956.962 3.239.962 3.181 0 5.767-2.587 5.768-5.766 0-3.181-2.587-5.767-5.768-5.767zm3.1 8.874l-.442-.224c-.755-.383-1.071-.462-1.341-.186l-.427.531c-.13.161-.264.183-.526.06-.264-.13-1.117-.412-2.128-1.314-.787-.702-1.317-1.568-1.472-1.832-.155-.264-.016-.407.116-.539.119-.119.264-.308.396-.462.132-.155.176-.264.264-.441.088-.176.044-.33-.022-.464-.066-.134-.582-1.401-.798-1.921-.21-.508-.431-.439-.582-.446-.151-.007-.323-.008-.495-.008-.172 0-.452.065-.688.32-.236.255-.902.881-.902 2.148 0 1.268.923 2.493 1.052 2.669.129.176 1.816 2.774 4.397 3.886.614.264 1.092.422 1.464.539.617.195 1.178.168 1.621.102.495-.074 1.523-.623 1.739-1.229.215-.606.215-1.125.151-1.229zM12.033 4a10.026 10.026 0 0 1 10.02 10.02c.001 2.399-.861 4.708-2.428 6.5l-1.571-5.753.003-.01a7.7 7.7 0 0 0 1.776-4.737c0-4.282-3.484-7.766-7.766-7.766-4.282 0-7.766 3.484-7.766 7.766 0 1.558.468 3.012 1.272 4.225l-1.637 6.115 6.309-1.656A10.032 10.032 0 0 1 12.033 4z" />
                </svg>
            </div>
        </a>
    );
};

export default WhatsAppButton;
