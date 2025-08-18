# SurgiTrack 🏥
*Real-Time Surgical Status Tracking System*

[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC.svg)](https://tailwindcss.com/)

## Overview

SurgiTrack is a comprehensive patient status tracking system designed to reduce anxiety for families waiting during medical procedures. Originally scoped as a simple waiting room board, our team delivered a production-ready application with full authentication, role-based access, and responsive design.

**The Problem:** Families spend hours in hospital waiting rooms with no updates on their loved ones' surgical progress.

**Our Solution:** Real-time status tracking with secure patient lookup, staff dashboards, and instant updates displayed on public monitors.

![Demo Screenshot Placeholder](screenshots/dashboard-preview.png)

## ✨ Features

### Core MVP (Delivered & Enhanced)
- 📺 **Public Waiting Room Display** - Auto-rotating patient status board
- 🔍 **Patient Status Lookup** - Secure ID-based patient search
- 👨‍⚕️ **Staff Dashboard** - Complete patient management system
- 📱 **Responsive Design** - Optimized for tablets, phones, and displays

### Advanced Features (Beyond Requirements)
- 🔐 **Multi-Role Authentication** - Admin, surgical staff, and guest access
- 🎨 **Modern UI/UX** - Professional healthcare-grade interface  
- 🤖 **AI Assistant Integration** - Gemini-powered help system
- 📊 **Real-time Updates** - Live status synchronization
- 🏥 **Complete CRUD Operations** - Full patient data management
- 🔒 **Privacy-First Design** - Secure patient information handling

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | Frontend framework |
| **Tailwind CSS** | Styling & responsive design |
| **React Router** | Client-side routing |
| **Context API** | State management |
| **Gemini AI** | Chatbot integration |
| **Vite** | Build tool & dev server |

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/chingu-voyages/v56-tier1-team-03.git
   cd v56-tier1-team-03
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 💻 Usage

### For Hospital Staff
1. Login with staff credentials
2. Access patient dashboard
3. Update patient status in real-time
4. Manage patient records

### For Families & Visitors
1. Visit patient lookup page
2. Enter 6-character patient ID
3. View real-time surgical status
4. Get status explanations and updates

### Sample Credentials
```
Admin: ID: admin001 | Password: admin123
Staff: ID: staff001 | Password: staff123
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout/         # Header, Footer, Navigation
│   └── UI/             # Buttons, Forms, Modals
├── contexts/           # React Context providers
├── Pages/              # Route components
├── services/           # API integrations
└── data/               # Mock data & configurations
```

## 🎯 User Flows

### Staff Workflow
```
Login → Dashboard → Select Patient → Update Status → Confirm
```

### Family Workflow  
```
Enter Patient ID → View Status → Get Updates → Contact Staff if Needed
```

## 📱 Screenshots

| Public Dashboard | Staff Login | Patient Status |
|------------------|-------------|----------------|
| ![Public](screenshots/public-dashboard.png) | ![Login](screenshots/staff-login.png) | ![Status](screenshots/patient-status.png) |

*Demo GIF: [View Live Demo](demo/surgitrack-demo.gif)*

## 🚀 Deployment

### Netlify (Recommended)
1. Build the project: `npm run build`
2. Deploy `dist/` folder to Netlify
3. Configure redirects for SPA routing

### Vercel Alternative
```bash
npm install -g vercel
vercel --prod
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📋 Development Guidelines

- Follow React best practices
- Use Tailwind utility classes
- Write descriptive commit messages
- Test on mobile and desktop
- Maintain accessibility standards

## 🏆 Team

**JAMBA Team** - *Chingu Voyage 56*

- **Jimmy** - Frontend Architecture
- **Asif** - UI/UX Design  
- **Mostafa** - Backend Integration
- **Britt** - Testing & QA
- **Aibar** - DevOps & Deployment

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Chingu](https://www.chingu.io/) for the collaborative opportunity
- Healthcare professionals who inspired the user requirements
- Open source community for the amazing tools and libraries

---

**Made with ❤️ for families waiting in hospital rooms everywhere**

⭐ Star this repo if you found it helpful!