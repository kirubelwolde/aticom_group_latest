import { useCallback } from 'react';

interface UseWhatsAppOptions {
  phoneNumber?: string;
  defaultMessage?: string;
}

export const useWhatsApp = ({ 
  phoneNumber = "+251946141516", 
  defaultMessage = "Hello! I'm interested in learning more about ATICOM Investment Group's services." 
}: UseWhatsAppOptions = {}) => {
  
  const openWhatsApp = useCallback((customMessage?: string) => {
    const message = customMessage || defaultMessage;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  }, [phoneNumber, defaultMessage]);

  const openPhone = useCallback(() => {
    window.open(`tel:${phoneNumber}`, '_blank');
  }, [phoneNumber]);

  const openEmail = useCallback((email = 'sales@aticomgroup.com') => {
    window.open(`mailto:${email}`, '_blank');
  }, []);

  return {
    openWhatsApp,
    openPhone,
    openEmail,
    phoneNumber,
    defaultMessage
  };
}; 