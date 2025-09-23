import React from 'react';

const ContactSpacingGuide: React.FC = () => {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none">
      <div className="flex items-center space-x-8 text-xs text-gray-400 bg-white/80 px-3 py-1 rounded-full shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="font-medium">WhatsApp</span>
        </div>
        <div className="w-px h-4 bg-gray-300"></div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gradient-to-r from-[#5EB447] to-[#417ABD] rounded-full"></div>
          <span className="font-medium">AI Chat</span>
        </div>
      </div>
    </div>
  );
};

export default ContactSpacingGuide; 