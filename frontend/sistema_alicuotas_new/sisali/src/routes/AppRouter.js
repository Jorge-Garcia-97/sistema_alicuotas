import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RoutesApp } from './RoutesApp';
import { MainPropietario } from '../components/propietarios/MainPropietario';
import { MainAlicuotas } from '../components/alicuotas/MainAlicuotas';
import { MainReservaciones } from '../components/reservaciones/MainReservaciones';
import { MainSolicitudes } from '../components/solicitudes/MainSolicitudes';
import { MainAreas } from '../components/areas-comunales/MainAreas';

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoutesApp />}>
          <Route path="/propietarios" element={<MainPropietario />} />
          <Route path="/areas" element={<MainAreas />} />
          <Route path="/alicuotas" element={<MainAlicuotas />} />
          <Route path="/reservaciones" element={<MainReservaciones />} />
          <Route path="/solicitudes" element={<MainSolicitudes />} />          
        </Route>
      </Routes>
    </Router>
  );
};
