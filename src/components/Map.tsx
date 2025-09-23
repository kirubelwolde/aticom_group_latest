
import React from 'react';
import { MapPin } from 'lucide-react';

const Map = ({ height = "400px", showTokenInput = false }) => {
  return (
    <div className="w-full">
      <div 
        style={{ height }}
        className="w-full rounded-lg shadow-lg border border-gray-200 overflow-hidden"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.6308043427873!2d38.75548731478326!3d9.01917199393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85b1b3b5b5b5%3A0x1b1b1b1b1b1b1b1b!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1635000000000!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="ATICOM Investment Group Office Location"
        ></iframe>
      </div>
    </div>
  );
};

export default Map;
