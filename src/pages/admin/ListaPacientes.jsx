import { useEffect, useState } from 'react';
import api from '../../api/axios';
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Button
} from '@mui/material';
import CrearPacienteModal from './CrearPacienteModal';
import EditarPacienteModal from './EditarPacienteModal';

export default function ListaPacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [open, setOpen] = useState(false);

  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  const fetchPacientes = async () => {
    try {
      const res = await api.get('/admin/pacientes');
      setPacientes(res.data);
    } catch (error) {
      console.error('Error al cargar pacientes', error);
    }
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  return (
    <>
      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => setOpen(true)}
      >
        Registrar paciente
      </Button>

      <Grid container spacing={2}>
        {pacientes.map(paciente => (
          <Grid item xs={12} md={4} key={paciente.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{paciente.nombre}</Typography>
                <Typography>Email: {paciente.email}</Typography>

                <Button
                  size="small"
                  onClick={() => {
                    setSelectedPaciente(paciente);
                    setOpenEdit(true);
                  }}
                >
                  Editar
                </Button>

                <Button
                  size="small"
                  color="error"
                  onClick={async () => {
                    if (confirm('¿Eliminar paciente?')) {
                      try {
                        await api.delete(`/admin/usuarios/${paciente.id}`);
                        fetchPacientes();
                      } catch (error) {
                        alert('No se puede eliminar el paciente');
                      }
                    }
                  }}
                >
                  Eliminar
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <CrearPacienteModal
        open={open}
        onClose={() => setOpen(false)}
        onCreated={fetchPacientes}
      />

      <EditarPacienteModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        paciente={selectedPaciente}
        onUpdated={fetchPacientes}
      />
    </>
  );
}
