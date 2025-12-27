import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    
    const API_URL = "https://mini-udemy-backend-production-65d8.up.railway.app";

    // Professional Thumbnails (Harry & Apna College Style)
    const courseImages = [
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80", // Web Dev
        "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&q=80", // Coding
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80", // Software
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80"  // JavaScript
    ];

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        setUser(loggedInUser);
        fetchCourses();
    }, []);

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
                        {/* Course Image */}
                        <img 
                            src={courseImages[index % courseImages.length]} 
                            alt="Professional Course" 
                            style={styles.courseImg} 
                        />
                        
                        <div style={styles.cardBody}>
                            <h3 style={styles.courseTitle}>{c.title}</h3>
                            <p style={styles.description}>{c.description.substring(0, 70)}...</p>
                            
                            {/* Footer Row - Fixed Alignment */}
                            <div style={styles.footerRow}>
                                <div style={styles.priceSection}>
                                    <span style={styles.priceTag}>₹{c.price}</span>
                                </div>
                                
                                {user?.role === 'student' && (
                                    <button onClick={() => handleEnroll(c._id)} style={styles.enrollBtn}>
                                        Enroll Now
                                    </button>
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
    container: { padding: '60px 5%', background: '#f8fafc', minHeight: '100vh', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
    heroSection: { textAlign: 'center', marginBottom: '60px' },
    mainTitle: { fontSize: '3.2rem', fontWeight: '800', color: '#0f172a', letterSpacing: '-1px' },
    subTitle: { fontSize: '1.2rem', color: '#64748b', marginTop: '10px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '35px' },
    card: { background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', transition: '0.3s' },
    courseImg: { width: '100%', height: '180px', objectFit: 'cover' },
    cardBody: { padding: '24px' },
    courseTitle: { fontSize: '1.3rem', fontWeight: '700', color: '#1e293b', marginBottom: '10px', height: '50px', overflow: 'hidden' },
    description: { color: '#64748b', fontSize: '0.9rem', marginBottom: '20px', height: '40px' },
    footerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' },
    priceSection: { display: 'flex', flexDirection: 'column' },
    priceTag: { fontSize: '1.6rem', fontWeight: '800', color: '#1e293b' },
    enrollBtn: { background: '#4f46e5', color: '#fff', padding: '12px 24px', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', fontSize: '0.9rem', boxShadow: '0 4px 10px rgba(79, 70, 229, 0.3)' },
    loader: { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh', color: '#4f46e5', fontWeight: 'bold' }
};

export default Home;