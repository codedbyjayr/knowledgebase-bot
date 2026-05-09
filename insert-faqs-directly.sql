-- Insert multiple FAQs at once
INSERT INTO faqs (question, answer) VALUES
  ('What is SagotBuddy?', 'SagotBuddy is your AI-powered assistant that helps you find answers quickly from our knowledge base.'),
  ('How do I use the chatbot?', 'Simply type your question in the chat box and press Enter. SagotBuddy will analyze your question and provide the best answer.'),
  ('What are your business hours?', 'Our AI assistant is available 24/7. For human support, we are available Monday to Friday, 9 AM to 5 PM.'),
  ('Is my data secure?', 'Yes, all conversations are encrypted and we follow industry-standard security practices.'),
  ('Can I export my chat history?', 'Currently, chat history is not saved. Each session starts fresh for privacy.'),
  ('How accurate are the answers?', 'SagotBuddy uses advanced AI combined with our FAQ database to provide highly accurate responses.'),
  ('What languages are supported?', 'Currently, we support English. More languages will be added soon.'),
  ('How do I report an issue?', 'You can report issues by contacting our support team at support@example.com.'),
  ('Is there a mobile app?', 'Our web interface is mobile-friendly. A dedicated app is coming soon.'),
  ('How much does it cost?', 'SagotBuddy is currently free to use during our beta period.');

-- View all FAQs to confirm
SELECT * FROM faqs ORDER BY created_at DESC;
