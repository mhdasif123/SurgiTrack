// Service to handle Gemini Pro API integration

// Gemini Pro API key
const API_KEY = 'AIzaSyD1wo0F7X9juQHrfZqvC5cChlU96chVqgI';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

/**
 * Sends a request to the Gemini Pro API
 * @param {string} query - The user's message
 * @param {Array} history - Previous conversation history
 * @param {Object} hospitalPolicies - Additional context like hospital policies
 * @returns {Promise<string>} - The AI response
 */
export const getGeminiResponse = async (query, history = [], hospitalPolicies = {}) => {
  try {
    // Create system prompt with instructions and context
    const systemPrompt = `You are a helpful hospital assistant chatbot. Answer questions about hospital policies and patient status.
    
    Important instructions:
    1. Keep your responses very simple and concise
    2. Don't repeat information unnecessarily
    3. Be honest - if you don't know something, say so
    4. Don't use complex medical terminology
    5. Direct users to medical staff for specific medical questions
    
    Hospital policies: ${JSON.stringify(hospitalPolicies)}`;
    
    // Format the conversation for the API
    const contents = [
      {
        role: 'system',
        parts: [{ text: systemPrompt }]
      }
    ];
    
    // Add conversation history (limited to last 10 messages to avoid token limits)
    const recentHistory = history.slice(-10);
    recentHistory.forEach(msg => {
      contents.push({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      });
    });
    
    // If the last message in history isn't the current query, add it
    if (recentHistory.length === 0 || 
        recentHistory[recentHistory.length - 1].role !== 'user' || 
        recentHistory[recentHistory.length - 1].content !== query) {
      contents.push({
        role: 'user',
        parts: [{ text: query }]
      });
    }
    
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: contents,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    if (data.error) {
      console.error('Gemini API error:', data.error);
      throw new Error(data.error.message || 'Error from Gemini API');
    }
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error('Unexpected response format from Gemini API');
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
};

/**
 * Simulates a response from the Gemini API for development/testing
 * @param {string} query - The user's message
 * @param {Object} hospitalPolicies - Additional context like hospital policies
 * @returns {string} - A simulated response
 */
export const simulateGeminiResponse = (query, hospitalPolicies = {}) => {
  const lowerQuery = query.toLowerCase();
  
  // Admin-specific responses
  if (lowerQuery.includes('add a new patient') || lowerQuery.includes('add patient')) {
    return 'To add a new patient, go to the Admin dashboard and click the "Add Patient" button. Fill in the required fields including patient name, ID, procedure type, and scheduled time. Click Save to create the patient record.';
  } else if (lowerQuery.includes('update patient status') || lowerQuery.includes('change status')) {
    return 'To update a patient\'s status, find the patient in the dashboard list, click the "Update Status" button, and select the new status from the dropdown menu. Add any notes if needed and confirm the change.';
  } else if (lowerQuery.includes('search for a patient') || lowerQuery.includes('find patient')) {
    return 'To search for a patient, use the search bar at the top of the dashboard. You can search by patient name, ID number, or procedure type. Results will appear as you type.';
  } else if (lowerQuery.includes('system features') || lowerQuery.includes('features overview')) {
    return 'SurgiTrack features include real-time patient status tracking, automated notifications, patient search, status history, admin controls for adding/editing patients, and a public dashboard for waiting room displays.';
  } 
  // Staff-specific responses
  else if (lowerQuery.includes('patient status workflow') || lowerQuery.includes('workflow')) {
    return 'The patient status workflow follows these steps: 1) Checked In, 2) Pre-Procedure, 3) In-Progress, 4) Recovery, 5) Complete. Update the status as the patient progresses through each stage.';
  } else if (lowerQuery.includes('common procedures info') || lowerQuery.includes('procedures info')) {
    return 'Common procedures in our system include Knee Arthroscopy (30-45 min), Gallbladder Removal (1-2 hours), Appendectomy (1 hour), Heart Bypass (3-6 hours), and Hip Replacement (1-2 hours). Each has specific pre and post-op protocols.';
  } 
  // Guest-specific responses
  else if (lowerQuery.includes('wait') || lowerQuery.includes('how long')) {
    return 'Wait times vary based on procedure complexity and emergencies. The status board shows the most current information.';
  } else if (lowerQuery.includes('visit') || lowerQuery.includes('see')) {
    return 'Visiting is allowed once patients are stable in recovery. General visiting hours are from 9 AM to 8 PM daily. ICU has restricted hours from 11 AM to 1 PM and 5 PM to 7 PM.';
  } else if (lowerQuery.includes('procedure') || lowerQuery.includes('surgery')) {
    return 'For scheduled surgeries, arrive 2 hours before your procedure. Don\'t eat or drink after midnight the night before. Bring your ID, insurance card, and a list of medications.';
  } else if (lowerQuery.includes('food') || lowerQuery.includes('eat')) {
    return 'Check with nurses before bringing food - patients often have dietary restrictions. The main cafeteria is on the second floor and is open from 6:30 AM to 8 PM.';
  } else if (lowerQuery.includes('pain') || lowerQuery.includes('hurt')) {
    return 'Alert a nurse immediately if you believe your family member is in pain.';
  } else if (lowerQuery.includes('doctor') || lowerQuery.includes('surgeon')) {
    return 'Surgeons typically visit after the procedure. Nurses can help coordinate communication with doctors.';
  } else if (lowerQuery.includes('parking')) {
    return "Parking is available in the main garage and costs $5 for the first hour and $2 for each additional hour. We also offer weekly passes for $30.";
  } else if (lowerQuery.includes('wifi') || lowerQuery.includes('internet')) {
    return "Free WiFi is available throughout the hospital. Connect to 'Hospital-Guest' network. No password is required.";
  } else if (lowerQuery.includes('discharge') || lowerQuery.includes('leaving')) {
    return "Standard discharge time is 11 AM. Your doctor will provide discharge instructions and prescriptions. Please arrange transportation in advance.";
  } else if (lowerQuery.includes('covid') || lowerQuery.includes('mask')) {
    return "Masks are required in all patient care areas. Visitors with symptoms should not enter the hospital. COVID testing is available at the west entrance.";
  } else if (lowerQuery.includes('in-progress') || lowerQuery.includes('status mean')) {
    return "'In-Progress' status means the procedure is currently underway. The medical team is focused on the patient's care. This status will update to 'Recovery' once the procedure is complete.";
  } else if (lowerQuery.includes('recovery take') || lowerQuery.includes('recovery time')) {
    return "Recovery time varies by procedure. Minor procedures may require 1-2 hours, while major surgeries can need 3-4 hours or more. The status board will update when the patient moves to the next stage.";
  } else {
    return 'I can answer questions about patient status, wait times, visiting hours, procedures, food, pain management, doctors, parking, WiFi, discharge procedures, and COVID policies. For specific medical questions, please speak with the medical staff directly.';
  }
};