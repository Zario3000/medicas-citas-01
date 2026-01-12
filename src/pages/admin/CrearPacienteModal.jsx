import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Backdrop,
  Fade
} from '@mui/material';
import { useState } from 'react';
import api from '../../api/axios';

export default function CrearPacienteModal({ open, onClose, onCreated }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('123456');

  const handleSubmit = async () => {
    try {
      await api.post('/admin/pacientes', {
        nombre,
        email,
        password
      });

      onClose();
      onCreated();
    } catch (error) {
      alert('Error al crear paciente');
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300,
        sx: { backgroundColor: 'rgba(0,0,0,0.6)' }
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 380 },
            bgcolor: 'transparent',
            borderRadius: 3,
            outline: 'none'
          }}
        >
          {/* CONTENEDOR */}
          <Box
            sx={{
              p: 4,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #1c2b33, #263238)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
              color: 'white'
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, mb: 2, textAlign: 'center' }}
            >
              Registrar nuevo paciente
            </Typography>

            <TextField
              label="Nombre"
              fullWidth
              margin="normal"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              InputLabelProps={{ style: { color: '#b0bec5' } }}
              InputProps={{
                style: { color: 'white' }
              }}
            />

            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={e => setEmail(e.target.value)}
              InputLabelProps={{ style: { color: '#b0bec5' } }}
              InputProps={{
                style: { color: 'white' }
              }}
            />

            <TextField
              label="Contraseña"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={e => setPassword(e.target.value)}
              InputLabelProps={{ style: { color: '#b0bec5' } }}
              InputProps={{
                style: { color: 'white' }
              }}
            />

            <Button
              fullWidth
              sx={{
                mt: 3,
                py: 1.2,
                borderRadius: 3,
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(135deg, #1565c0, #1e88e5)'
                }
              }}
              onClick={handleSubmit}
            >
              Guardar paciente
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
