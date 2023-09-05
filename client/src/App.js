import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Button } from 'antd';
import Register from './pages/Register';

import Login from './pages/Login';
import React, { useState } from 'react';
import Home from './pages/Home';
import { ValidateUser } from './apiIntegration.js/users';
import UserValidation from './components/UserValidation';
import UserProfile from './pages/UserProfile/Profile';
import { useSelector } from 'react-redux';
import Admin from './pages/UserProfile/Admin';
import ProductDetailsPage from './pages/ProductInformation/ProductDetailsPage';
import Search from './pages/SearchFilter';
import CartPage from './pages/CartPage';
import PaymentPage from './pages/PaymentPage';
import ChatPage from './pages/Home/ChatPage';

import OrdersPlaced from './pages/UserProfile/OrdersPlaced';
function App() {
  const loading = useSelector(state => state.loaders);
  const [user, setUser] = useState(undefined);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<UserValidation><Home /></UserValidation>} />
          <Route path='/product/:id' element={<UserValidation><ProductDetailsPage /></UserValidation>} />
          <Route path='/profile' element={<UserValidation><UserProfile /></UserValidation>} />
          <Route path='/search' element={<UserValidation><Search /></UserValidation>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/admin' element={<UserValidation><Admin /></UserValidation>} />
          <Route path='/cart' element={<UserValidation><CartPage /></UserValidation>} />
          <Route path="/payment-success" element={<UserValidation><PaymentPage /></UserValidation>} />
          {/* <Route
            path="/chat"
            element={user ? <ChatPage user={user} /> : <AuthPage onAuth={setUser} />}

          /> */}
          <Route
                path="/chat"
                element={ <UserValidation><ChatPage /></UserValidation>}
            />
        </Routes>

      </BrowserRouter>


    </div>
  );
}

export default App;