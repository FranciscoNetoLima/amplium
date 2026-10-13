const paths = {
  climate: (
    <>
      <path d="M4 8h11a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M5 17h5a2 2 0 1 1-2 2" />
    </>
  ),
  home: (
    <>
      <path d="m3 10 9-7 9 7v10H3zM9 20v-7h6v7" />
    </>
  ),
  tools: (
    <>
      <path d="m14 7 3 3 4-4a6 6 0 0 1-8 8l-7 7-3-3 7-7a6 6 0 0 1 8-8z" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  leaf: (
    <>
      <path d="M20 3C8 2 2 9 5 16s15 5 15-13ZM5 20 16 8" />
    </>
  ),
  flow: (
    <>
      <rect x="3" y="3" width="6" height="6" rx="1.5" />
      <rect x="15" y="15" width="6" height="6" rx="1.5" />
      <path d="M6 9v6a3 3 0 0 0 3 3h6M9 6h6a3 3 0 0 1 3 3v6" />
    </>
  ),
  chart: (
    <>
      <path d="M4 3v17h17M8 15v-4M13 15V6M18 15V9" />
    </>
  ),
  message: (
    <>
      <path d="M4 4h16v12H9l-5 4zM8 8h8M8 12h5" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  document: (
    <>
      <path d="M5 3h10l4 4v14H5zM14 3v5h5M9 12h6M9 16h6" />
    </>
  ),
  send: (
    <>
      <path d="m3 10 18-7-7 18-3-8zM11 13 21 3" />
    </>
  ),
};

export function DemoIcon({ name = 'grid', className = '' }) {
  return (
    <svg
      className={`demo-ui-icon ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name] ?? paths.grid}
    </svg>
  );
}
