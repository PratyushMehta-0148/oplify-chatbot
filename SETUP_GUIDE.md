# 🚀 Oplify AI Chatbot — Complete Beginner Setup Guide

---

## 📁 Final Project Structure (what you'll have)

```
oplify-chatbot/
├── client/                    ← React frontend (website)
│   ├── public/
│   │   └── index.html         ← HTML entry point
│   ├── src/
│   │   ├── App.js             ← Main website + chatbot code
│   │   ├── App.css            ← All styles
│   │   ├── index.js           ← React entry point
│   │   └── index.css          ← Global reset
│   └── package.json           ← Frontend dependencies
│
├── server/                    ← Node.js backend
│   ├── server.js              ← Express + OpenAI API
│   ├── package.json           ← Backend dependencies
│   ├── .env                   ← Your secret API key (NEVER share this)
│   └── .gitignore             ← Prevents .env from going to GitHub
│
└── .gitignore                 ← Root gitignore
```

---

## PHASE 1 — Install the Tools (one time only)

### Step 1 — Install Node.js

1. Open your browser and go to: **https://nodejs.org**
2. Click the big green button that says **"LTS"** (recommended for most users)
3. Download and run the installer — click Next → Next → Install
4. After install, open **Terminal** (Mac) or **Command Prompt** (Windows):
   - Mac: Press `Cmd + Space`, type `Terminal`, press Enter
   - Windows: Press `Win + R`, type `cmd`, press Enter
5. Type these commands to verify it worked:
   ```
   node -v
   npm -v
   ```
   You should see version numbers like `v20.11.0` and `10.2.4` ✅

---

### Step 2 — Install VS Code

1. Go to: **https://code.visualstudio.com**
2. Click **Download for Windows** (or Mac)
3. Install it — all default settings are fine
4. Open VS Code after install

---

### Step 3 — Install Git

1. Go to: **https://git-scm.com/downloads**
2. Click your operating system (Windows or Mac)
3. Download and install — all default settings are fine
4. Verify in Terminal/Command Prompt:
   ```
   git --version
   ```
   Should show something like `git version 2.43.0` ✅

---

### Step 4 — Get your OpenAI API Key

1. Go to: **https://platform.openai.com**
2. Click **Sign Up** (or Log In if you have an account)
3. After logging in, click your profile icon (top right) → **API Keys**
4. Click **"+ Create new secret key"**
5. Give it a name like `oplify-chatbot`
6. **COPY the key immediately** — it looks like: `sk-proj-abc123...`
   ⚠️ You can only see it ONCE. Save it somewhere safe (like Notepad).
7. Add a payment method at **https://platform.openai.com/settings/billing**
   - OpenAI requires a small credit balance (~$5) to use the API
   - `gpt-4o-mini` costs about $0.0001 per message — very cheap

---

## PHASE 2 — Set Up the Project

### Step 5 — Create the folder structure

Open Terminal / Command Prompt and run these commands ONE BY ONE:

```bash
cd Desktop
```
*(This moves you to your Desktop so the project is easy to find)*

```bash
mkdir oplify-chatbot
cd oplify-chatbot
mkdir server
```

Now create the React frontend:
```bash
npx create-react-app client
```
⏳ This takes 2–4 minutes. Wait for it to finish. You'll see "Happy hacking!" when done.

---

### Step 6 — Open the project in VS Code

```bash
code .
```
VS Code will open with your `oplify-chatbot` folder in the sidebar.

---

## PHASE 3 — Set Up the Backend (Server)

### Step 7 — Install server dependencies

In your Terminal (make sure you're in the `oplify-chatbot` folder):
```bash
cd server
npm init -y
npm install express cors dotenv openai
```
Wait for install to finish. You'll see a `node_modules` folder appear in `server/`.

---

### Step 8 — Create `server/package.json`

In VS Code, open `server/package.json` and **replace everything** with:

```json
{
  "name": "oplify-server",
  "version": "1.0.0",
  "type": "module",
  "description": "Oplify AI Chatbot Backend",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "npx nodemon server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "openai": "^4.28.0"
  }
}
```
Save the file: `Ctrl+S` (Windows) or `Cmd+S` (Mac)

---

### Step 9 — Create `server/server.js`

In VS Code, right-click the `server` folder → **New File** → name it `server.js`

Paste the full server code (from the provided server.js file) and save.

---

### Step 10 — Create `server/.env`

In VS Code, right-click the `server` folder → **New File** → name it `.env`

Add this exact content (replace with your real key):
```
OPENAI_API_KEY=sk-proj-your-actual-key-here
```
Save the file.

⚠️ **IMPORTANT**: This file contains your secret key. NEVER share it. NEVER upload to GitHub.

---

### Step 11 — Create `server/.gitignore`

In VS Code, right-click `server` folder → **New File** → name it `.gitignore`

Paste:
```
node_modules
.env
```
Save the file.

---

### Step 12 — Test the server

In Terminal, make sure you're in the `server` folder:
```bash
cd server
node server.js
```
You should see: **✅ Oplify server running on http://localhost:5000**

Keep this Terminal window open! The server must stay running.

---

## PHASE 4 — Set Up the Frontend (React)

### Step 13 — Replace the default React files

The files you need to replace are already provided. In VS Code:

**`client/src/App.js`** → Replace with provided `App.js`
**`client/src/App.css`** → Replace with provided `App.css`
**`client/src/index.js`** → Replace with provided `index.js`
**`client/src/index.css`** → Replace with provided `index.css`
**`client/public/index.html`** → Replace with provided `index.html`

Also delete these default files you don't need:
- `client/src/App.test.js`
- `client/src/logo.svg`
- `client/src/reportWebVitals.js`
- `client/src/setupTests.js`

---

### Step 14 — Start the React app

Open a **NEW** Terminal window (keep the server one open!):
```bash
cd Desktop/oplify-chatbot/client
npm start
```
⏳ Wait 30 seconds. Your browser will automatically open at **http://localhost:3000**

You should see the full Oplify website with the chatbot bubble in the bottom right! 🎉

---

### Step 15 — Test the chatbot

1. Click the blue chat bubble (bottom right)
2. Click a quick reply chip or type a message
3. The bot should respond using OpenAI!

If you see an error, check:
- Is the server still running in the other Terminal? (should show port 5000)
- Is your API key in `.env` correct?

---

## PHASE 5 — Push to GitHub

### Step 16 — Create a GitHub account

If you don't have one: go to **https://github.com** → Sign Up

---

### Step 17 — Create a new GitHub repository

1. Click the **+** icon (top right) → **New repository**
2. Name it: `oplify-chatbot`
3. Set to **Public** or **Private** (your choice)
4. ⚠️ Do NOT check "Add a README file" (leave it empty)
5. Click **Create repository**
6. GitHub will show you a page with commands — keep it open

---

### Step 18 — Create root `.gitignore`

In VS Code, right-click the root `oplify-chatbot` folder → **New File** → `.gitignore`

Paste:
```
node_modules
.env
.DS_Store
build
```
Save.

---

### Step 19 — Push your code

Open Terminal in the root `oplify-chatbot` folder:
```bash
git init
git add .
git commit -m "Initial commit - Oplify AI chatbot"
```

Then copy the commands from your GitHub page that look like:
```bash
git remote add origin https://github.com/YOUR_USERNAME/oplify-chatbot.git
git branch -M main
git push -u origin main
```

Refresh your GitHub page — your files should appear! ✅

---

## PHASE 6 — Deploy Live (Optional)

### Deploy Frontend to Vercel (free)

1. Go to **https://vercel.com** → Sign up with GitHub
2. Click **"Add New Project"**
3. Import your `oplify-chatbot` repository
4. Set **Root Directory** to `client`
5. Click **Deploy** — done!
6. Vercel gives you a live URL like `https://oplify-chatbot.vercel.app`

### Deploy Backend to Render (free)

1. Go to **https://render.com** → Sign up with GitHub
2. Click **New** → **Web Service**
3. Connect your `oplify-chatbot` repo
4. Settings:
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `node server.js`
5. Under **Environment Variables** → Add:
   - Key: `OPENAI_API_KEY`
   - Value: your actual API key
6. Click **Deploy**
7. Render gives you a URL like `https://oplify-server.onrender.com`

### Update the frontend to use the live backend URL

In `client/src/App.js`, find:
```js
const response = await fetch("http://localhost:5000/chat", {
```

Replace with your Render URL:
```js
const response = await fetch("https://oplify-server.onrender.com/chat", {
```

Then redeploy the frontend on Vercel.

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| `npm: command not found` | Re-install Node.js from nodejs.org |
| `Cannot find module 'openai'` | Run `npm install` inside the `server` folder |
| Chatbot says "trouble connecting" | Make sure `node server.js` is running in another terminal |
| `Invalid API Key` | Check your `.env` file has the correct key with no spaces |
| White screen in browser | Check the terminal for error messages |
| Port 5000 already in use | Run `lsof -i :5000` (Mac) and kill the process |

---

## ✅ Quick Checklist

- [ ] Node.js installed (`node -v` works)
- [ ] VS Code installed
- [ ] Git installed
- [ ] OpenAI account created + API key copied
- [ ] OpenAI billing set up (add $5 credit)
- [ ] `server/.env` created with your API key
- [ ] Server running on port 5000
- [ ] React running on port 3000
- [ ] Chatbot responds to messages
- [ ] Code pushed to GitHub
- [ ] (Optional) Deployed to Vercel + Render

---

*Built for Oplify Solutions Pvt Ltd · contact@oplify.in · +91 880 60 47133*
