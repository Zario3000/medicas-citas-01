import { useEffect, useState } from 'react';
import api from '../../api/axios';
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Box
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/paciente.css';

const estadoColor = {
  pendiente: 'warning',
  atendida: 'success',
  cancelada: 'error',
  reprogramada: 'info'
};

export default function ListaCitasPaciente({ refresh }) {
  const [citas, setCitas] = useState([]);
  const [openEstado, setOpenEstado] = useState('pendiente');

  useEffect(() => {
    api.get('/paciente/citas').then(res => setCitas(res.data));
  }, [refresh]);

  const toggle = (estado) => {
    setOpenEstado(prev => (prev === estado ? null : estado));
  };

  const renderSeccion = (estado, titulo, descripcion) => {
    const data = citas.filter(c => c.estado === estado);
    const abierta = openEstado === estado;

    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5 }}
      >
        <Card className="paciente-section">
          <CardContent>
            <div className="paciente-section-header">
              <div>
                <div className="paciente-section-title">{titulo}</div>
                <div className="paciente-section-desc">{descripcion}</div>
              </div>

              <Button
                variant="outlined"
                onClick={() => toggle(estado)}
              >
                {abierta ? 'Ocultar' : 'Ver'}
              </Button>
            </div>

            <AnimatePresence>
              {abierta && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  {data.length === 0 ? (
                    <Typography color="text.secondary">
                      No hay citas en este estado
                    </Typography>
                  ) : (
                    <Grid container spacing={3} justifyContent="center">
                      {data.map(cita => (
                        <Grid item xs={12} sm={6} md={4} key={cita.id}>
                          <motion.div whileHover={{ scale: 1.03 }}>
                            <Card className="paciente-cita-card">
                              <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                  {cita.especialidad}
                                </Typography>

                                <Typography>
                                  Médico: {cita.medico}
                                </Typography>

                                <Typography>
                                  Fecha: {new Date(cita.fecha).toLocaleDateString()}
                                </Typography>

                                <Typography>
                                  Hora: {cita.hora}
                                </Typography>

                                <Chip
                                  label={cita.estado}
                                  color={estadoColor[cita.estado]}
                                  sx={{ mt: 1 }}
                                />
                              </CardContent>
                            </Card>
                          </motion.div>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <Box>
      {renderSeccion('pendiente', 'Citas pendientes', 'Citas aún no atendidas')}
      {renderSeccion('atendida', 'Citas atendidas', 'Historial de citas realizadas')}
      {renderSeccion('reprogramada', 'Citas reprogramadas', 'Citas con cambio de fecha u hora')}
      {renderSeccion('cancelada', 'Citas canceladas', 'Citas anuladas')}
    </Box>
  );
}
