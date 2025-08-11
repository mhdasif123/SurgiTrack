import { useState, useContext } from 'react';
import { FaComments } from 'react-icons/fa';
import ChatbotDialog from './ChatbotDialog';
import { AuthContext } from '../../contexts/AuthContext';
import { useLocation } from 'react-router-dom';

const ChatbotIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const location = useLocation();
  
  // Don't show on login page or public dashboard
  const isLoginPage = location.pathname === '/';
  const isPublicDashboard = location.pathname === '/waiting-room';
  
  // Only show for guests (no user logged in) on status page or for admin/staff users
  const isGuestStatusPage = location.pathname.startsWith('/status/');
  const shouldShowChatbot = 
    (isGuestStatusPage && !user) || // Guest viewing patient status
    (user && (user.role === 'admin' || user.role === 'surgical')); // Admin or staff user
  
  // Don't show on login page or public dashboard
  if (isLoginPage || isPublicDashboard || !shouldShowChatbot) {
    return null;
  }

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  // Customize tooltip based on user role
  const tooltipText = user && user.role === 'admin' 
    ? "Need help with the system? Ask me anything!" 
    : "Ask me about hospital policies or patient status";

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && <ChatbotDialog onClose={() => setIsOpen(false)} userRole={user?.role} />}
      
      <div className="relative group">
        <div className="absolute bottom-16 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md whitespace-nowrap">
          {tooltipText}
        </div>
        
        <button
          onClick={toggleChat}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 border-2 border-white"
          aria-label="Open hospital assistant chatbot"
        >
          <FaComments className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default ChatbotIcon;