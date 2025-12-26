import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'student' });
    const navigate = useNavigate();
    const API_URL = "https://mini-udemy-backend-production-855e.up.railway.app";

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/api/auth/register`, formData);
            toast.success("Success! Please Login.");
            navigate('/login');
        } catch (err) { 
            toast.error(err.response?.data?.message || "Error"); 
        }
    };

    return (
        
        <div>...</div>
    );
};

const styles = {
    container: { height: '85vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f7fa' },
    card: { width: '100%', maxWidth: '420px', padding: '50px 40px', background: '#fff', borderRadius: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', textAlign: 'center' },
    title: { fontSize: '2rem', fontWeight: '800', marginBottom: '30px' },
    form: { display: 'flex', flexDirection: 'column', gap: '20px' }, 
    passwordWrapper: { display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'right' },
    input: { padding: '16px', borderRadius: '12px', border: '1px solid #ddd', fontSize: '1rem', width: '100%', boxSizing: 'border-box' },
    forgotContainer: { textAlign: 'right' },
    forgotLink: { color: '#6366f1', fontSize: '0.85rem', fontWeight: '600', textDecoration: 'none' },
    button: { padding: '16px', borderRadius: '12px', border: 'none', background: '#6366f1', color: '#fff', fontWeight: '700', cursor: 'pointer', marginTop: '10px' },
    footerText: { marginTop: '20px' },
    link: { color: '#6366f1', fontWeight: '700', textDecoration: 'none' }
};

export default Login;