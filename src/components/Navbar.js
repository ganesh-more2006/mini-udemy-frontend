import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation(); 
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        setUser(userData);
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    return (
        <nav style={styles.nav}>
            <div style={styles.logoContainer} onClick={() => navigate('/')}>
                <h2 style={styles.logo}>Mini <span style={styles.logoHighlight}>Udemy</span></h2>
            </div>

            <div style={styles.navLinks}>
                <Link to="/" style={styles.link}>Home</Link>

                {/* ✅ FIXED: My Courses link with correct style */}
                {user && user.role === 'student' && (
                    <Link to="/my-courses" style={styles.link}>My Courses</Link>
                )}

                {user && user.role === 'instructor' && (
                    <Link to="/add-course" style={styles.addCourseBtn}>
                        + Add Course
                    </Link>
                )}

                {user ? (
                    <div style={styles.userSection}>
                        <div style={styles.avatar}>
                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <span style={styles.userName}>Hi, {user.name ? user.name.split(' ')[0] : 'User'}</span>
                        <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
                    </div>
                ) : (
                    <div style={styles.authLinks}>
                        <Link to="/login" style={styles.link}>Login</Link>
                        <Link to="/signup" style={styles.signUpBtn}>Sign Up</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0 8%', height: '80px', background: '#ffffff',
        position: 'relative', zIndex: 1000, borderBottom: '1px solid #eee'
    },
    logoContainer: { cursor: 'pointer' },
    logo: { fontSize: '1.6rem', fontWeight: '900', color: '#1f2937', margin: 0 },
    logoHighlight: { color: '#6366f1' },
    navLinks: { display: 'flex', alignItems: 'center', gap: '30px' }, 
    link: { color: '#4b5563', textDecoration: 'none', fontWeight: '600', fontSize: '1rem', transition: '0.3s' },
    authLinks: { display: 'flex', alignItems: 'center', gap: '20px' }, 
    addCourseBtn: { background: '#f3f4f6', color: '#1f2937', textDecoration: 'none', fontWeight: '700', padding: '10px 20px', borderRadius: '12px' },
    signUpBtn: { background: '#6366f1', color: '#fff', textDecoration: 'none', fontWeight: '700', padding: '12px 25px', borderRadius: '12px' },
    userSection: { display: 'flex', alignItems: 'center', gap: '15px', borderLeft: '2px solid #eee', paddingLeft: '20px' },
    avatar: { width: '35px', height: '35px', background: '#6366f1', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' },
    userName: { color: '#1f2937', fontWeight: '700' },
    logoutBtn: { background: '#fee2e2', color: '#ef4444', border: 'none', padding: '8px 15px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }
};

export default Navbar;