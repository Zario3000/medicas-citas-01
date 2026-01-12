import {
  Modal,
  TextField,
  Button,
  Typography,
  MenuItem
} from '@mui/material';
import { useState } from 'react';
import api from '../../api/axios';
import '../../styles/modal.css';

const dias = [
  { value: 1, label: 'Lunes' },
  { value: 2, label: 'Martes' },
  { value: 3, label: 'Miércoles' },
  { value: 4, label: 'Jueves' },
  { value: 5, label: 'Viernes' },
  { value: 6, label: 'Sábado' }
];

export default function AsignarHorarioModal({
  open,
  onClose,
  medico,
  onAssigned
}) {
  const [dia, setDia] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');

  const handleSubmit = async () => {
    try {
      await api.post('/admin/horarios', {
        medico_id: medico.id,
        dia_semana: dia,
        hora_inicio: horaInicio,
        hora_fin: horaFin
      });

      alert('Horario asignado correctamente');
      onClose();
      onAssigned();
    } catch (error) {
      alert('Error al asignar horario');
      console.error(error);
    }
  };

  if (!medico) return null;

  return (
    <Modal open={open} onClose={onClose}>
      {/* OVERLAY – click fuera CIERRA */}
      <div
        className="custom-modal-overlay"
        onClick={onClose}
      >
        {/* MODAL – click dentro NO CIERRA */}
        <div
          className="custom-modal app-layout-style"
          onClick={(e) => e.stopPropagation()}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              textAlign: 'center',
              mb: 2
            }}
          >
            Asignar horario a {medico.nombre}
          </Typography>

          <TextField
            select
            label="Día"
            fullWidth
            margin="normal"
            value={dia}
            onChange={e => setDia(e.target.value)}
          >
            {dias.map(d => (
              <MenuItem key={d.value} value={d.value}>
                {d.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            type="time"
            label="Hora inicio"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={horaInicio}
            onChange={e => setHoraInicio(e.target.value)}
          />

          <TextField
            type="time"
            label="Hora fin"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={horaFin}
            onChange={e => setHoraFin(e.target.value)}
          />

          <Button
            fullWidth
            className="custom-modal-btn"
            onClick={handleSubmit}
          >
            Guardar horario
          </Button>
        </div>
      </div>
    </Modal>
  );
}
