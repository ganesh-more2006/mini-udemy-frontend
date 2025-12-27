import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    
    const API_URL = "https://mini-udemy-backend-production-65d8.up.railway.app";

    // Professional Thumbnails
    const courseImages = [
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80",
        "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&q=80",
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80",
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80"
    ];

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        setUser(loggedInUser);
        fetchCourses();
    }, []);

    // Instructor check logic - fixing the role issue
    const isInstructor = user && (user.role === 'instructor' || user.user?.role === 'instructor');

    const fetchCourses = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/courses/all`);
            setCourses(res.data);
        } catch (err) {
            console.error("API Error:", err);
            alert("Connection error. Please check your internet.");
        } finally {
            setLoading(false); 
        }
    };

    const handleEnroll = async (courseId) => {
        if (!user) {
            alert("Please Login to start your journey!");
            window.location.href = "/login";
            return;
        }
        try {
            const token = localStorage.getItem('token');
            await axios.post(`${API_URL}/api/enrollments/enroll`, 
                { courseId }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Success! Enrollment complete.");
        } catch (err) {
            alert(err.response?.data?.message || "Enrollment failed.");
        }
    };

    const handleDelete = async (courseId) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`${API_URL}/api/courses/${courseId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert("Course deleted successfully!");
                fetchCourses(); // List refresh karne ke liye
            } catch (err) {
                alert("Failed to delete course.");
            }
        }
    };

    if (loading) return (
        <div style={styles.loader}>
            <div className="spinner"></div>
            <p>Loading Professional Courses...</p>
        </div>
    );

    return (
        <div style={styles.container}>
            <div style={styles.heroSection}>
                <h1 style={styles.mainTitle}>Master Your Future</h1>
                <p style={styles.subTitle}>Learn from the best in the industry</p>
            </div>

            <div style={styles.grid}>
                {courses.map((c, index) => (
                    <div key={c._id} style={styles.card}>
                        <img 
                            src={courseImages[index % courseImages.length]} 
                            alt="Professional Course" 
                            style={styles.courseImg} 
                        />
                        
                        <div style={styles.cardBody}>
                            <h3 style={styles.courseTitle}>{c.title}</h3>
                            <p style={styles.description}>{c.description.substring(0, 70)}...</p>
                            
                            <div style={styles.priceRow}>
                                <span style={styles.priceTag}>₹{c.price}</span>
                            </div>

                            {/* Matching Horizontal Line */}
                            <hr style={styles.divider} />
                            
                            <div style={styles.actionArea}>
                                {/* Student Enroll Button */}
                                {(!user || user?.role === 'student') && (
                                    <button onClick={() => handleEnroll(c._id)} style={styles.enrollBtn}>
                                        Enroll Now
                                    </button>
                                )}

                                {/* Modern Instructor Buttons */}
                                {isInstructor && (
                                    <div style={styles.instructorGroup}>
                                        <button 
                                            onClick={() => window.location.href=`/edit-course/${c._id}`} 
                                            style={styles.editBtn}
                                        >
                                            Edit Course
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(c._id)} 
                                            style={styles.deleteBtn}
                                        >
                                            Delete
                                        </button>
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
    container: { padding: '60px 5%', background: '#f8fafc', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif" },
    heroSection: { textAlign: 'center', marginBottom: '60px' },
    mainTitle: { fontSize: '3.2rem', fontWeight: '800', color: '#0f172a', letterSpacing: '-1px' },
    subTitle: { fontSize: '1.2rem', color: '#64748b', marginTop: '10px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '35px' },
    card: { background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' },
    courseImg: { width: '100%', height: '180px', objectFit: 'cover' },
    cardBody: { padding: '24px' },
    courseTitle: { fontSize: '1.25rem', fontWeight: '700', color: '#1e293b', marginBottom: '8px' },
    description: { color: '#64748b', fontSize: '0.9rem', marginBottom: '15px', height: '40px', overflow: 'hidden' },
    priceRow: { marginBottom: '15px' },
    priceTag: { fontSize: '1.5rem', fontWeight: '800', color: '#1e293b' },
    divider: { border: '0', borderTop: '1px solid #f1f5f9', margin: '15px 0' },
    actionArea: { display: 'flex', flexDirection: 'column', gap: '10px' },
    enrollBtn: { width: '100%', background: '#4f46e5', color: '#fff', padding: '12px', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', fontSize: '1rem', boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)' },
    instructorGroup: { display: 'flex', gap: '10px' },
    editBtn: { flex: 2, background: '#f8fafc', color: '#475569', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' },
    deleteBtn: { flex: 1, background: '#fff1f2', color: '#e11d48', padding: '10px', border: '1px solid #fecdd3', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' },
    loader: { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh', color: '#4f46e5' }
};

export default Home;