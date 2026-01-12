import { useState } from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function LoginModal({ open, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

 const handleSubmit = async () => {
  try {
    console.log('EMAIL:', email);
    console.log('PASSWORD:', password);

    const usuario = await login(email, password);
    console.log('USUARIO DEVUELTO:', usuario);

    onClose();

    if (usuario.rol === 'PACIENTE') navigate('/paciente');
    if (usuario.rol === 'MEDICO') navigate('/medico');
    if (usuario.rol === 'ADMIN') navigate('/admin');

  } catch (error) {
    console.error('ERROR LOGIN FRONTEND:', error);
    alert('Credenciales incorrectas');
  }
};


  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          p: 4,
          bgcolor: 'white',
          width: 320,
          mx: 'auto',
          mt: '15%',
          borderRadius: 2
        }}
      >
        <Typography variant="h6" mb={2}>
          Iniciar sesión
        </Typography>

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Entrar
        </Button>
      </Box>
    </Modal>
  );
}

