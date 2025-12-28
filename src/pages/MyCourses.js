import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyCourses = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const API_URL = "https://mini-udemy-backend-production-65d8.up.railway.app";

    // Dummy images for fallback if course image is missing
    const fallbackImage = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80";

    useEffect(() => {
        const fetchMyCourses = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`${API_URL}/api/enrollments/my-courses`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEnrollments(res.data);
            } catch (err) {
                console.error("Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchMyCourses();
    }, [API_URL]);

    if (loading) return <div style={styles.loader}>Loading your learning journey...</div>;

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>My Learning Dashboard 📚</h2>
                <p style={styles.subText}>You have {enrollments.length} active courses</p>
            </div>

            <div style={styles.grid}>
                {enrollments.length > 0 ? enrollments.map((en) => (
                    <div key={en._id} style={styles.card}>
                        {/* Course Image Added */}
                        <img 
                            src={en.course?.image || fallbackImage} 
                            style={styles.courseImg} 
                            alt="course" 
                        />
                        
                        <div style={styles.badge}>Paid via {en.paymentMethod || 'UPI'}</div>
                        
                        <div style={styles.cardBody}>
                            <h3 style={styles.courseTitle}>{en.course?.title}</h3>
                            <p style={styles.price}>Purchase Price: ₹{en.course?.price}</p>
                            <p style={styles.date}>Enrolled on: {new Date(en.enrolledAt).toLocaleDateString()}</p>
                            
                            <button 
                                onClick={() => navigate(`/course-view/${en.course?._id}`)} 
                                style={styles.startBtn}
                            >
                                Start Learning Now
                            </button>
                        </div>
                    </div>
                )) : (
                    <div style={styles.emptyCard}>
                        <h3>Abhi tak koi course nahi liya?</h3>
                        <p>Learn new skills today!</p>
                        <button onClick={() => navigate('/')} style={styles.exploreBtn}>Explore Courses</button>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: { padding: '40px 5%', background: '#f8fafc', minHeight: '100vh' },
    header: { marginBottom: '30px' },
    title: { fontSize: '1.8rem', fontWeight: '800', color: '#1e293b', marginBottom: '5px' },
    subText: { color: '#64748b', fontSize: '1rem' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' },
    card: { background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', position: 'relative', transition: 'transform 0.2s' },
    courseImg: { width: '100%', height: '160px', objectFit: 'cover' },
    badge: { position: 'absolute', top: '12px', right: '12px', background: '#dcfce7', color: '#15803d', padding: '6px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' },
    cardBody: { padding: '20px' },
    courseTitle: { fontSize: '1.15rem', fontWeight: '700', color: '#1e293b', marginBottom: '8px', height: '2.8rem', overflow: 'hidden' },
    price: { fontSize: '0.9rem', fontWeight: '600', color: '#6366f1', marginBottom: '5px' },
    date: { fontSize: '0.8rem', color: '#94a3b8', marginBottom: '20px' },
    startBtn: { width: '100%', padding: '12px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', fontSize: '0.95rem', transition: '0.3s' },
    loader: { textAlign: 'center', marginTop: '150px', fontSize: '1.2rem', color: '#6366f1', fontWeight: '600' },
    emptyCard: { textAlign: 'center', gridColumn: '1/-1', padding: '60px 20px', background: '#fff', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' },
    exploreBtn: { marginTop: '20px', padding: '12px 30px', background: '#1e293b', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }
};

export default MyCourses;