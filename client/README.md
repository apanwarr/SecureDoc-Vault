SecureDoc Vault - Frontend
A modern, secure document sharing platform built with React, Vite, and Tailwind CSS.

Features
🔐 Secure Authentication - JWT-based user authentication
📄 Document Management - Upload, share, and manage documents
🔗 Secure Sharing - Generate secure links with expiration dates
📱 QR Code Sharing - Easy mobile access via QR codes
📊 Access Tracking - Monitor who accesses your documents
🎨 Modern UI - Beautiful, responsive design with Tailwind CSS
⚡ Fast Performance - Built with Vite for optimal development experience
Tech Stack
React 18 - Modern React with hooks
Vite - Fast build tool and dev server
Tailwind CSS - Utility-first CSS framework
React Router - Client-side routing
Axios - HTTP client for API calls
React Toastify - Toast notifications
Project Structure
securedoc-frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── FileUpload.jsx
│   │   │   ├── DocumentCard.jsx
│   │   │   └── AccessLogs.jsx
│   │   ├── Layout/
│   │   │   └── Layout.jsx
│   │   └── Shared/
│   │       ├── Header.jsx
│   │       └── ShareView.jsx
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   │   └── auth.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
Prerequisites
Node.js (v16 or higher)
npm or yarn
Backend API server running on http://localhost:5000
Installation
Clone the repository
bash
git clone <repository-url>
cd securedoc-frontend
Install dependencies
bash
npm install
Environment Setup Create a .env file in the root directory:
env
VITE_API_URL=http://localhost:5000/api
VITE_DEV_MODE=true
Start the development server
bash
npm run dev
Open your browser Navigate to http://localhost:3000
Available Scripts
npm run dev - Start development server
npm run build - Build for production
npm run preview - Preview production build
npm run lint - Run ESLint
Key Features Explained
Authentication System
Secure JWT-based authentication
Automatic token refresh handling
Route protection for authenticated users
Document Upload
Drag & drop file upload
File type validation (PDF, DOC, DOCX, TXT, JPG, PNG)
File size limits (10MB max)
Progress indicators
Secure Sharing
Generate unique share links
QR code generation for mobile access
Expiration date management
Access logging and tracking
Responsive Design
Mobile-first approach
Tailwind CSS utility classes
Modern glassmorphism effects
Smooth animations and transitions
Component Architecture
Authentication Components
Login.jsx - User login form with validation
Register.jsx - User registration with password confirmation
Dashboard Components
Dashboard.jsx - Main dashboard view
FileUpload.jsx - File upload with drag & drop
DocumentCard.jsx - Individual document display
AccessLogs.jsx - Document access history
Shared Components
Header.jsx - Navigation header
ShareView.jsx - Public document access page
Layout.jsx - Common layout wrapper
Styling Approach
The project uses Tailwind CSS with custom configurations:

Custom Colors: Primary, success, and danger color palettes
Custom Animations: Gentle bounces, soft pulses, slow spins
Shadow System: Soft, medium, and strong shadow variants
Component Classes: Reusable button, form, and card styles
API Integration
The frontend integrates with a REST API through:

Axios Instance: Configured with base URL and interceptors
Auth Service: Login, register, and user management
Documents Service: Upload, list, delete, and access logs
Share Service: Public document access and info
Development Best Practices
Component Organization: Logical folder structure by feature
State Management: React hooks for local state
Error Handling: Comprehensive error boundaries and user feedback
Performance: Optimized images, lazy loading, and code splitting
Accessibility: Semantic HTML, proper ARIA labels, keyboard navigation
Production Build
Build the project
bash
npm run build
Preview the build
bash
npm run preview
Deploy The dist folder contains the production-ready files.
Environment Variables
VITE_API_URL - Backend API base URL
VITE_DEV_MODE - Development mode flag
Browser Support
Chrome (latest)
Firefox (latest)
Safari (latest)
Edge (latest)
Contributing
Fork the repository
Create a feature branch
Make your changes
Run tests and linting
Submit a pull request
License
This project is licensed under the MIT License.

