import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom'; const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
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
                    <input type="email" name="email" autoComplete="username" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required style={styles.input} />
                    
                    <div style={styles.passwordWrapper}>
                        <input type="password" name="password" autoComplete="current-password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required style={styles.input} />
                      
                        <div style={styles.forgotContainer}>
                            <Link to="/forgot-password" style={styles.forgotLink}>Forgot Password?</Link>
                        </div>
                    </div>

                    <button type="submit" style={styles.button}>Login</button>
                </form>
                <p style={styles.footerText}>New here? <a href="/signup" style={styles.link}>Create Account</a></p>
            </div>
        </div>
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