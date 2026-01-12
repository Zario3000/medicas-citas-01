import { Typography, Box } from '@mui/material';
import { useAuth } from '../../auth/AuthContext';
import ListaCitasPaciente from './ListaCitasPaciente';
import CrearCita from './CrearCita';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function DashboardPaciente() {
  const { user } = useAuth();
  const [refresh, setRefresh] = useState(false);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      sx={{
        maxWidth: 1200,
        mx: 'auto',
        px: { xs: 2, md: 4 },
        mt: 4
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: 700,
          color: '#e3f2fd'
        }}
      >
        Bienvenido <span style={{ color: '#64b5f6' }}>{user.nombre}</span>
      </Typography>

      <Box sx={{ mb: 4 }}>
        <CrearCita onCitaCreada={() => setRefresh(!refresh)} />
      </Box>

      <ListaCitasPaciente refresh={refresh} />
    </Box>
  );
}
