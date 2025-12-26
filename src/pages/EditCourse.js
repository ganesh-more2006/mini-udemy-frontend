import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const EditCourse = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState({ title: '', description: '', price: '', category: '' });

    useEffect(() => {
    
        const fetchCourse = async () => {
            const res = await axios.get(`http://localhost:5000/api/courses/${id}`);
            setCourse(res.data);
        };
        fetchCourse();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/api/courses/${id}`, course, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Course Updated!");
            navigate('/');
        } catch (err) {
            toast.error("Update Failed!");
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px', border: '1px solid #ddd' }}>
            <h2>Edit Course</h2>
            <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input type="text" value={course.title} onChange={(e) => setCourse({...course, title: e.target.value})} />
                <textarea value={course.description} onChange={(e) => setCourse({...course, description: e.target.value})} />
                <input type="number" value={course.price} onChange={(e) => setCourse({...course, price: e.target.value})} />
                <input type="text" value={course.category} onChange={(e) => setCourse({...course, category: e.target.value})} />
                <button type="submit" style={{ background: '#f39c12', color: 'white', padding: '10px' }}>Update Course</button>
            </form>
        </div>
    );
};

export default EditCourse;