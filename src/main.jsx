import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import '../styles.css';
import '../services.css';
import '../navbar.css';
import '../brand.css';
import '../capture.css';
import '../motion.css';
import '../footer.css';
import '../solutions.css';
import '../process.css';
import '../faq.css';
import '../hero-art.css';

if (window.location.pathname.startsWith('/demonstracoes/site-servicos')) {
  import('./demo/DemoSite.jsx').then(({ default: DemoSite }) => {
    createRoot(document.getElementById('root')).render(<DemoSite />);
  });
} else if (window.location.pathname === '/demonstracoes/landing-page') {
  import('./demo/LandingDemo.jsx').then(({ default: Demo }) => {
    createRoot(document.getElementById('root')).render(<Demo />);
  });
} else if (window.location.pathname === '/demonstracoes/e-commerce') {
  import('./demo/ShopDemo.jsx').then(({ default: Demo }) => {
    createRoot(document.getElementById('root')).render(<Demo />);
  });
} else if (window.location.pathname === '/demonstracoes/aplicacoes-crm') {
  import('./demo/CrmDemo.jsx').then(({ default: Demo }) => {
    createRoot(document.getElementById('root')).render(<Demo />);
  });
} else if (window.location.pathname === '/demonstracoes/automacoes-ia') {
  import('./demo/AutomationDemo.jsx').then(({ default: Demo }) => {
    createRoot(document.getElementById('root')).render(<Demo />);
  });
} else if (window.location.pathname === '/demonstracoes/trafego-pago') {
  import('./demo/TrafficDemo.jsx').then(({ default: Demo }) => {
    createRoot(document.getElementById('root')).render(<Demo />);
  });
} else {
  createRoot(document.getElementById('root')).render(<App />);
}
