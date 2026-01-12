import {
  Modal,
  TextField,
  Button,
  Typography,
  MenuItem
} from '@mui/material';
import { useEffect, useState } from 'react';
import api from '../../api/axios';
import '../../styles/modal.css';

export default function EditarMedicoModal({
  open,
  onClose,
  medico,
  onUpdated
}) {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [especialidadId, setEspecialidadId] = useState('');
  const [especialidades, setEspecialidades] = useState([]);

  useEffect(() => {
    api.get('/especialidades').then(res => setEspecialidades(res.data));
  }, []);

  useEffect(() => {
    if (medico) {
      setNombre(medico.nombre || '');
      setTelefono(medico.telefono || '');
      setEspecialidadId(medico.especialidad_id || '');
    }
  }, [medico]);

  const handleSubmit = async () => {
    try {
      await api.put(`/admin/medicos/${medico.id}`, {
        nombre,
        telefono,
        especialidad_id: especialidadId
      });
      onClose();
      onUpdated();
    } catch (error) {
      alert('Error al actualizar médico');
    }
  };

  if (!medico) return null;

  return (
    <Modal open={open} onClose={onClose}>
      {/* OVERLAY – click aquí CIERRA el modal */}
      <div
        className="custom-modal-overlay"
        onClick={onClose}
      >
        {/* MODAL – click aquí NO cierra */}
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
            Editar médico
          </Typography>

          <TextField
            label="Nombre"
            fullWidth
            margin="normal"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />

          <TextField
            label="Teléfono"
            fullWidth
            margin="normal"
            value={telefono}
            onChange={e => setTelefono(e.target.value)}
          />

          <TextField
            select
            label="Especialidad"
            fullWidth
            margin="normal"
            value={especialidadId}
            onChange={e => setEspecialidadId(e.target.value)}
          >
            {especialidades.map(e => (
              <MenuItem key={e.id} value={e.id}>
                {e.nombre}
              </MenuItem>
            ))}
          </TextField>

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
