import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Home = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [showPayment, setShowPayment] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const navigate = useNavigate();
    
    const API_URL = "https://mini-udemy-backend-production-65d8.up.railway.app";

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        setUser(loggedInUser);
        fetchCourses();
    }, []);

    const isInstructor = user && (user.role === 'instructor' || user.user?.role === 'instructor');
    const isStudentOrGuest = !user || user?.role === 'student' || user?.user?.role === 'student';

    const fetchCourses = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/courses/all`);
            setCourses(res.data);
        } catch (err) { console.error("API Error:", err); }
        finally { setLoading(false); }
    };

    const handleDelete = async (courseId) => {
        if (window.confirm("pakka delete karna hai?")) {
            const loadingToast = toast.loading("Deleting course...");
            try {
                const token = localStorage.getItem('token');
                const res = await axios.delete(`${API_URL}/api/courses/${courseId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                toast.success(res.data.message || "Deleted Successfully", { id: loadingToast });
                fetchCourses(); 
            } catch (err) {
                toast.error(err.response?.data?.message || "Delete failed", { id: loadingToast });
            }
        }
    };

    const handleEnrollClick = (course) => {
        if (!user) {
            toast.error("Please Login First!");
            navigate("/login");
            return;
        }
        setSelectedCourse(course);
        setShowPayment(true);
    };

    const confirmPayment = async (method) => {
        toast.loading(`Processing ${method} Payment...`);
        try {
            const token = localStorage.getItem('token');
            await axios.post(`${API_URL}/api/enrollments/enroll`, 
                { courseId: selectedCourse._id }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.dismiss();
            toast.success("Success! Course Enrolled.");
            setShowPayment(false);
            navigate("/my-courses");
        } catch (err) {
            toast.dismiss();
            toast.error("Payment Failed!");
        }
    };

    if (loading) return <div style={styles.loader}>Loading...</div>;

    return (
        <div style={styles.container}>
            {showPayment && (
                <div style={styles.modalOverlay}>
                    <div style={styles.paymentCard}>
                        <h3>Select Payment Method</h3>
                        <p style={{color: '#64748b'}}>Amount: ₹{selectedCourse?.price}</p>
                        <button onClick={() => confirmPayment('PhonePe')} style={styles.paymentBtn}>
                            <span style={{color: '#5f259f'}}>🟣 PhonePe</span>
                        </button>
                        <button onClick={() => confirmPayment('GPay')} style={styles.paymentBtn}>
                            <span style={{color: '#4285F4'}}>🔵 Google Pay / UPI</span>
                        </button>
                        <button onClick={() => setShowPayment(false)} style={styles.cancelBtn}>Cancel</button>
                    </div>
                </div>
            )}

            <div style={styles.heroSection}>
                <h1 style={styles.mainTitle}>Master Your Future</h1>
                <p style={styles.subTitle}>Learn from the best in the industry</p>
            </div>

            <div style={styles.grid}>
                {courses.map((c) => (
                    <div key={c._id} style={styles.card}>
                        <img src={"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500"} style={styles.courseImg} alt="course" />
                        <div style={styles.cardBody}>
                            <h3 style={styles.courseTitle}>{c.title}</h3>
                            <p style={styles.priceTag}>₹{c.price}</p>
                            <div style={styles.actionArea}>
                                {isStudentOrGuest && (
                                    <button onClick={() => handleEnrollClick(c)} style={styles.enrollBtn}>Enroll Now</button>
                                )}
                                {isInstructor && (
                                    <div style={styles.instructorGroup}>
                                        <button onClick={() => navigate(`/edit-course/${c._id}`)} style={styles.editBtn}>Edit</button>
                                      
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
    heroSection: { textAlign: 'center', marginBottom: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center' },
    mainTitle: { fontSize: '2.5rem', fontWeight: '900', color: '#1e293b', margin: 0 },
    subTitle: { color: '#64748b', fontSize: '1.1rem', marginTop: '10px' },
    container: { padding: '20px 5%', background: '#f8fafc', minHeight: '100vh' },
    modalOverlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 },
    paymentCard: { background: '#fff', padding: '30px', borderRadius: '20px', textAlign: 'center', width: '320px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' },
    paymentBtn: { width: '100%', padding: '14px', margin: '10px 0', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' },
    cancelBtn: { color: '#ef4444', border: 'none', background: 'none', marginTop: '10px', cursor: 'pointer', fontWeight: 'bold' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' },
    courseImg: { width: '100%', height: '160px', objectFit: 'cover' },
    card: { background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', height: '100%' },
    cardBody: { padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 },
    actionArea: { marginTop: 'auto', width: '100%', paddingTop: '15px' },
    priceTag: { fontSize: '1.2rem', fontWeight: '800', margin: '10px 0' },
    enrollBtn: { width: '100%', background: '#6366f1', color: '#fff', padding: '12px', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' },
    instructorGroup: { display: 'flex', gap: '10px' },
    editBtn: { flex: 1, background: '#4f46e5', color: '#fff', padding: '10px', border: 'none', borderRadius: '8px', cursor: 'pointer' },
    deleteBtn: { flex: 1, background: '#ef4444', color: '#fff', padding: '10px', border: 'none', borderRadius: '8px', cursor: 'pointer' },
    loader: { textAlign: 'center', marginTop: '150px', fontSize: '1.5rem' }
};

export default Home;