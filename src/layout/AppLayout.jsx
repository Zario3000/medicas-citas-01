import { Box } from '@mui/material';
import '../styles/appLayout.css';

export default function AppLayout({ children }) {
  return (
    <Box className="app-bg">
      {/* CÍRCULOS ANIMADOS */}
      <div className="app-circle c1" />
      <div className="app-circle c2" />
      <div className="app-circle c3" />
      <div className="app-circle c4" />
      <div className="app-circle c5" />
      <div className="app-circle c6" />

      <Box className="app-content">
        {children}
      </Box>
    </Box>
  );
}
