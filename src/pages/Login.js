import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    
    const API_URL = "https://mini-udemy-backend-production-65d8.up.railway.app";

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
            if (res.data.token) {
                localStorage.setItem('token', res.data.token); 
                localStorage.setItem('user', JSON.stringify(res.data.user));
                toast.success("Login Successful!");
                
                if (res.data.user.role === 'instructor') {
                    navigate('/'); 
                } else {
                    navigate('/'); 
                }
                window.location.reload(); 
            }
        } catch (err) { 
            toast.error(err.response?.data?.message || "Login Failed"); 
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Welcome Back</h2>
                <form onSubmit={handleLogin} style={styles.form}>
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        autoComplete="email" 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        style={styles.input} 
                    />
                    <div style={styles.passwordWrapper}>
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Password" 
                            autoComplete="current-password" 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            style={styles.input} 
                        />
                        <button 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)} 
                            style={styles.showBtn}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <Link to="/forgot-password" style={styles.forgotLink}>Forgot Password?</Link>
                    </div>
                    <button type="submit" style={styles.button}>Login to Dashboard</button>
                </form>
                <p style={styles.footerText}>New to Mini Udemy? <Link to="/signup" style={styles.link}>Create Account</Link></p>
            </div>
        </div>
    );
};

const styles = {
    container: { minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f8fafc', padding: '20px' },
    card: { width: '100%', maxWidth: '400px', padding: '40px 25px', background: '#fff', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', textAlign: 'center' },
    title: { fontSize: '1.8rem', fontWeight: '800', marginBottom: '25px', color: '#1e293b' },
    form: { display: 'flex', flexDirection: 'column', gap: '15px' },
    input: { padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '1rem', width: '100%', boxSizing: 'border-box', outline: 'none' },
    passwordWrapper: { position: 'relative', width: '100%' },
    showBtn: { position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', color: '#6366f1', cursor: 'pointer', fontWeight: '600', fontSize: '0.8rem' },
    forgotLink: { color: '#6366f1', fontSize: '0.85rem', fontWeight: '600', textDecoration: 'none' },
    button: { padding: '14px', borderRadius: '10px', border: 'none', background: '#6366f1', color: '#fff', fontWeight: '700', cursor: 'pointer', fontSize: '1rem', marginTop: '10px' },
    footerText: { marginTop: '20px', fontSize: '0.9rem', color: '#64748b' },
    link: { color: '#6366f1', fontWeight: '700', textDecoration: 'none' }
};

export default Login;