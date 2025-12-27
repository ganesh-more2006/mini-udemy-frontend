import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
const API_URL = "https://mini-udemy-backend-production-65d8.up.railway.app";

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
            if (res.data.token) {
                localStorage.setItem('token', res.data.token); 
                localStorage.setItem('user', JSON.stringify(res.data.user));
                toast.success("Login Successful!");
                window.location.href = "/"; 
            }
        } catch (err) { 
            toast.error(err.response?.data?.message || "Login Failed"); 
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Login</h2>
                <form onSubmit={handleLogin} style={styles.form}>
                    <input type="email" placeholder="Email" autoComplete="email" onChange={(e) => setEmail(e.target.value)} required style={styles.input} />
                    <div style={styles.passwordWrapper}>
                        <input type={showPassword ? "text" : "password"} placeholder="Password" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} required style={styles.input} />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} style={styles.showBtn}>{showPassword ? "Hide" : "Show"}</button>
                    </div>
                    <div style={{ textAlign: 'right' }}><Link to="/forgot-password" style={styles.forgotLink}>Forgot Password?</Link></div>
                    <button type="submit" style={styles.button}>Login</button>
                </form>
                <p style={styles.footerText}>New here? <Link to="/signup" style={styles.link}>Create Account</Link></p>
            </div>
        </div>
    );
};

const styles = {
    container: { height: '85vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f7fa' },
    card: { width: '100%', maxWidth: '420px', padding: '50px 40px', background: '#fff', borderRadius: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', textAlign: 'center' },
    title: { fontSize: '2rem', fontWeight: '800', marginBottom: '30px' },
    form: { display: 'flex', flexDirection: 'column', gap: '20px' },
    input: { padding: '16px', borderRadius: '12px', border: '1px solid #ddd', fontSize: '1rem', width: '100%', boxSizing: 'border-box' },
    passwordWrapper: { position: 'relative', width: '100%' },
    showBtn: { position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', color: '#6366f1', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem' },
    forgotLink: { color: '#6366f1', fontSize: '0.85rem', fontWeight: '600', textDecoration: 'none' },
    button: { padding: '16px', borderRadius: '12px', border: 'none', background: '#6366f1', color: '#fff', fontWeight: '700', cursor: 'pointer' },
    footerText: { marginTop: '20px' },
    link: { color: '#6366f1', fontWeight: '700', textDecoration: 'none' }
};

export default Login;