import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const MyCourses = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchMyCourses = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:5000/api/enrollments/my-courses', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEnrollments(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching enrolled courses", err);
                setLoading(false);
            }
        };
        fetchMyCourses();
    }, []);

    if (loading) return <div style={styles.loader}>Loading Your Courses...</div>;

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>My Enrolled Courses</h1>
            
            {enrollments.length === 0 ? (
                <div style={styles.emptyState}>
                    <p>You have not yet enrolled in any course.</p>
                    <button onClick={() => navigate('/')} style={styles.btnStyle}>Browse Courses</button>
                </div>
            ) : (
                <div style={styles.grid}>
                    {enrollments.map((item) => {
                       
                        if (!item.course) return null; 

                        return (
                            <div key={item._id} style={styles.cardStyle}>
                                <h3 style={styles.courseTitle}>{item.course.title}</h3>
                                <p style={styles.courseDesc}>{item.course.description}</p>
                                <button 
                                    onClick={() => navigate(`/course-view/${item.course._id}`)} 
                                    style={styles.btnStyle}
                                >
                                    Continue Learning
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: { padding: '60px 10%', minHeight: '100vh', background: '#f8fafc' },
    title: { marginBottom: '40px', color: '#1e293b', fontSize: '2rem', fontWeight: '800' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' },
    cardStyle: {
        background: '#fff',
        padding: '25px',
        borderRadius: '20px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    courseTitle: { color: '#6366f1', fontSize: '1.25rem', marginBottom: '10px' },
    courseDesc: { color: '#64748b', fontSize: '0.9rem', marginBottom: '20px', lineHeight: '1.5' },
    btnStyle: {
        background: '#6366f1',
        color: '#fff',
        border: 'none',
        padding: '12px 20px',
        borderRadius: '12px',
        cursor: 'pointer',
        fontWeight: '700',
        transition: '0.3s'
    },
    loader: { textAlign: 'center', marginTop: '100px', fontSize: '1.2rem', color: '#6366f1' },
    emptyState: { textAlign: 'center', marginTop: '50px', color: '#64748b' }
};

export default MyCourses;