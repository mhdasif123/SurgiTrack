import { useState, useContext } from 'react';
import { FaComments } from 'react-icons/fa';
import ChatbotDialog from './ChatbotDialog';
import { AuthContext } from '../../contexts/AuthContext';

const ChatbotIcon = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleChat = () => setIsOpen(prev => !prev);

  const tooltipText = user && user.role === 'admin' 
    ? "Need help with the system? Ask me anything!" 
    : "Ask me about hospital policies or patient status";

  return (
    <div className="fixed bottom-12 right-6 z-50">
      {isOpen && <ChatbotDialog onClose={() => setIsOpen(false)} userRole={user?.role} />}

      <div className="relative">
        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute bottom-16 right-0 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md whitespace-nowrap">
            {tooltipText}
          </div>
        )}

        {/* Icon */}
        <button
          onClick={toggleChat}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
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
