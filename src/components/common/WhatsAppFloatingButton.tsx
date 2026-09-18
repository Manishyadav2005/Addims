import React from 'react';

export const WhatsAppFloatingButton: React.FC = () => {
  const phone = '919250710533';
  const defaultMessage = 'Hi ADDIMS team, I would like to discuss a project.';
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-4 right-4 z-50 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-[0_4px_16px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_22px_rgba(37,211,102,0.55)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
    >
      {/* WhatsApp Official Vector Icon */}
      <svg
        className="w-6 h-6 sm:w-6.5 sm:h-6.5 fill-current"
        viewBox="0 0 24 24"
      >
        <path d="M12.031 2C6.494 2 2 6.494 2 12.031c0 1.969.569 3.818 1.555 5.378L2.094 22l4.757-1.428a9.98 9.98 0 0 0 5.18 1.459h.004c5.534 0 10.028-4.495 10.028-10.032C22.063 6.494 17.568 2 12.031 2zm0 18.363a8.314 8.314 0 0 1-4.241-1.157l-.304-.18-3.15.945.949-3.07-.197-.314a8.307 8.307 0 0 1-1.272-4.556c0-4.604 3.743-8.347 8.348-8.347 2.23 0 4.327.87 5.903 2.447a8.308 8.308 0 0 1 2.443 5.9c0 4.605-3.744 8.348-8.349 8.348zm4.573-6.242c-.251-.125-1.484-.732-1.714-.816-.23-.083-.397-.125-.564.125-.167.251-.648.816-.794.983-.146.167-.293.188-.544.063-.251-.126-1.06-.391-2.019-1.246-.746-.666-1.25-1.488-1.396-1.739-.146-.251-.016-.387.11-.512.113-.113.251-.293.377-.44.125-.146.167-.251.251-.418.083-.167.042-.314-.021-.44-.063-.125-.564-1.36-.773-1.863-.204-.49-.411-.424-.564-.432-.146-.008-.314-.01-.481-.01-.167 0-.44.063-.67.314-.23.251-.878.858-.878 2.093 0 1.235.9 2.428 1.025 2.595.126.167 1.77 2.703 4.288 3.791.6.259 1.069.414 1.435.53.603.192 1.152.165 1.586.1.484-.072 1.484-.607 1.693-1.192.209-.586.209-1.088.146-1.193-.063-.104-.23-.167-.481-.292z" />
      </svg>
    </a>
  );
};
