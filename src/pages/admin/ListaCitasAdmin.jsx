import { useEffect, useState } from 'react';
import api from '../../api/axios';
import {
  Typography,
  Card,
  CardContent,
  Grid
} from '@mui/material';

export default function ListaCitasAdmin() {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
  const fetchCitas = async () => {
    try {
      const res = await api.get('/admin/citas');
      setCitas(res.data);
      console.log('CITAS ADMIN:', res.data); 
    } catch (error) {
      console.error('Error al cargar citas', error);
    }
  };

  fetchCitas();
}, []);

 if (citas.length === 0) {
    return <Typography>No hay citas registradas</Typography>;
  }
  return (
    <Grid container spacing={2}>
      {citas.map(c => (
        <Grid item xs={12} md={4} key={c.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{c.medico}</Typography>
              <Typography>Paciente: {c.paciente}</Typography>
              <Typography>Fecha: {c.fecha}</Typography>
              <Typography>Hora: {c.hora}</Typography>
              <Typography>Estado: {c.estado}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
