import { Box } from '@mui/material';
import '../../styles/admin.css';

export default function AdminLayout({ children }) {
  return (
    <Box className="admin-bg">
      {/* CÍRCULOS DE FONDO */}
      <div className="admin-circle a1" />
      <div className="admin-circle a2" />
      <div className="admin-circle a3" />
      <div className="admin-circle a4" />
      <div className="admin-circle a5" />

      <Box className="admin-container">
        {children}
      </Box>
    </Box>
  );
}
