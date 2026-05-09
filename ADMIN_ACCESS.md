# Admin Access Guide (Private)

## 🔒 Admin Panel Access

The admin panel is hidden from public view. To access it:

### Direct URL Access
Navigate directly to: **http://localhost:5173/admin**

### Admin Features
- **Add/Edit/Delete FAQs** - Manage your knowledge base
- **View Unanswered Queries** - See what users are asking
- **Analytics** - Track usage and popular questions

## 🚀 First Time Setup

1. Go to http://localhost:5173/admin
2. Click "Sign Up" to create admin account
3. Confirm email (check inbox/spam)
4. Log in with your credentials

## 📊 Managing Unanswered Queries

When users ask questions that don't match existing FAQs:
1. SagotBuddy uses AI to provide an answer
2. The question is logged as "unanswered"
3. Admins can review these in the admin panel
4. Add new FAQs based on common questions

## 🔐 Security Notes

- Admin URL is not linked from public pages
- Only share admin URL with authorized personnel
- Use strong passwords for admin accounts
- Consider adding IP restrictions in production

## 💡 Best Practices

1. **Regular Reviews** - Check unanswered queries weekly
2. **FAQ Updates** - Keep answers current and accurate
3. **User Focus** - Write FAQs in user-friendly language
4. **Analytics** - Track which FAQs are most helpful

## 🛠️ Troubleshooting

### Can't log in?
- Ensure you've confirmed your email
- Try password reset if needed
- Check browser console for errors

### FAQs not updating?
- Refresh the page (Ctrl+F5)
- Check Supabase connection
- Verify you're logged in as admin

---

**Remember**: Keep the admin URL private. Users should only interact through the public chat interface.
