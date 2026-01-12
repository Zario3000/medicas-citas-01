import {
  Modal,
  TextField,
  Button,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import api from '../../api/axios';
import '../../styles/modal.css';

export default function EditarPacienteModal({
  open,
  onClose,
  paciente,
  onUpdated
}) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');

  // 🔹 Cargar datos del paciente seleccionado
  useEffect(() => {
    if (paciente) {
      setNombre(paciente.nombre || '');
      setEmail(paciente.email || '');
    }
  }, [paciente]);

  const handleSubmit = async () => {
    try {
      await api.put(`/admin/usuarios/${paciente.id}`, {
        nombre,
        email
      });

      alert('Paciente actualizado correctamente');
      onClose();
      onUpdated();
    } catch (error) {
      alert('Error al actualizar paciente');
      console.error(error);
    }
  };

  // ⚠️ No renderizar si no hay paciente
  if (!paciente) return null;

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
            Editar paciente
          </Typography>

          <TextField
            label="Nombre"
            fullWidth
            margin="normal"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />

          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <Button
            fullWidth
            className="custom-modal-btn"
            onClick={handleSubmit}
          >
            Guardar cambios
          </Button>
        </div>
      </div>
    </Modal>
  );
}
