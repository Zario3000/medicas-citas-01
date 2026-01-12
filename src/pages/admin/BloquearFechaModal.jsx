import {
  Modal,
  Box,
  TextField,
  Button,
  Typography
} from '@mui/material';
import { useState } from 'react';
import api from '../../api/axios';

export default function BloquearFechaModal({
  open,
  onClose,
  medico,
  onBlocked
}) {
  const [fecha, setFecha] = useState('');
  const [motivo, setMotivo] = useState('');

  const handleSubmit = async () => {
    try {
      await api.post(`/admin/medicos/${medico.id}/bloqueos`, {
        fecha,
        motivo
      });

      alert('Fecha bloqueada correctamente');
      onClose();
      onBlocked();
    } catch (error) {
      alert('Error al bloquear fecha');
      console.error(error);
    }
  };

  if (!medico) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          p: 4,
          bgcolor: 'white',
          width: 380,
          mx: 'auto',
          mt: '10%',
          borderRadius: 2
        }}
      >
        <Typography variant="h6" gutterBottom>
          Bloquear fecha — {medico.nombre}
        </Typography>

        <TextField
          type="date"
          label="Fecha"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={fecha}
          onChange={e => setFecha(e.target.value)}
        />

        <TextField
          label="Motivo"
          fullWidth
          margin="normal"
          value={motivo}
          onChange={e => setMotivo(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit}
          disabled={!fecha || !motivo}
        >
          Bloquear fecha
        </Button>
      </Box>
    </Modal>
  );
}
