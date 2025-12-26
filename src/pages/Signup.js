import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'student' });
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', formData);
            toast.success("Success! Please Login.");
            navigate('/login');
        } catch (err) { toast.error(err.response?.data?.message || "Error"); }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Sign Up</h2>
                <form onSubmit={handleSignup} style={styles.form}>
                    <input type="text" placeholder="Full Name" onChange={(e) => setFormData({...formData, name: e.target.value})} required style={styles.input} />
                    <input type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} required style={styles.input} />
                    <input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} required style={styles.input} />
                    <select onChange={(e) => setFormData({...formData, role: e.target.value})} style={styles.input}>
                        <option value="student">Student</option>
                        <option value="instructor">Instructor</option>
                    </select>
                    <button type="submit" style={styles.button}>Create Account</button>
                </form>
                <p style={styles.footerText}>Joined already? <a href="/login" style={styles.link}>Login</a></p>
            </div>
        </div>
    );
};

const styles = {
    container: { height: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f7fa' },
    card: { width: '100%', maxWidth: '420px', padding: '50px 40px', background: '#fff', borderRadius: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', textAlign: 'center' },
    title: { fontSize: '2rem', fontWeight: '800', marginBottom: '30px' },
    form: { display: 'flex', flexDirection: 'column', gap: '25px' }, // 👈 Spacing fix
    input: { padding: '16px', borderRadius: '12px', border: '1px solid #ddd', fontSize: '1rem' },
    button: { padding: '16px', borderRadius: '12px', border: 'none', background: '#6366f1', color: '#fff', fontWeight: '700', cursor: 'pointer', marginTop: '10px' },
    footerText: { marginTop: '20px' },
    link: { color: '#6366f1', fontWeight: '700', textDecoration: 'none' }
};

export default Signup;