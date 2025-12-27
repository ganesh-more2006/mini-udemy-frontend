import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const MyCourses = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); 
    const API_URL = "https://mini-udemy-backend-production-65d8.up.railway.app";

    const courseImages = [
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80",
        "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&q=80",
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80"
    ];

    useEffect(() => {
        const fetchMyCourses = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`${API_URL}/api/enrollments/my-courses`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEnrollments(res.data);
            } catch (err) {
                console.error("Error", err);
                alert("Failed to load your learning dashboard.");
            } finally {
                setLoading(false);
            }
        };
        fetchMyCourses();
    }, []);

    if (loading) return <div style={styles.loader}>Loading...</div>;

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.title}>My Learning Dashboard</h1>
                <p style={styles.subtitle}>Resume your professional journey</p>
            </header>
            
            {enrollments.length === 0 ? (
                <div style={styles.emptyState}>
                    <h3>No courses found.</h3>
                    <button onClick={() => navigate('/')} style={styles.btnStyle}>Start Learning</button>
                </div>
            ) : (
                <div style={styles.grid}>
                    {enrollments.map((item, index) => {
                        if (!item.course) return null; 
                        return (
                            <div key={item._id} style={styles.cardStyle}>
                                <img src={courseImages[index % 3]} alt="Thumbnail" style={styles.thumbnail} />
                                <div style={styles.cardContent}>
                                    <h3 style={styles.courseTitle}>{item.course.title}</h3>
                                    <p style={styles.courseDesc}>{item.course.description.substring(0, 60)}...</p>
                                   
                                    <div style={{marginTop: 'auto'}}>
                                        <button 
                                            onClick={() => navigate(`/course-view/${item.course._id}`)} 
                                            style={styles.btnStyle}
                                        >
                                            Continue Learning
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: { padding: '50px 8%', minHeight: '100vh', background: '#f1f5f9' },
    header: { marginBottom: '50px' },
    title: { color: '#0f172a', fontSize: '2.5rem', fontWeight: '900' },
    subtitle: { color: '#64748b' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' },
    cardStyle: {
        background: '#fff',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column', 
        height: '100%' 
    },
    thumbnail: { width: '100%', height: '160px', objectFit: 'cover' },
    cardContent: { padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 },
    courseTitle: { fontSize: '1.2rem', fontWeight: '800', marginBottom: '10px' },
    courseDesc: { color: '#64748b', fontSize: '0.9rem', marginBottom: '20px' },
    btnStyle: {
        background: '#6366f1',
        color: '#fff',
        border: 'none',
        padding: '12px',
        width: '100%',
        borderRadius: '10px',
        cursor: 'pointer',
        fontWeight: 'bold'
    },
    loader: { textAlign: 'center', marginTop: '100px' }
};

export default MyCourses;