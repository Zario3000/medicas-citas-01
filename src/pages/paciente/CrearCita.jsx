import { useEffect, useState } from 'react';
import api from '../../api/axios';
import {
  Button,
  TextField,
  MenuItem,
  Grid,
  Typography,
  Alert
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/crearCita.css';

export default function CrearCita({ onCitaCreada }) {
  const [especialidades, setEspecialidades] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [bloqueos, setBloqueos] = useState([]);
  const [mensaje, setMensaje] = useState(null);

  const [form, setForm] = useState({
    especialidad_id: '',
    medico_id: '',
    fecha: '',
    hora: ''
  });

  /* =====================
     CARGAR ESPECIALIDADES
  ===================== */
  useEffect(() => {
    api.get('/especialidades').then(res => setEspecialidades(res.data));
  }, []);

  /* =====================
     CARGAR MÉDICOS
  ===================== */
  useEffect(() => {
    if (!form.especialidad_id) {
      setMedicos([]);
      setForm(prev => ({ ...prev, medico_id: '' }));
      return;
    }

    api.get(`/medicos?especialidad_id=${form.especialidad_id}`)
      .then(res => setMedicos(res.data));
  }, [form.especialidad_id]);

  /* =====================
     CARGAR BLOQUEOS
  ===================== */
  const cargarBloqueos = async (medicoId) => {
    if (!medicoId) return;
    const res = await api.get(`/paciente/bloqueos/${medicoId}`);
    setBloqueos(res.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm(prev => ({ ...prev, [name]: value }));

    if (name === 'medico_id') {
      cargarBloqueos(value);
    }
  };

  /* =====================
     VALIDAR FECHA BLOQUEADA
  ===================== */
  const esFechaBloqueada = (fecha) => {
    return bloqueos.some(
      b => b.fecha === fecha && !b.hora_inicio && !b.hora_fin
    );
  };

  /* =====================
     ENVIAR FORMULARIO
  ===================== */
  const handleSubmit = async () => {
    try {
      await api.post('/paciente/citas', form);

      setMensaje({ type: 'success', text: 'Cita creada correctamente' });

      setForm({
        especialidad_id: '',
        medico_id: '',
        fecha: '',
        hora: ''
      });

      setMedicos([]);
      onCitaCreada();

      setTimeout(() => setMensaje(null), 3000);
    } catch (error) {
      setMensaje({
        type: 'error',
        text: error.response?.data?.message || 'Error al crear cita'
      });
    }
  };

  const HORAS = [
    '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '14:00', '15:00', '16:00', '17:00'
  ];

  return (
    <div className="crear-cita-container">
      <Typography className="crear-cita-title">
        Crear nueva cita
      </Typography>

      {/* MENSAJE */}
      <AnimatePresence>
        {mensaje && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Alert severity={mensaje.type} sx={{ mb: 2 }}>
              {mensaje.text}
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <Grid container spacing={2}>
        {/* ESPECIALIDAD */}
        <Grid item xs={12} md={6}>
          <TextField
            select
            label="Elegir especialidad"
            name="especialidad_id"
            value={form.especialidad_id}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ className: 'input-label' }}
          >
            <MenuItem value="">Seleccione</MenuItem>
            {especialidades.map(e => (
              <MenuItem key={e.id} value={e.id}>{e.nombre}</MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* MÉDICO */}
        <Grid item xs={12} md={6}>
          <TextField
            select
            label="Elegir médico"
            name="medico_id"
            value={form.medico_id}
            onChange={handleChange}
            fullWidth
            disabled={!form.especialidad_id}
            InputLabelProps={{ className: 'input-label' }}
          >
            <MenuItem value="">Seleccione</MenuItem>
            {medicos.map(m => (
              <MenuItem key={m.id} value={m.id}>{m.nombre}</MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* FECHA */}
        <Grid item xs={12} md={6}>
          <TextField
            type="date"
            label="Elegir fecha"
            name="fecha"
            value={form.fecha}
            onChange={(e) => {
              if (esFechaBloqueada(e.target.value)) {
                setMensaje({
                  type: 'error',
                  text: 'La fecha seleccionada está bloqueada'
                });
                return;
              }
              handleChange(e);
            }}
            InputLabelProps={{ shrink: true, className: 'input-label' }}
            fullWidth
          />
        </Grid>

        {/* HORA */}
        <Grid item xs={12} md={6}>
          <TextField
            select
            label="Elegir hora"
            name="hora"
            value={form.hora}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ className: 'input-label' }}
          >
            <MenuItem value="">Seleccione</MenuItem>
            {HORAS.map(h => (
              <MenuItem key={h} value={h}>{h}</MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* LISTA DE FECHAS BLOQUEADAS */}
        {bloqueos.length > 0 && (
          <Grid item xs={12}>
            <div className="fechas-bloqueadas">
              <strong>Fechas bloqueadas por el médico:</strong>
              <ul>
                {bloqueos
                  .filter(b => !b.hora_inicio && !b.hora_fin)
                  .map(b => (
                    <li key={b.fecha}>{b.fecha}</li>
                  ))}
              </ul>
            </div>
          </Grid>
        )}

        {/* BOTÓN */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={
              !form.especialidad_id ||
              !form.medico_id ||
              !form.fecha ||
              !form.hora
            }
          >
            Crear cita
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
