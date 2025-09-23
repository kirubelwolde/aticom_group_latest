import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import Chatbot from '@/components/Chatbot';
import WhatsAppContact from './WhatsAppContact';
import ContactSpacingGuide from './ContactSpacingGuide';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      {/* Global Chatbot available on all pages */}
      <Chatbot />
      {/* Global WhatsApp Contact available on all pages */}
      <WhatsAppContact />
      {/* Contact spacing guide */}
      <ContactSpacingGuide />
    </div>
  );
};

export default Layout;
