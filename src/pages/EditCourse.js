import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const EditCourse = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState({ title: '', description: '', price: '', category: '' });
    const API_URL = "https://mini-udemy-backend-production-65d8.up.railway.app";

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                // Fixed ID template literal
                const res = await axios.get(`${API_URL}/api/courses/${id}`);
                setCourse(res.data);
            } catch (err) {
                toast.error("Error loading course");
            }
        };
        if(id) fetchCourse();
    }, [id, API_URL]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put(`${API_URL}/api/courses/${id}`, course, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Updated!");
            navigate('/');
        } catch (err) {
            toast.error("Update failed");
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', background: '#fff', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
            <h2>Edit Course</h2>
            <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input type="text" value={course.title} placeholder="Title" onChange={(e) => setCourse({...course, title: e.target.value})} style={{padding: '10px'}} />
                <textarea value={course.description} placeholder="Description" onChange={(e) => setCourse({...course, description: e.target.value})} style={{padding: '10px', height: '80px'}} />
                <input type="number" value={course.price} placeholder="Price" onChange={(e) => setCourse({...course, price: e.target.value})} style={{padding: '10px'}} />
                <button type="submit" style={{ padding: '12px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Save Changes</button>
            </form>
        </div>
    );
};

export default EditCourse;