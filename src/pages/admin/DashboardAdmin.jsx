import { Typography, Tabs, Tab, Box } from '@mui/material';
import { useState } from 'react';
import { motion } from 'framer-motion';
import ListaMedicos from './ListaMedicos';
import ListaCitasAdmin from './ListaCitasAdmin';
import ListaPacientes from './ListaPacientes';
import { useAuth } from '../../auth/AuthContext';
import AdminLayout from './AdminLayout';
import '../../styles/admin.css';

export default function DashboardAdmin() {
  const { user } = useAuth();
  const [tab, setTab] = useState(0);

  return (
    <AdminLayout>
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="admin-header"
      >
        <Typography className="admin-title">
          Bienvenido Administrador <span>{user.nombre}</span>
        </Typography>

        <Typography className="admin-subtitle">
          Panel de administración del sistema
        </Typography>
      </motion.div>

      {/* TABS */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="admin-tabs-wrapper"
      >
        <Tabs
          value={tab}
          onChange={(e, v) => setTab(v)}
          centered
          className="admin-tabs"
          TabIndicatorProps={{ className: 'admin-tab-indicator' }}
        >
          <Tab label="Médicos" className="admin-tab" />
          <Tab label="Pacientes" className="admin-tab" />
          <Tab label="Citas" className="admin-tab" />
        </Tabs>
      </motion.div>

      {/* CONTENIDO */}
      <motion.div 
        key={tab}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="admin-content"
      >
        {tab === 0 && <ListaMedicos />}
        {tab === 1 && <ListaPacientes />}
        {tab === 2 && <ListaCitasAdmin />}
      </motion.div>
    </AdminLayout>
  );
}
