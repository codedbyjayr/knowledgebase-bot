# FAQ Management Guide

## 🚀 Quick Start

### Option 1: Add Sample FAQs (Recommended for Testing)
```bash
node setup-sample-faqs.js
```
This will add 5 sample FAQs to get you started.

### Option 2: Manual Admin Panel Setup

## 📝 Managing FAQs

### 1. Access Admin Panel
- Navigate to: http://localhost:5173/admin
- Or click "Get Started →" button on the homepage

### 2. Create Admin Account (First Time)
1. Click "Sign Up" on the login page
2. Enter your email and password
3. Confirm your email (check inbox)
4. Sign in with your credentials

### 3. Add New FAQs
Once logged in:
1. Click "Add New FAQ" button
2. Enter the Question (what users might ask)
3. Enter the Answer (helpful response)
4. Click "Save FAQ"

### 4. Edit Existing FAQs
- Click the "Edit" button next to any FAQ
- Modify the question or answer
- Click "Update" to save changes

### 5. Delete FAQs
- Click the "Delete" button next to any FAQ
- Confirm the deletion

## 📊 Viewing Unanswered Queries

The admin panel shows questions that users asked but didn't get good answers for:
- Review these regularly
- Add new FAQs based on common unanswered questions
- This helps improve your knowledge base over time

## 💡 Best Practices

### Writing Good FAQs
1. **Keep questions natural** - Write how users would actually ask
2. **Make answers clear** - Avoid jargon, be concise
3. **Be specific** - One question, one clear answer
4. **Update regularly** - Keep information current

### Example FAQs
- ❓ "How do I reset my password?"
- ✅ "To reset your password, click 'Forgot Password' on the login page. Enter your email and we'll send you reset instructions."

- ❓ "What payment methods do you accept?"
- ✅ "We accept Visa, Mastercard, American Express, and PayPal. All transactions are secure and encrypted."

## 🤖 How SagotBuddy Uses FAQs

1. **Exact Matching**: Finds FAQs with similar questions
2. **AI Understanding**: Uses Gemini AI to understand intent
3. **Smart Responses**: Combines FAQ data with AI to give natural answers
4. **Learning**: Tracks unanswered questions to improve over time

## 🔧 Troubleshooting

### Can't access admin panel?
- Make sure both servers are running:
  ```bash
  npm run server  # In one terminal
  npm run dev     # In another terminal
  ```

### FAQs not showing up?
- Refresh the page
- Check browser console for errors
- Verify Supabase connection

### Need to reset everything?
- Delete all FAQs from admin panel
- Or run SQL in Supabase dashboard:
  ```sql
  DELETE FROM faqs;
  DELETE FROM unanswered_queries;
  ```

## 📞 Support

If you need help:
1. Check unanswered queries for common issues
2. Add FAQs based on user needs
3. SagotBuddy will handle the rest!
