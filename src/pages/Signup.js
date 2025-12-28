import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'student' });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const API_URL = "https://mini-udemy-backend-production-65d8.up.railway.app";

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/api/auth/register`, formData);
            toast.success("Success! Please Login.");
            navigate('/login');
        } catch (err) { 
            toast.error(err.response?.data?.message || "Error during signup"); 
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Sign Up</h2>
                <form onSubmit={handleSignup} style={styles.form}>
                    <input 
                        type="text" 
                        placeholder="Full Name" 
                        autoComplete="name"
                        onChange={(e) => setFormData({...formData, name: e.target.value})} 
                        required style={styles.input} 
                    />
                    <input 
                        type="email" 
                        placeholder="Email" 
                        autoComplete="email"
                        onChange={(e) => setFormData({...formData, email: e.target.value})} 
                        required style={styles.input} 
                    />
                    
                    <div style={styles.passwordWrapper}>
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Password" 
                            autoComplete="new-password"
                            onChange={(e) => setFormData({...formData, password: e.target.value})} 
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

                    <select onChange={(e) => setFormData({...formData, role: e.target.value})} style={styles.input}>
                        <option value="student">Student</option>
                        <option value="instructor">Instructor</option>
                    </select>
                    <button type="submit" style={styles.button}>Create Account</button>
                </form>
                <p style={styles.footerText}>Joined already? <Link to="/login" style={styles.link}>Login</Link></p>
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
    button: { padding: '14px', borderRadius: '10px', border: 'none', background: '#6366f1', color: '#fff', fontWeight: '700', cursor: 'pointer', marginTop: '10px', fontSize: '1rem' },
    footerText: { marginTop: '20px', fontSize: '0.9rem', color: '#64748b' },
    link: { color: '#6366f1', fontWeight: '700', textDecoration: 'none' }
};

export default Signup;