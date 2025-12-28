import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const EditCourse = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState({ title: '', description: '', price: '', category: '' });

    // LIVE Backend URL use karna hai
    const API_URL = "https://mini-udemy-backend-production-65d8.up.railway.app";

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                // FIXED: Localhost ko replace kiya live URL se
                const res = await axios.get(`${API_URL}/api/courses/${id}`);
                setCourse(res.data);
            } catch (err) {
                console.error("Fetch Error:", err);
                toast.error("Course load nahi ho pa raha!");
            }
        };
        fetchCourse();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            // FIXED: Localhost ko replace kiya live URL se
            await axios.put(`${API_URL}/api/courses/${id}`, course, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Course Updated Successfully!");
            navigate('/');
        } catch (err) {
            console.error("Update Error:", err);
            toast.error(err.response?.data?.message || "Update Failed!");
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Edit Course</h2>
            <form onSubmit={handleUpdate} style={styles.form}>
                <label style={styles.label}>Course Title</label>
                <input 
                    type="text" 
                    value={course.title} 
                    style={styles.input}
                    onChange={(e) => setCourse({...course, title: e.target.value})} 
                    required
                />

                <label style={styles.label}>Description</label>
                <textarea 
                    value={course.description} 
                    style={{...styles.input, height: '100px'}}
                    onChange={(e) => setCourse({...course, description: e.target.value})} 
                    required
                />

                <label style={styles.label}>Price (₹)</label>
                <input 
                    type="number" 
                    value={course.price} 
                    style={styles.input}
                    onChange={(e) => setCourse({...course, price: e.target.value})} 
                    required
                />

                <label style={styles.label}>Category</label>
                <input 
                    type="text" 
                    value={course.category} 
                    style={styles.input}
                    onChange={(e) => setCourse({...course, category: e.target.value})} 
                    required
                />

                <button type="submit" style={styles.submitBtn}>Update Course Now</button>
            </form>
        </div>
    );
};

// Mobile Responsive Styles
const styles = {
    container: { 
        maxWidth: '500px', 
        margin: '40px auto', 
        padding: '20px', 
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        fontFamily: "'Segoe UI', sans-serif"
    },
    title: { textAlign: 'center', marginBottom: '20px', color: '#1e293b' },
    form: { display: 'flex', flexDirection: 'column', gap: '15px' },
    label: { fontSize: '0.9rem', fontWeight: '600', color: '#475569', marginBottom: '-10px' },
    input: { 
        padding: '12px', 
        borderRadius: '8px', 
        border: '1px solid #cbd5e1', 
        fontSize: '1rem',
        outline: 'none'
    },
    submitBtn: { 
        background: '#f39c12', 
        color: 'white', 
        padding: '14px', 
        border: 'none', 
        borderRadius: '8px', 
        cursor: 'pointer', 
        fontWeight: '700',
        fontSize: '1rem',
        marginTop: '10px'
    }
};

export default EditCourse;