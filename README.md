Got it — here is a **pure Markdown README.md**, no explanation, no extra text — ready to paste directly into your repo.

---

```md
# GitHub Reviewer

GitHub Reviewer is a web application built with **React + TypeScript** that analyzes any GitHub profile and generates an **AI-powered review** based on repositories, languages, stars, activity, and more.

Live Website: https://github-reviewer-pi.vercel.app/


## ✨ Features

- Search any GitHub username.
- Fetches:
  - Avatar, bio, followers/following
  - Public repositories
  - Stargazers, forks, watchers
  - Languages and technologies used
  - Last updated repo activity
- AI-generated profile review.
- Clean, responsive UI.
- Fast deployment using Vercel.



## 🧠 How It Works

1. User enters a GitHub username.  
2. Application fetches user + repo data from GitHub REST API.  
3. Data is structured and sent to the AI model.  
4. AI generates:
   - Skill summary  
   - Strengths  
   - Weaknesses  
   - Repo quality insights  
5. Review is displayed on the UI.

---

## 🚀 Tech Stack

**Frontend:** React, TypeScript, Vite, Tailwind CSS  
**APIs:** GitHub REST API, AI (Gemini/GPT)  
**Deployment:** Vercel  



## 📁 Folder Structure

```

github-reviewer/
│
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
│
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md

````

---

## 🛠 Installation

### 1. Clone Repository
```bash
git clone https://github.com/lakshya-sinha/github-reviewer
cd github-reviewer
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file:

```
VITE_GITHUB_TOKEN=your_github_token_here
VITE_AI_API_KEY=your_ai_key_here
```

> GitHub token optional but recommended to avoid rate-limits.

### 4. Run Development Server

```bash
npm run dev
```

App will run on:
[http://localhost:5173](http://localhost:5173)

---

## 🌐 Deployment

Deploy on Vercel:

```bash
vercel
```

or connect repo directly to Vercel dashboard.


## 📸 Screenshots

*Add images here*

```
![Homepage](./screenshots/home.png)
![Profile Page](./screenshots/profile.png)
```

---

## 🔮 Future Improvements

* Charts for languages & activity
* Caching & rate-limit protection
* Compare two GitHub profiles
* Dark/light theme toggle
* More AI analysis options
* Contributions graph integration
* Repo README analysis



## 📄 License

Licensed under the **MIT License**.



## 💬 Author

**Lakshya Sinha**
GitHub: [https://github.com/lakshya-sinha](https://github.com/lakshya-sinha)


