import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Store from './pages/store/Store';
import OrderSumary from './pages/store/OrderSumary';
import BaseLayout from './layout/BaseLayout';
import Login from './pages/Login';
import Profile from './pages/Profile';
import PrivateRoutes from './router/PrivateRoutes';
import { useState } from 'react';

function App() {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <Router>
      <Routes>
        <Route element={<BaseLayout setOpenDrawer={setOpenDrawer}/>}>
          <Route
            path="/"
            element={
              <Store setOpenDrawer={setOpenDrawer} openDrawer={openDrawer} />
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoutes path="/profile">
                <Profile />
              </PrivateRoutes>
            }
          />
          <Route path="/billing/resume" element={<OrderSumary />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
