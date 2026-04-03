import { useState, useEffect } from "react";

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
            className={`fixed bottom-20 right-6 z-[90] group transition-all duration-500 transform ${
                isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-16 opacity-0 scale-50"
            }`}
            aria-label="Chat on WhatsApp"
            title="Chat with us on WhatsApp"
        >
            {/* Pulsing ring */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 pointer-events-none" />

            {/* Main Button */}
            <span className="relative flex items-center justify-center bg-[#25D366] text-white p-3 rounded-full shadow-[0_6px_20px_rgba(37,211,102,0.45)] transition-all duration-300 group-hover:scale-110 group-active:scale-95 border border-white/20">
                {/* Official WhatsApp logo SVG */}
                <svg
                    viewBox="0 0 32 32"
                    className="w-5 h-5 fill-white"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path d="M16.003 2C8.28 2 2 8.28 2 16.003c0 2.47.648 4.786 1.777 6.795L2 30l7.395-1.742A13.94 13.94 0 0 0 16.003 30C23.72 30 30 23.72 30 16.003 30 8.28 23.72 2 16.003 2zm0 25.452a11.6 11.6 0 0 1-5.911-1.613l-.424-.252-4.39 1.034 1.062-4.282-.276-.44A11.6 11.6 0 0 1 4.4 16.003c0-6.398 5.206-11.603 11.603-11.603 6.398 0 11.603 5.205 11.603 11.603 0 6.397-5.205 11.449-11.603 11.449zm6.37-8.668c-.35-.174-2.07-1.02-2.39-1.137-.322-.116-.556-.174-.79.174-.233.348-.903 1.137-1.107 1.37-.203.232-.407.261-.756.087-.35-.174-1.475-.544-2.81-1.732-1.038-.926-1.739-2.07-1.942-2.42-.204-.349-.022-.537.153-.71.157-.155.35-.406.524-.609.174-.204.232-.35.349-.582.116-.232.058-.436-.03-.61-.087-.174-.79-1.9-1.08-2.601-.285-.685-.575-.593-.79-.604l-.672-.012c-.233 0-.61.087-.93.436-.32.348-1.22 1.194-1.22 2.912 0 1.718 1.25 3.378 1.424 3.61.174.232 2.461 3.76 5.964 5.27.834.36 1.485.575 1.992.737.837.267 1.6.23 2.202.14.671-.1 2.07-.847 2.361-1.664.29-.816.29-1.516.203-1.663-.086-.146-.32-.232-.67-.407z" />
                </svg>
            </span>
        </a>
    );
};

export default WhatsAppButton;
