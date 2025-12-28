import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ForgotPass = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [otpSent, setOtpSent] = useState(false); 
    
    // LIVE URL Update
    const API_URL = "https://mini-udemy-backend-production-65d8.up.railway.app";

    const handleSendOTP = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_URL}/api/auth/forgot-password`, { email });
            toast.success(res.data.message);
            setOtpSent(true); 
        } catch (err) {
            toast.error(err.response?.data?.message || "Check the email!");
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_URL}/api/auth/reset-password`, { email, otp, newPassword });
            toast.success(res.data.message);
            setTimeout(() => window.location.href = "/login", 2000);
        } catch (err) {
            toast.error(err.response?.data?.message || "OTP is Invalid or Expired!");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.glassCard}>
                <h2 style={styles.title}>{otpSent ? "Reset Password 🔐" : "Forgot Password? 🔑"}</h2>
                {!otpSent ? (
                    <form onSubmit={handleSendOTP}>
                        <p style={styles.subtitle}>Enter your registered email address; we will send you an OTP.</p>
                        <input type="email" placeholder="Enter Email" style={styles.input} onChange={(e) => setEmail(e.target.value)} required />
                        <button type="submit" style={styles.btn}>Send OTP</button>
                    </form>
                ) : (
                    <form onSubmit={handleResetPassword}>
                        <p style={styles.subtitle}>Enter the 6-digit OTP sent to your email.</p>
                        <input type="text" placeholder="6-Digit OTP" style={styles.input} onChange={(e) => setOtp(e.target.value)} required />
                        <input type="password" placeholder="Set New Password" style={styles.input} onChange={(e) => setNewPassword(e.target.value)} required />
                        <button type="submit" style={styles.btn}>Update Password</button>
                    </form>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: { height: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
    glassCard: { background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', padding: '40px 30px', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.1)', textAlign: 'center', width: '100%', maxWidth: '400px' },
    title: { color: '#fff', marginBottom: '10px', fontSize: '1.5rem' },
    subtitle: { color: '#94a3b8', marginBottom: '25px', fontSize: '0.85rem' },
    input: { width: '100%', padding: '14px', borderRadius: '12px', border: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff', marginBottom: '15px', boxSizing: 'border-box', outline: 'none' },
    btn: { width: '100%', padding: '14px', borderRadius: '12px', background: '#4f46e5', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }
};

export default ForgotPass;