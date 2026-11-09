# 🐍 Snake Water Gun 🔫

🇮🇳 [हिन्दी में पढ़ें → README.hi.md](README.hi.md)

The classic childhood game, rebuilt as a colourful web game that **kids can understand and enjoy**.
Works in **English and Hindi (हिन्दी)** - switch any time with the button at the top.

## ✨ Features
- 🌐 **Two languages**: English / हिन्दी (one click, remembered next time)
- 🦉 **Chiku the owl** guide gives tips and cheers you on
- 📖 **Animated "How to play"** screen, plus a rules strip that is always visible
- 💬 After every round it **explains why** someone won ("Snake drinks Water")
- 🗣️ Optional **read aloud** (Hindi + English voice)
- 🐣 3 levels: Little Champ (easy), Normal, Pro (smart computer)
- 🦁 Pick a hero, ⭐ collect stars, 🏅 unlock badges
- 🎨 3 colour themes (Galaxy, Jungle, Ocean), sound effects, confetti
- 📱 Works on phone and computer; keys `S` `W` `G` (or `1` `2` `3`)

## 📜 Rules
- 🐍 Snake drinks 💧 Water
- 💧 Water washes away 🔫 Gun
- 🔫 Gun scares 🐍 Snake away
- Same choice = draw

## ▶️ Run on your computer
1. Open the folder in **VS Code**.
2. Install the **Live Server** extension, right-click `index.html` → **Open with Live Server**.
3. (Or just double-click `index.html`.)

The original Python console game is in `python-version/snake_water_gun.py`.

## 🚀 Put it on GitHub
```bash
git init
git add .
git commit -m "Snake Water Gun game"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/snake-water-gun.git
git push -u origin main
```
(Create an empty repository named `snake-water-gun` on github.com first.)

## 🌍 Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. **Add New → Project** → import `snake-water-gun`.
3. Leave all settings as they are (no build step) → **Deploy**.
4. You get a live link like `https://snake-water-gun.vercel.app`. Every `git push` updates it automatically.

## 📁 Files
| File | What it does |
|------|--------------|
| `index.html` | Page structure |
| `style.css` | Looks, animations, themes |
| `script.js` | Game logic, English + Hindi text, sounds |
| `python-version/` | Original console game |

## License
MIT
