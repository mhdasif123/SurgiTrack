import { useState, useRef, useEffect, useContext } from 'react';
import { FaTimes, FaPaperPlane, FaSpinner } from 'react-icons/fa';
import { getGeminiResponse, simulateGeminiResponse } from '../../services/GeminiService';
import { ChatbotContext } from '../../contexts/ChatbotContext';

const ChatbotDialog = ({ onClose, userRole }) => {
  const { hospitalPolicies, addMessage: addMessageToHistory } = useContext(ChatbotContext);
  // Set initial welcome message based on user role
  const getWelcomeMessage = () => {
    if (userRole === 'admin') {
      return 'Hello admin! I can help you with system features, patient management, and hospital operations. What would you like to know?';
    } else if (userRole === 'surgical') {
      return 'Hello healthcare professional! I can assist with patient workflows, procedures information, and system operations. How can I help you today?';
    } else {
      return 'Hello! I\'m your hospital assistant. How can I help you with patient status or visiting information?';
    }
  };

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: getWelcomeMessage()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    await sendMessage(input);
  };
  
  const sendMessage = async (messageText) => {
    // Add user message to chat
    const userMessage = { role: 'user', content: messageText };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Convert messages to the format expected by the API
      const messageHistory = updatedMessages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Get response from Gemini API
      const response = await getGeminiResponse(messageText, messageHistory, hospitalPolicies);
      
      // Add bot response to chat
      const botMessage = { role: 'assistant', content: response };
      setMessages([...updatedMessages, botMessage]);
      
      // Add both messages to context history
      addMessageToHistory(userMessage);
      addMessageToHistory(botMessage);
    } catch (error) {
      console.error('Error getting Gemini response:', error);
      
      // Fallback to simulated response
      const fallbackResponse = simulateGeminiResponse(messageText, hospitalPolicies);
      const fallbackMessage = { role: 'assistant', content: fallbackResponse };
      setMessages([...updatedMessages, fallbackMessage]);
      
      // Add both messages to context history
      addMessageToHistory(userMessage);
      addMessageToHistory(fallbackMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Quick question buttons based on user role
  const getQuickQuestions = () => {
    // Default questions for guests
    const guestQuestions = [
      'What are the visiting hours?',
      'What does In-Progress status mean?',
      'When can I see my family member?',
      'How long will recovery take?'
    ];
    
    // Admin-specific questions
    const adminQuestions = [
      'How do I add a new patient?',
      'How do I update patient status?',
      'How do I search for a patient?',
      'System features overview'
    ];
    
    // Staff-specific questions
    const staffQuestions = [
      'Patient status workflow',
      'Common procedures info',
      'Update patient status',
      'Search patient records'
    ];
    
    if (userRole === 'admin') {
      return adminQuestions;
    } else if (userRole === 'surgical') {
      return staffQuestions;
    } else {
      return guestQuestions;
    }
  };



  return (
    <div className="fixed bottom-20 right-6 w-80 md:w-96 bg-white rounded-lg shadow-xl overflow-hidden z-50 flex flex-col max-h-[500px]">
      {/* Header */}
      <div className="bg-blue-500 text-white px-4 py-3 flex justify-between items-center">
        <h3 className="font-semibold">Hospital Assistant</h3>
        <button 
          onClick={onClose}
          className="text-white hover:text-gray-200 transition-colors"
          aria-label="Close chat"
        >
          <FaTimes />
        </button>
      </div>
      
      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50" style={{ maxHeight: '350px' }}>
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`mb-3 ${msg.role === 'user' ? 'text-right' : ''}`}
          >
            <div 
              className={`inline-block px-4 py-2 rounded-lg ${msg.role === 'user' 
                ? 'bg-blue-500 text-white rounded-br-none' 
                : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-center items-center my-2">
            <FaSpinner className="animate-spin text-blue-500" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Quick Questions */}
      <div className="border-t border-gray-200 p-3">
        <p className="text-xs text-gray-500 mb-2 text-center">Quick Questions:</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {getQuickQuestions().map((question, index) => (
            <button
              key={index}
              onClick={() => sendMessage(question)}
              disabled={isLoading}
              className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm hover:bg-blue-200 transition-colors shadow-sm flex items-center"
            >
              <span className="mr-1">•</span> {question}
            </button>
          ))}
        </div>
      </div>
      
      {/* Input */}
      <form onSubmit={handleSubmit} className="border-t border-gray-200 p-3 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question here..."
          className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600 transition-colors"
          disabled={isLoading}
        >
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default ChatbotDialog;