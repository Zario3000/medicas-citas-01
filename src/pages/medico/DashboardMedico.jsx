import { Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useAuth } from '../../auth/AuthContext';
import ListaCitasMedico from './ListaCitasMedico';
import '../../styles/medico.css';

export default function DashboardMedico() {
  const { user } = useAuth();

  return (
    <Box className="medico-bg">
      {/* CÍRCULOS DE FONDO */}
      <div className="bg-circle c1" />
      <div className="bg-circle c2" />
      <div className="bg-circle c3" />
      <div className="bg-circle c4" />
      <div className="bg-circle c5" />
      <div className="bg-circle c6" />

      <motion.div
        className="medico-dashboard"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography className="medico-title">
          Bienvenido Dr(a). <span>{user.nombre}</span>
        </Typography>

        <Typography className="medico-subtitle">
          Panel de gestión de citas médicas
        </Typography>

        <ListaCitasMedico />
      </motion.div>
    </Box>
  );
}
