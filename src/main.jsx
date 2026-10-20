import { useEffect } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import { prepareHydration } from './i18n.js';
import '../styles.css';
import '../services.css';
import '../navbar.css';
import '../brand.css';
import '../motion.css';
import '../footer.css';
import '../hero-art.css';
import '../compact.css';

function HydratedApp({ restoreLanguage }) {
  useEffect(restoreLanguage, [restoreLanguage]);
  return <App />;
}

const root = document.getElementById('root');
if (root.dataset.prerendered === 'true') {
  hydrateRoot(root, <HydratedApp restoreLanguage={prepareHydration()} />);
} else {
  createRoot(root).render(<App />);
}
