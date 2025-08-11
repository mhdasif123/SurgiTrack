import { createContext, useState, useContext } from 'react';

export const ChatbotContext = createContext();

export const ChatbotProvider = ({ children }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Hospital policies and information that can be used by the chatbot
  const hospitalPolicies = {
    visitingHours: 'General visiting hours are from 9:00 AM to 8:00 PM daily. ICU and special care units may have restricted hours.',
    patientStatus: {
      'Checked In': 'Patient has arrived and completed initial registration.',
      'Pre-Procedure': 'Patient is being prepared for their procedure. This may include changing into a gown, IV placement, and meeting with the anesthesia team.',
      'In-Progress': 'The procedure is currently underway. The medical team is focused on the patient\'s care.',
      'Recovery': 'The procedure is complete, and the patient is in the recovery area being monitored as they wake up from anesthesia.',
      'Complete': 'The patient has completed their procedure and recovery process.'
    },
    commonProcedures: {
      'Knee Arthroscopy': 'A minimally invasive procedure to diagnose and treat knee joint problems.',
      'Gallbladder Removal': 'Surgical removal of the gallbladder, often due to gallstones.',
      'Appendectomy': 'Surgical removal of the appendix, typically due to appendicitis.',
      'Heart Bypass': 'A surgical procedure to improve blood flow to the heart.',
      'Hip Replacement': 'A surgical procedure to replace a damaged hip joint with an artificial joint.'
    },
    faq: {
      'How long will the procedure take?': 'Procedure times vary depending on the specific surgery and individual patient factors. Your surgeon can provide a more accurate estimate.',
      'When can I see my family member?': 'Once the patient is in recovery and stable, visitors are typically allowed. The nursing staff will inform you when you can visit.',
      'What does the status mean?': 'The status indicates where your family member is in their surgical journey. From check-in through completion, each status represents a different stage of care.',
      'How often is the status updated?': 'Our staff updates patient status in real-time as they progress through their procedure.',
      'Can I bring food to the patient?': 'Please check with the nursing staff before bringing food, as dietary restrictions may apply after certain procedures.'
    }
  };

  // Function to add a message to chat history
  const addMessage = (message) => {
    setChatHistory(prev => [...prev, message]);
  };

  // Function to clear chat history
  const clearChatHistory = () => {
    setChatHistory([]);
  };

  // Function to toggle chat open/closed
  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <ChatbotContext.Provider value={{
      chatHistory,
      addMessage,
      clearChatHistory,
      hospitalPolicies,
      isOpen,
      setIsOpen,
      toggleChat
    }}>
      {children}
    </ChatbotContext.Provider>
  );
};

// Custom hook for using the chatbot context
export const useChatbot = () => useContext(ChatbotContext);