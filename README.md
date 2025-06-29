# 🎱 TPA Scorekeeper - Simplified

**Professional billiards score tracking made simple**

## 🎯 **Overview**

A streamlined scorekeeper for billiards players with a clean, modular architecture. Features simple number input with superscript notation for break shots.

---

## 🚀 **Quick Start**

1. **Open** `login.html` in your browser
2. **Enter** player names (auto-saved)
3. **Select** game type (8-ball, 9-ball, 10-ball)  
4. **Click** Start to begin scoring

---

## 📋 **Features**

### **✅ Player Setup**
- Clean login interface
- Auto-save player names (cookies)
- Game type selection
- Date/time stamping

### **✅ Scoring Interface** 
- Player toggle buttons
- Number input (0-10) with superscript logic
- Professional scoresheet layout
- Responsive design for mobile

### **✅ Number Input Logic**
```
Empty box → Click "3" → ³3          (break)
³3 → Click "5" → ³3 5               (total) 
³3 5 → Click "7" → ³7               (reset cycle)
```

---

## 🏗️ **Architecture**

### **Multi-Page Structure**
- `login.html` - Player setup and game configuration
- `match.html` - Main scoring interface

### **Modular JavaScript**
```
js/
├── utils.js     ← Utilities, localStorage, cookies
├── login.js     ← Login form logic
├── match.js     ← Match state and number input  
└── ui.js        ← DOM manipulation helpers
```

### **State Management**
- **Cookies**: Player names (persistent)
- **localStorage**: Match parameters and state
- **Clean separation** between login and match data

---

## 🎮 **Usage**

### **Starting a Match**
1. Enter player names in `login.html`
2. Select game type (8/9/10-ball)
3. Click "Start Match"
4. Automatically redirects to `match.html`

### **Scoring**
- **Player Toggle**: Click player name buttons
- **Number Input**: Click 0-10 for ball counts
- **Reset**: Click on score boxes to clear
- **Navigation**: "Back to Setup" returns to login

### **Display Format**
- **Superscript**: Break shots (³3)
- **Normal**: Regular shots (5)
- **Combined**: Break + total (³3 5)

---

## 📱 **Browser Support**

- ✅ **Chrome/Edge/Safari**: Full support
- ✅ **Firefox**: Full support  
- ✅ **Mobile browsers**: Optimized
- ✅ **localStorage required**: Modern browsers only

---

## 🔧 **Development**

### **Local Development**
```bash
# No build process required
# Simply open login.html in browser
```

### **File Structure**
```
project/
├── login.html          ← Entry point
├── match.html          ← Main interface
├── modern-tpa.css      ← Styles
└── js/                 ← JavaScript modules
```

### **Adding Features**
1. **Login features**: Edit `js/login.js`
2. **Match features**: Edit `js/match.js`  
3. **UI helpers**: Edit `js/ui.js`
4. **Utilities**: Edit `js/utils.js`

---

## 📊 **Data Flow**

```
login.html
    ↓ (form submit)
localStorage.matchParams
    ↓ (page redirect)  
match.html
    ↓ (loads params)
localStorage.matchState
    ↓ (auto-save)
Persistent state
```

---

## 🎨 **Customization**

### **Styling**
- Edit `modern-tpa.css` for visual changes
- Professional billiards theme (green/gold)
- Bootstrap 5.3.2 integration

### **Game Types**
- Easily add new game types in `login.js`
- Update `getGameTypeDisplayName()` in `utils.js`

### **Score Logic**
- Modify `handleNumberClick()` in `match.js`
- Customize display in `updatePlayerDisplay()`

---

## 🏆 **Roadmap**

- [ ] **Session persistence** - Resume interrupted matches
- [ ] **Export functionality** - Save scoresheets  
- [ ] **Statistics tracking** - Player performance
- [ ] **Tournament mode** - Multi-match support
- [ ] **Offline support** - PWA capabilities

---

## 📝 **License**

GNU Affero General Public License v3.0

---

## 🔗 **Links**

- **Live Demo**: [https://www.coppolapaolo.it/tpa.html](https://www.coppolapaolo.it/tpa.html)
- **Original TPA System**: [Accu-Stats TPA Rating](https://billiards.colostate.edu/faq/rating/accu-stats-tpa/)

---

**Built with ❤️ for the billiards community**