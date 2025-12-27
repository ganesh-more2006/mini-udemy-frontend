import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [editingCourse, setEditingCourse] = useState(null);
    
    // ✅ Railway Backend URL
    const API_URL = "https://mini-udemy-backend-production-65d8.up.railway.app";

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
        // Isse aapko pata chalega ki error kya hai
        alert("Backend se connect nahi ho paa raha! Console check karein."); 
    } finally {
        // ✅ Ye sabse important hai: ye loading screen ko band kar dega 
        // chahe data mil jaye ya koi error aa jaye.
        setLoading(false); 
    }
};

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this course?")) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${API_URL}/api/courses/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchCourses();
            alert("Deleted!");
        } catch (err) {
            alert("Delete failed");
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put(`${API_URL}/api/courses/${editingCourse._id}`, editingCourse, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEditingCourse(null);
            fetchCourses();
            alert("Course Updated!");
        } catch (err) {
            alert("Update failed");
        }
    };

    if (loading) return <div style={{textAlign: 'center', marginTop: '100px'}}>Loading...</div>;

    return (
        <div style={styles.container}>
            <h1 style={styles.mainTitle}>Explore Live Courses</h1>

            {editingCourse && (
                <div style={styles.modalOverlay}>
                    <form style={styles.modal} onSubmit={handleUpdate}>
                        <h3>Edit Course</h3>
                        <input style={styles.modalInput} value={editingCourse.title} onChange={(e) => setEditingCourse({...editingCourse, title: e.target.value})} />
                        <textarea style={styles.modalInput} value={editingCourse.description} onChange={(e) => setEditingCourse({...editingCourse, description: e.target.value})} />
                        <input style={styles.modalInput} value={editingCourse.price} onChange={(e) => setEditingCourse({...editingCourse, price: e.target.value})} />
                        <button type="submit" style={styles.editBtn}>Save Changes</button>
                        <button type="button" onClick={() => setEditingCourse(null)} style={styles.deleteBtn}>Cancel</button>
                    </form>
                </div>
            )}

            <div style={styles.grid}>
                {courses.map(c => (
                    <div key={c._id} style={styles.card}>
                        <h3 style={styles.courseTitle}>{c.title}</h3>
                        <p style={styles.description}>{c.description}</p>
                        <div style={styles.footerRow}>
                            <span style={styles.priceValue}>₹{c.price}</span>
                            {user?.role === 'instructor' && (
                                <div style={styles.adminPanel}>
                                    <button onClick={() => setEditingCourse(c)} style={styles.editBtn}>Edit</button>
                                    <button onClick={() => handleDelete(c._id)} style={styles.deleteBtn}>Delete</button>
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
    container: { padding: '50px 10%', background: '#f5f7fa', minHeight: '100vh' },
    mainTitle: { textAlign: 'center', fontSize: '2.5rem', marginBottom: '40px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' },
    card: { background: '#fff', borderRadius: '20px', padding: '20px', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' },
    courseTitle: { fontSize: '1.2rem', fontWeight: '800' },
    description: { color: '#666', fontSize: '0.9rem', margin: '10px 0' },
    footerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' },
    priceValue: { fontSize: '1.3rem', fontWeight: '900' },
    adminPanel: { display: 'flex', gap: '10px' },
    editBtn: { background: '#fbbf24', color: '#fff', padding: '8px 15px', border: 'none', borderRadius: '10px', cursor: 'pointer' },
    deleteBtn: { background: '#ef4444', color: '#fff', padding: '8px 15px', border: 'none', borderRadius: '10px', cursor: 'pointer' },
    modalOverlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 },
    modal: { background: '#fff', padding: '30px', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '15px', width: '400px' },
    modalInput: { padding: '10px', borderRadius: '10px', border: '1px solid #ddd' }
};

export default Home;