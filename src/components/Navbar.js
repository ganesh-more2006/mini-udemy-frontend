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
              
                <Link to="/" style={styles.link} className="nav-hide-mobile">Home</Link>

                {user && user.role === 'student' && (
                    <Link to="/my-courses" style={styles.link}>Courses</Link>
                )}

                {user && user.role === 'instructor' && (
                    <Link to="/add-course" style={styles.addCourseBtn}>
                        <span style={styles.plusIcon}>+</span> Course
                    </Link>
                )}

                {user ? (
                    <div style={styles.userSection}>
                        <div style={styles.avatar}>
                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                      
                        <span style={styles.userName} className="nav-hide-mobile">
                            Hi, {user.name ? user.name.split(' ')[0] : 'User'}
                        </span>
                        <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
                    </div>
                ) : (
                    <div style={styles.authLinks}>
                        <Link to="/login" style={styles.link}>Login</Link>
                        <Link to="/signup" style={styles.signUpBtn}>Join</Link>
                    </div>
                )}
            </div>
            
            <style>
                {`
                    @media (max-width: 600px) {
                        .nav-hide-mobile { display: none !important; }
                    }
                `}
            </style>
        </nav>
    );
};

const styles = {
    nav: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0 5%', height: '70px', background: '#ffffff',
        position: 'sticky', top: 0, zIndex: 1000, borderBottom: '1px solid #eee',
        boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
    },
    logoContainer: { cursor: 'pointer' },
    logo: { fontSize: '1.3rem', fontWeight: '900', color: '#1f2937', margin: 0 },
    logoHighlight: { color: '#6366f1' },
    navLinks: { display: 'flex', alignItems: 'center', gap: '15px' }, 
    link: { color: '#4b5563', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' },
    authLinks: { display: 'flex', alignItems: 'center', gap: '10px' }, 
    addCourseBtn: { background: '#f3f4f6', color: '#1f2937', textDecoration: 'none', fontWeight: '700', padding: '8px 15px', borderRadius: '10px', fontSize: '0.85rem' },
    plusIcon: { marginRight: '4px' },
    signUpBtn: { background: '#6366f1', color: '#fff', textDecoration: 'none', fontWeight: '700', padding: '8px 15px', borderRadius: '10px', fontSize: '0.85rem' },
    userSection: { display: 'flex', alignItems: 'center', gap: '10px' },
    avatar: { width: '30px', height: '30px', background: '#6366f1', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.8rem' },
    userName: { color: '#1f2937', fontWeight: '700', fontSize: '0.9rem' },
    logoutBtn: { background: '#fee2e2', color: '#ef4444', border: 'none', padding: '6px 12px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.8rem' }
};

export default Navbar;