import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import { motion } from 'framer-motion';
import LoginModal from '../components/LoginModal';
import '../styles/Home.css';

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <Box className="home-root">

      {/* HERO */}
      <Box className="hero">
        <div className="bubble b1" />
        <div className="bubble b2" />
        <div className="bubble b3" />
        <div className="bubble b4" />
<div className="bubble b5" />
<div className="bubble b6" />
<div className="bubble b7" />
<div className="bubble b8" />
<div className="bubble b9" />
<div className="bubble b10" />


        <motion.div
          className="hero-inner"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img src="../../public/descarga.png" alt="Logo" className="logo" />

          <Typography className="hero-title">
            Plataforma de Citas Médicas
          </Typography>

          <Typography className="hero-subtitle">
            Sistema académico universitario para la gestión de citas médicas – UNAMBA
          </Typography>

          <Button className="primary-btn" onClick={() => setOpen(true)}>
            Iniciar sesión
          </Button>
        </motion.div>
      </Box>

      {/* PRESENTACIÓN */}
      <Box className="section light">
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography variant="h4" align="center" gutterBottom>
              Sistema Médico Universitario
            </Typography>

            <Typography align="center" className="text">
              Plataforma desarrollada para optimizar la atención médica universitaria,
              garantizando organización, seguridad y una experiencia de usuario moderna.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* CARACTERÍSTICAS */}
<Box className="section features-wrapper">
  <Container maxWidth="lg">
    <Grid
      container
      spacing={4}
      justifyContent="center"
      alignItems="stretch"
    >
      {[
        {
          titulo: 'Gestión de citas',
          descripcion:
            'Permite a los estudiantes registrar, consultar y gestionar sus citas médicas de manera ordenada y eficiente.'
        },
        {
          titulo: 'Control de horarios',
          descripcion:
            'Los médicos pueden definir horarios de atención y disponibilidad, garantizando una correcta organización.'
        },
        {
          titulo: 'Roles del sistema',
          descripcion:
            'El sistema cuenta con roles diferenciados para administradores, médicos y pacientes.'
        },
        {
          titulo: 'Bloqueo de fechas',
          descripcion:
            'Los administradores pueden bloquear fechas no disponibles para evitar la asignación de citas.'
        },
        {
          titulo: 'Seguridad',
          descripcion:
            'Autenticación segura mediante JWT y control de acceso basado en roles.'
        },
        {
          titulo: 'Interfaz intuitiva',
          descripcion:
            'Diseño moderno y amigable que facilita el uso del sistema en cualquier dispositivo.'
        }
      ].map((item, index) => (
        <Grid item xs={12} sm={10} md={4} key={index}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: false, amount: 0.3 }}
            style={{ height: '100%' }}
          >
            <Card className="feature-card">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {item.titulo}
                </Typography>

                <Typography className="card-text">
                  {item.descripcion}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  </Container>
</Box>


      {/* CTA */}
      <Box className="section cta">
        <Container maxWidth="sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography variant="h4" align="center" gutterBottom>
              Accede al sistema
            </Typography>

            <Typography align="center" className="text light-text">
              Inicia sesión y gestiona tus citas médicas de manera rápida y segura.
            </Typography>

            <Box textAlign="center" mt={4}>
              <Button className="primary-btn" onClick={() => setOpen(true)}>
                Comenzar ahora
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* FOOTER */}
      <Box className="footer">
        © 2026 Universidad Nacional Micaela Bastidas de Apurímac – Proyecto Académico
      </Box>

      <LoginModal open={open} onClose={() => setOpen(false)} />
    </Box>
  );
}
