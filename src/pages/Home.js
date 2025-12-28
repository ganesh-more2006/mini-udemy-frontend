import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    
    const API_URL = "https://mini-udemy-backend-production-65d8.up.railway.app";

    const courseImages = [
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80",
        "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&q=80",
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80"
    ];

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        setUser(loggedInUser);
        fetchCourses();
    }, []);

    const isInstructor = user && (user.role === 'instructor' || user.user?.role === 'instructor');

    const fetchCourses = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/courses/all`);
            setCourses(res.data);
        } catch (err) {
            console.error("API Error:", err);
        } finally {
            setLoading(false); 
        }
    };

    const handleEdit = (courseId) => {
        navigate(`/edit-course/${courseId}`);
    };

    const handleDelete = async (courseId) => {
        if (window.confirm("Bhai, delete karna hai?")) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`${API_URL}/api/courses/${courseId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchCourses();
            } catch (err) {
                alert("Delete failed");
            }
        }
    };

    if (loading) return <div style={styles.loader}>Loading...</div>;

    return (
        <div style={styles.container}>
            <div style={styles.heroSection}>
                <h1 style={styles.mainTitle}>Master Your Future</h1>
                <p style={styles.subTitle}>Learn from the best</p>
            </div>
            <div style={styles.grid}>
                {courses.map((c, index) => (
                    <div key={c._id} style={styles.card}>
                        <img src={courseImages[index % courseImages.length]} style={styles.courseImg} alt="course" />
                        <div style={styles.cardBody}>
                            <h3 style={styles.courseTitle}>{c.title}</h3>
                            <p style={styles.description}>{c.description?.substring(0, 50)}...</p>
                            <span style={styles.priceTag}>₹{c.price}</span>
                            <div style={styles.actionArea}>
                                {isInstructor && (
                                    <div style={styles.instructorGroup}>
                                        <button onClick={() => handleEdit(c._id)} style={styles.editBtn}>Edit</button>
                                        <button onClick={() => handleDelete(c._id)} style={styles.deleteBtn}>Delete</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: { padding: '20px 5%', background: '#f8fafc', minHeight: '100vh' },
    heroSection: { textAlign: 'center', marginBottom: '30px' },
    mainTitle: { fontSize: 'calc(1.5rem + 1vw)', fontWeight: '800' },
    subTitle: { color: '#64748b' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' },
    card: { background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' },
    courseImg: { width: '100%', height: '160px', objectFit: 'cover' },
    cardBody: { 
    padding: '20px', 
    display: 'flex',
    flexDirection: 'column'
},
    courseTitle: { fontSize: '1.1rem', fontWeight: '700' },
    priceTag: { fontSize: '1.2rem', fontWeight: '800', display: 'block', margin: '10px 0' },
    actionArea: { 
    marginTop: '15px',
    width: '100%'
},
   
instructorGroup: { 
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between', // Buttons ke beech barabar gap ke liye
    gap: '12px', 
    width: '100%'
},
editBtn: { 
    flex: 1, 
    background: '#4f46e5', 
    color: '#fff', 
    padding: '12px 5px', 
    border: 'none', 
    borderRadius: '10px', 
    cursor: 'pointer', 
    fontWeight: '700', 
    fontSize: '0.85rem',
    textAlign: 'center',
    transition: '0.3s'
},
deleteBtn: { 
    flex: 1, 
    background: '#ef4444', 
    color: '#fff', 
    padding: '12px 5px', 
    border: 'none', 
    borderRadius: '10px', 
    cursor: 'pointer', 
    fontWeight: '700', 
    fontSize: '0.85rem',
    textAlign: 'center',
    transition: '0.3s'
},
    loader: { textAlign: 'center', marginTop: '150px', fontSize: '1.2rem', fontWeight: '600' }
};

export default Home;