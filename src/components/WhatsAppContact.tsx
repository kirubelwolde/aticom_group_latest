import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X, Phone, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useWhatsApp } from '@/hooks/useWhatsApp';

interface WhatsAppContactProps {
  phoneNumber?: string;
  message?: string;
}

const WhatsAppContact: React.FC<WhatsAppContactProps> = ({ 
  phoneNumber = "+251946141516",
  message = "Hello! I'm interested in learning more about ATICOM Investment Group's services."
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { openWhatsApp, openPhone, openEmail } = useWhatsApp({ phoneNumber, defaultMessage: message });

  const handleWhatsAppClick = () => {
    openWhatsApp();
  };

  const handlePhoneClick = () => {
    openPhone();
  };

  const handleEmailClick = () => {
    openEmail();
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <div className="floating-whatsapp">
        <div className="flex flex-col items-center space-y-2">
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-green-500 hover:bg-green-600 text-white rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
            size="icon"
          >
            {isExpanded ? (
              <X className="w-6 h-6" />
            ) : (
              <MessageCircle className="w-6 h-6" />
            )}
          </Button>
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
            <span className="text-xs font-medium text-gray-700">WhatsApp</span>
          </div>
        </div>
      </div>

      {/* Expanded Contact Options */}
      {isExpanded && (
        <div className="fixed bottom-32 left-6 z-50 animate-in slide-in-from-bottom-2 duration-300" style={{ maxHeight: 'calc(100vh - 120px)' }}>
          <Card className="w-80 shadow-xl border-0 bg-white max-h-[calc(100vh-120px)] overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-center text-gray-800">
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* WhatsApp Option */}
              <Button
                onClick={handleWhatsAppClick}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 h-auto"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat on WhatsApp
              </Button>

              {/* Phone Option */}
              <Button
                onClick={handlePhoneClick}
                variant="outline"
                className="w-full py-3 h-auto border-gray-300 hover:border-green-500 hover:bg-green-50"
              >
                <Phone className="w-5 h-5 mr-2 text-green-500" />
                Call {phoneNumber}
              </Button>

              {/* Email Option */}
              <Button
                onClick={handleEmailClick}
                variant="outline"
                className="w-full py-3 h-auto border-gray-300 hover:border-blue-500 hover:bg-blue-50"
              >
                <Mail className="w-5 h-5 mr-2 text-blue-500" />
                Send Email
              </Button>

              {/* Quick Message */}
              <div className="text-center pt-2">
                <p className="text-sm text-gray-600">
                  Quick response guaranteed!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default WhatsAppContact; 