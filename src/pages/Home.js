import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    
    // Aapka Railway Backend URL
    const API_URL = "https://mini-udemy-backend-production-855e.up.railway.app";

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                // Sahi endpoint: /api/courses
                const res = await axios.get(`${API_URL}/api/courses`);
                setCourses(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching courses:", err);
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const deleteCourse = async (id) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.delete(`${API_URL}/api/courses/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (res.status === 200) {
                    setCourses(courses.filter(course => course._id !== id));
                    alert("Course deleted successfully!");
                }
            } catch (err) { 
                console.error("Delete Error:", err.response);
                alert(err.response?.data?.message || "Delete failed"); 
            }
        }
    };

    const handleEnroll = async (courseId, price) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Please login to buy this course!");
            return navigate('/login');
        }

        if (window.confirm(`The price is ₹${price}. Enroll now?`)) {
            try {
                const res = await axios.post(`${API_URL}/api/enrollments/enroll`, 
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

    if (loading) return <div>Loading...</div>;

    return (
        // Aapka existing JSX yahan aayega...
        <div>... (Style aur HTML aapka purana hi rahega) ...</div>
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