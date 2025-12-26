import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/courses/all');
                setCourses(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching courses:", err);
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

// ... baaki imports same rahenge

const deleteCourse = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
        try {
            const token = localStorage.getItem('token');
            
            // Backend call with Token
            const res = await axios.delete(`http://localhost:5000/api/courses/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.status === 200) {
               
                setCourses(courses.filter(course => course._id !== id));
                alert("Course deleted successfully!");
            }
        } catch (err) { 
            console.error("Delete Error:", err.response);
  
            alert(err.response?.data?.message || "Delete failed: Unauthorized or Server Error"); 
        }
    }
};

    const handleEnroll = async (courseId, price) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Please login to buy this course!");
            return navigate('/login');
        }

        const confirmPayment = window.confirm(`The price of this course is ₹${price}. Do you want to make the payment and enroll?`);
        
        if (confirmPayment) {
            try {
                const res = await axios.post('http://localhost:5000/api/enrollments/enroll', 
                    { courseId }, 
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                alert("Payment Successful & Enrolled!"); 
                navigate('/my-courses'); 
            } catch (err) {
                alert(err.response?.data?.message || "Payment failed");
            }
        }
    };

    if (loading) return <div style={styles.loader}>Loading...</div>;

    return (
        <div style={styles.container}>
            <div style={styles.blobTop}></div>
            <div style={styles.blobBottom}></div>

            <header style={styles.hero}>
                <h1 style={styles.mainTitle}>Unlock Your Potential</h1>
                <p style={styles.subTitle}>Explore high-quality courses and start your learning journey today.</p>
            </header>

            <div style={styles.grid}>
                {courses.map((course) => (
                    <div key={course._id} style={styles.card}>
                        <div style={styles.badge}>{course.category}</div>
                        
                        <div style={styles.content}>
                            <h3 style={styles.courseTitle}>{course.title}</h3>
                            <p style={styles.description}>{course.description}</p>
                            
                            <div style={styles.footerRow}>
                                <div style={styles.priceContainer}>
                                    <span style={styles.priceLabel}>Price</span>
                                    <h4 style={styles.priceValue}>₹{course.price}</h4>
                                </div>
                                
                                <button 
                                    onClick={() => handleEnroll(course._id, course.price)} 
                                    style={styles.enrollBtn}
                                >
                                    Enroll Now
                                </button>
                            </div>

                            {user && user.role === 'instructor' && (
                                <div style={styles.adminPanel}>
                                    <button onClick={() => navigate(`/edit-course/${course._id}`)} style={styles.editBtn}>Edit</button>
                                    <button onClick={() => deleteCourse(course._id)} style={styles.deleteBtn}>Delete</button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


const styles = {
    container: { padding: '80px 10%', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', minHeight: '100vh', position: 'relative', overflow: 'hidden' },
    blobTop: { position: 'absolute', top: '-150px', right: '-100px', width: '500px', height: '500px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.15)', filter: 'blur(80px)', zIndex: 0 },
    blobBottom: { position: 'absolute', bottom: '-150px', left: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(236, 72, 153, 0.15)', filter: 'blur(80px)', zIndex: 0 },
    hero: { textAlign: 'center', marginBottom: '80px', position: 'relative', zIndex: 1 },
    mainTitle: { fontSize: '3.5rem', fontWeight: '900', color: '#1f2937', marginBottom: '20px' },
    subTitle: { fontSize: '1.25rem', color: '#4b5563', maxWidth: '700px', margin: '0 auto' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '40px', position: 'relative', zIndex: 1 },
    card: { background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(20px)', borderRadius: '32px', padding: '24px', border: '1px solid rgba(255, 255, 255, 0.4)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.08)' },
    badge: { alignSelf: 'flex-start', background: '#fff', color: '#6366f1', padding: '6px 14px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '700' },
    content: { display: 'flex', flexDirection: 'column', gap: '12px' },
    courseTitle: { fontSize: '1.5rem', fontWeight: '800', color: '#111827', margin: 0 },
    description: { color: '#6b7280', fontSize: '0.95rem', lineHeight: '1.6', height: '75px', overflow: 'hidden' },
    footerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' },
    priceContainer: { display: 'flex', flexDirection: 'column' },
    priceLabel: { fontSize: '0.7rem', color: '#9ca3af', fontWeight: '600' },
    priceValue: { fontSize: '1.6rem', fontWeight: '900', color: '#111827' },
    enrollBtn: { background: '#6366f1', color: '#fff', padding: '12px 24px', border: 'none', borderRadius: '16px', fontWeight: '700', cursor: 'pointer' },
    adminPanel: { display: 'flex', gap: '10px', marginTop: '15px', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '15px' },
    editBtn: { flex: 1, padding: '10px', borderRadius: '12px', border: '1px solid #ddd', background: 'none', cursor: 'pointer' },
    deleteBtn: { flex: 1, padding: '10px', borderRadius: '12px', border: 'none', background: '#fee2e2', color: '#ef4444', cursor: 'pointer' },
    loader: { textAlign: 'center', marginTop: '100px', fontSize: '1.5rem', color: '#6366f1' }
};

export default Home;