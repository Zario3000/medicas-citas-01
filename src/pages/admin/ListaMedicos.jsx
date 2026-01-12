import { useEffect, useState } from 'react';
import api from '../../api/axios';
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Button
} from '@mui/material';
import CrearMedicoModal from './CrearMedicoModal';
import EditarMedicoModal from './EditarMedicoModal';
import AsignarHorarioModal from './AsignarHorarioModal';
import BloquearFechaModal from './BloquearFechaModal';


export default function ListaMedicos() {
  const [medicos, setMedicos] = useState([]);
  const [open, setOpen] = useState(false);
  
const [selectedMedico, setSelectedMedico] = useState(null);
const [openEdit, setOpenEdit] = useState(false);
const [openHorario, setOpenHorario] = useState(false);
const [openBloqueo, setOpenBloqueo] = useState(false);

  const fetchMedicos = async () => {
    try {
      const res = await api.get('/admin/medicos');
      setMedicos(res.data);
    } catch (error) {
      console.error('Error al cargar médicos', error);
    }
  };

  useEffect(() => {
    fetchMedicos();
  }, []);

  return (
    <>
      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => setOpen(true)}
      >
        Registrar médico
      </Button>

      <Grid container spacing={2}>
        {medicos.map(medico => (
          <Grid item xs={12} md={4} key={medico.id}>
            <Card>
              <CardContent>
  <Typography variant="h6">{medico.nombre}</Typography>
  <Typography>Especialidad: {medico.especialidad}</Typography>
  <Typography>Email: {medico.email}</Typography>

  <Button
    size="small"
    onClick={() => {
      setSelectedMedico(medico);
      setOpenEdit(true);
    }}
  >
    Editar
  </Button>

  <Button
  size="small"
  color="error"
  onClick={async () => {
    if (confirm('¿Eliminar médico?')) {
      try {
        await api.delete(`/admin/medicos/${medico.id}`);
        fetchMedicos();
        alert('Médico eliminado correctamente');
      } catch (error) {
        alert(
          error.response?.data?.message ||
          'No se puede eliminar el médico porque tiene citas registradas'
        );
      }
    }
  }}
>
  Eliminar
</Button>
<Button
  size="small"
  onClick={() => {
    setSelectedMedico(medico);
    setOpenHorario(true);
  }}
>
  Asignar horario
</Button>
<Button
  size="small"
  color="warning"
  onClick={() => {
    setSelectedMedico(medico);
    setOpenBloqueo(true);
  }}
>
  Bloquear fecha
</Button>

</CardContent>

            </Card>
          </Grid>
        ))}
      </Grid>

      <CrearMedicoModal
        open={open}
        onClose={() => setOpen(false)}
        onCreated={fetchMedicos}
      />
      <EditarMedicoModal
  open={openEdit}
  onClose={() => setOpenEdit(false)}
  medico={selectedMedico}
  onUpdated={fetchMedicos}
/>
<AsignarHorarioModal
  open={openHorario}
  onClose={() => setOpenHorario(false)}
  medico={selectedMedico}
  onAssigned={fetchMedicos}
/>

<BloquearFechaModal
  open={openBloqueo}
  onClose={() => setOpenBloqueo(false)}
  medico={selectedMedico}
  onBlocked={fetchMedicos}
/>

    </>
  );
}
