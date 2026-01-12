import { useEffect, useState } from 'react';
import api from '../../api/axios';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Chip,
  Collapse
} from '@mui/material';
import { motion } from 'framer-motion';
import '../../styles/medico.css';

const estados = [
  { key: 'pendiente', titulo: 'Citas Pendientes', color: 'warning' },
  { key: 'atendida', titulo: 'Citas Atendidas', color: 'success' },
  { key: 'reprogramada', titulo: 'Citas Reprogramadas', color: 'info' },
  { key: 'cancelada', titulo: 'Citas Canceladas', color: 'error' }
];

export default function ListaCitasMedico() {
  const [citas, setCitas] = useState([]);
  const [openSection, setOpenSection] = useState(null);

  useEffect(() => {
    api.get('/medico/citas').then(res => setCitas(res.data));
  }, []);

  const atenderCita = async (id) => {
    await api.put(`/medico/citas/${id}/atender`);
    const res = await api.get('/medico/citas');
    setCitas(res.data);
  };

  return (
    <Grid
      container
      spacing={4}
      justifyContent="center"
      className="medico-sections"
    >
      {estados.map((estado, i) => {
        const filtradas = citas.filter(c => c.estado === estado.key);

        return (
          <Grid item xs={12} key={estado.key}>
            <motion.div
              initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <Card className="estado-card">
                <CardContent>
                  <Typography className="estado-title">
                    {estado.titulo}
                  </Typography>

                  <Typography className="estado-desc">
                    Total de citas: {filtradas.length}
                  </Typography>

                  <Button
                    className="toggle-btn"
                    onClick={() =>
                      setOpenSection(
                        openSection === estado.key ? null : estado.key
                      )
                    }
                  >
                    {openSection === estado.key ? 'Ocultar' : 'Mostrar'}
                  </Button>

                  <Collapse in={openSection === estado.key}>
                    <Grid
                      container
                      spacing={3}
                      justifyContent="center"
                      className="citas-grid"
                    >
                      {filtradas.length === 0 && (
                        <Typography className="no-citas">
                          No hay citas en esta sección
                        </Typography>
                      )}

                      {filtradas.map(cita => (
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={4}
                          key={cita.id}
                        >
                          <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            viewport={{ once: false }}
                          >
                            <Card className="cita-card">
                              <CardContent>
                                <Typography className="cita-paciente">
                                  {cita.paciente}
                                </Typography>

                                <Typography className="cita-info">
                                  {cita.especialidad}
                                </Typography>

                                <Typography className="cita-info">
                                  {new Date(cita.fecha).toLocaleDateString()} — {cita.hora}
                                </Typography>

                                <Chip
                                  label={cita.estado}
                                  color={estado.color}
                                  className="estado-chip"
                                />

                                {cita.estado === 'pendiente' && (
                                  <Button
                                    className="atender-btn"
                                    onClick={() => atenderCita(cita.id)}
                                  >
                                    Atender
                                  </Button>
                                )}
                              </CardContent>
                            </Card>
                          </motion.div>
                        </Grid>
                      ))}
                    </Grid>
                  </Collapse>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        );
      })}
    </Grid>
  );
}
