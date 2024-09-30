import './bootstrap';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PrivateRoute from '@/components/PrivateRoute'

import Login from '@/Pages/Auth/Login';
import Dashboard from '@/Pages/Admin/Dashboard';
import Users from '@/Pages/Admin/User/Users';
import User from '@/Pages/Admin/User/User';
import Signup from '@/Pages/Auth/Signup';
import Logout from '@/Pages/Auth/Logout';
import Example from '@/components/Example';

const rootElement = document.getElementById('app');

// Ensure the element is not `null` for type safety
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <Router>
            <Routes>
                <Route path="/" element={<Example />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/users" element={<Users />} />
                <Route path="/user/:id" element={<User />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="*" element={<h1>404 Not found</h1>} />
            </Routes>
        </Router>
    );
}
