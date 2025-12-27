import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AddCourse = () => {
    const [course, setCourse] = useState({ 
        title: '', 
        description: '', 
        price: '', 
        category: '', 
        sections: [{ title: '', videoUrl: '' }] 
    });

    const API_URL = "https://mini-udemy-backend-production-65d8.up.railway.app";

    const addSection = () => {
        setCourse({
            ...course,
            sections: [...course.sections, { title: '', videoUrl: '' }]
        });
    };

    const handleSectionChange = (index, e) => {
        const newSections = [...course.sections];
        newSections[index][e.target.name] = e.target.value;
        setCourse({ ...course, sections: newSections });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); 

        if (!token) {
            toast.error("Session expired. Please Login again!");
            return;
        }

        try {
            // ✅ Ab ye Live URL par request bhejega
            await axios.post(`${API_URL}/api/courses/add`, course, {
                headers: { 
                    Authorization: `Bearer ${token.trim()}`,
                    'Content-Type': 'application/json'
                }
            });
            toast.success("Course with Lectures Published!");
            // Form reset
            setCourse({ title: '', description: '', price: '', category: '', sections: [{ title: '', videoUrl: '' }] });
        } catch (err) {
            console.error("Auth Error:", err.response?.data);
            toast.error(err.response?.data?.message || "Not Authorized!");
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '50px auto', padding: '30px', border: '1px solid #eee', borderRadius: '15px', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
            <h2 style={{ textAlign: 'center', color: '#1f2937' }}>Add New Course</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input value={course.title} type="text" placeholder="Course Title" onChange={(e) => setCourse({...course, title: e.target.value})} required style={styles.input} />
                <textarea value={course.description} placeholder="Description" onChange={(e) => setCourse({...course, description: e.target.value})} required style={{ ...styles.input, height: '80px' }} />
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input value={course.price} type="number" placeholder="Price (₹)" onChange={(e) => setCourse({...course, price: e.target.value})} required style={{ ...styles.input, flex: 1 }} />
                    <input value={course.category} type="text" placeholder="Category" onChange={(e) => setCourse({...course, category: e.target.value})} required style={{ ...styles.input, flex: 1 }} />
                </div>

                <hr style={{ border: '0.5px solid #eee', margin: '10px 0' }} />
                
                <h4 style={{ margin: 0 }}>Course Curriculum (Lectures)</h4>
                {course.sections.map((section, index) => (
                    <div key={index} style={styles.sectionBox}>
                        <p style={{ margin: '0 0 5px 0', fontSize: '12px', fontWeight: 'bold', color: '#6366f1' }}>Lecture {index + 1}</p>
                        <input 
                            name="title" 
                            value={section.title} 
                            placeholder="Lecture Title (e.g. Intro to React)" 
                            onChange={(e) => handleSectionChange(index, e)} 
                            required 
                            style={styles.input} 
                        />
                        <input 
                            name="videoUrl" 
                            value={section.videoUrl} 
                            placeholder="YouTube Video URL" 
                            onChange={(e) => handleSectionChange(index, e)} 
                            required 
                            style={{ ...styles.input, marginTop: '8px' }} 
                        />
                    </div>
                ))}

                <button type="button" onClick={addSection} style={styles.addBtn}>+ Add More Lecture</button>
                <button type="submit" style={styles.submitBtn}>Publish Course</button>
            </form>
        </div>
    );
};

const styles = {
    input: { padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', outline: 'none' },
    sectionBox: { padding: '15px', background: '#f9fafb', borderRadius: '10px', border: '1px solid #eee' },
    addBtn: { background: '#f3f4f6', color: '#1f2937', padding: '10px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
    submitBtn: { background: '#6366f1', color: '#fff', padding: '15px', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', marginTop: '10px' }
};

export default AddCourse;