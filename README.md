<h1>🔐 SecureDoc Vault - Frontend</h1>
<p>A modern, secure document sharing platform built with <strong>React</strong>, <strong>Vite</strong>, and <strong>Tailwind CSS</strong>.</p>

<hr />

<h2>🚀 Features</h2>
<ul>
  <li>🔐 <strong>Secure Authentication</strong> - JWT-based user authentication</li>
  <li>📄 <strong>Document Management</strong> - Upload, share, and manage documents</li>
  <li>🔗 <strong>Secure Sharing</strong> - Generate secure links with expiration dates</li>
  <li>📱 <strong>QR Code Sharing</strong> - Easy mobile access via QR codes</li>
  <li>📊 <strong>Access Tracking</strong> - Monitor who accesses your documents</li>
  <li>🎨 <strong>Modern UI</strong> - Beautiful, responsive design with Tailwind CSS</li>
  <li>⚡ <strong>Fast Performance</strong> - Built with Vite for optimal speed</li>
</ul>

<h2>🧰 Tech Stack</h2>
<ul>
  <li><strong>React 18</strong> - Hooks and modern component architecture</li>
  <li><strong>Vite</strong> - Lightning-fast dev server and builds</li>
  <li><strong>Tailwind CSS</strong> - Utility-first styling</li>
  <li><strong>React Router</strong> - Client-side routing</li>
  <li><strong>Axios</strong> - API requests</li>
  <li><strong>React Toastify</strong> - Toast notifications</li>
</ul>

<h2>📁 Project Structure</h2>
<pre><code>securedoc-frontend/
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
</code></pre>

<h2>✅ Prerequisites</h2>
<ul>
  <li>Node.js (v16 or higher)</li>
  <li>npm or yarn</li>
  <li>Backend API running on <code>http://localhost:5000</code></li>
</ul>

<h2>⚙️ Installation</h2>
<pre><code>git clone https://github.com/your-username/securedoc-frontend.git
cd securedoc-frontend
npm install
</code></pre>

<h2>🛠️ Environment Setup</h2>
<p>Create a <code>.env</code> file in the root:</p>
<pre><code>VITE_API_URL=http://localhost:5000/api
VITE_DEV_MODE=true
</code></pre>

<h2>🧪 Available Scripts</h2>
<pre><code>npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
</code></pre>

<h2>🔍 Key Features Explained</h2>
<h3>🔐 Authentication System</h3>
<ul>
  <li>JWT-based login and registration</li>
  <li>Automatic token refresh</li>
  <li>Protected routes</li>
</ul>

<h3>📤 Document Upload</h3>
<ul>
  <li>Drag &amp; drop</li>
  <li>File validation (PDF, DOCX, JPG, PNG, etc.)</li>
  <li>Max size: 10MB</li>
  <li>Upload progress indicator</li>
</ul>

<h3>🔗 Secure Sharing</h3>
<ul>
  <li>Unique shareable links</li>
  <li>QR code generation</li>
  <li>Expiry date for shared links</li>
  <li>Access logging &amp; analytics</li>
</ul>

<h3>🎨 Responsive UI</h3>
<ul>
  <li>Mobile-first design</li>
  <li>Tailwind CSS + Glassmorphism</li>
  <li>Smooth transitions and animations</li>
</ul>

<h2>🧱 Component Architecture</h2>
<ul>
  <li><strong>Auth/</strong>: Login.jsx, Register.jsx</li>
  <li><strong>Dashboard/</strong>: Dashboard.jsx, FileUpload.jsx, DocumentCard.jsx, AccessLogs.jsx</li>
  <li><strong>Shared/</strong>: Header.jsx, ShareView.jsx</li>
  <li><strong>Layout/</strong>: Layout.jsx</li>
</ul>

<h2>🎨 Styling Approach</h2>
<ul>
  <li>Custom color palette: primary, success, danger</li>
  <li>Custom animations: bounce, pulse, spin</li>
  <li>Utility classes: reusable buttons, forms, cards</li>
  <li>Shadow system for depth</li>
</ul>

<h2>🔌 API Integration</h2>
<ul>
  <li>Axios instance with interceptors</li>
  <li>Auth service (login, register)</li>
  <li>Document service (upload, list, delete)</li>
  <li>Share service (QR access, expiration handling)</li>
</ul>

<h2>📦 Production Build</h2>
<pre><code>npm run build
npm run preview
</code></pre>

<h2>🌍 Deployment</h2>
<p>Use files in <code>/dist</code> folder for deployment.</p>

<h2>🌐 Environment Variables</h2>
<table>
  <thead>
    <tr>
      <th>Variable</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>VITE_API_URL</code></td>
      <td>Backend API base URL</td>
    </tr>
    <tr>
      <td><code>VITE_DEV_MODE</code></td>
      <td>Development mode flag</td>
    </tr>
  </tbody>
</table>

<h2>✅ Browser Support</h2>
<ul>
  <li>Chrome (latest)</li>
  <li>Firefox (latest)</li>
  <li>Safari (latest)</li>
  <li>Edge (latest)</li>
</ul>

<h2>🤝 Contributing</h2>
<ol>
  <li>Fork the repo</li>
  <li>Create your feature branch</li>
  <li>Commit your changes</li>
  <li>Run tests and linting</li>
  <li>Submit a pull request</li>
</ol>

<h2>📄 License</h2>
<p>This project is licensed under the <strong>MIT License</strong>.</p>
