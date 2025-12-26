import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CourseView = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [activeVideo, setActiveVideo] = useState("");

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/courses/${id}`);
                setCourse(res.data);
                if (res.data.sections && res.data.sections.length > 0) {
                    const videoId = getYouTubeID(res.data.sections[0].videoUrl);
                    setActiveVideo(`https://www.youtube.com/embed/${videoId}`);
                }
            } catch (err) {
                console.error("Error fetching course content", err);
            }
        };
        fetchCourseDetails();
    }, [id]);

    const getYouTubeID = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const handleVideoChange = (url) => {
        const videoId = getYouTubeID(url);
        setActiveVideo(`https://www.youtube.com/embed/${videoId}`);
    };

    if (!course) return <div style={styles.loader}>Loading...</div>;

    return (
        <div style={styles.fullPageBackground}>
            <div style={styles.contentWrapper}>
                {/* Video Player Section */}
                <div style={styles.playerContainer}>
                    <div style={styles.videoFrame}>
                        {activeVideo ? (
                            <iframe
                                width="100%"
                                height="100%"
                                src={activeVideo}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <div style={styles.noVideo}>Select a lecture</div>
                        )}
                    </div>
                    <div style={styles.textDetails}>
                        <h1 style={styles.courseTitle}>{course.title}</h1>
                        <p style={styles.courseDescription}>{course.description}</p>
                    </div>
                </div>

                {/* Sidebar Section */}
                <div style={styles.sidebar}>
                    <h3 style={styles.sidebarHeader}>Course Content</h3>
                    <div style={styles.lectureList}>
                        {course.sections.map((section, index) => (
                            <div 
                                key={index} 
                                onClick={() => handleVideoChange(section.videoUrl)}
                                style={{
                                    ...styles.lectureItem,
                                    background: activeVideo.includes(getYouTubeID(section.videoUrl)) 
                                        ? 'rgba(99, 102, 241, 0.3)' 
                                        : 'rgba(255, 255, 255, 0.05)'
                                }}
                            >
                                <span style={styles.playIcon}>▶</span>
                                <span style={styles.lectureTitle}>{section.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


const styles = {
    fullPageBackground: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)', 
        padding: '30px 5%',
        color: '#fff'
    },
    contentWrapper: {
        display: 'flex',
        gap: '25px',
        maxWidth: '1300px',
        margin: '0 auto'
    },
    playerContainer: {
        flex: 2.5
    },
    videoFrame: {
        aspectRatio: '16/9',
        background: '#000',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 0 40px rgba(0,0,0,0.5)',
        border: '2px solid rgba(255, 255, 255, 0.1)' 
    },
    textDetails: {
        marginTop: '20px'
    },
    courseTitle: { fontSize: '2.2rem', fontWeight: 'bold', letterSpacing: '-0.5px' },
    courseDescription: { color: '#94a3b8', marginTop: '10px', fontSize: '1.1rem' },
    sidebar: {
        flex: 1,
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(15px)',
        borderRadius: '20px',
        padding: '20px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        height: 'fit-content'
    },
    sidebarHeader: { marginBottom: '20px', fontSize: '1.3rem', fontWeight: '700', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' },
    lectureList: { display: 'flex', flexDirection: 'column', gap: '10px' },
    lectureItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '12px 15px',
        borderRadius: '12px',
        cursor: 'pointer',
        transition: '0.3s ease-in-out',
        border: '1px solid rgba(255, 255, 255, 0.05)'
    },
    playIcon: { color: '#818cf8', marginRight: '10px', fontSize: '0.9rem' },
    lectureTitle: { color: '#e2e8f0', fontWeight: '500' },
    loader: { color: '#fff', textAlign: 'center', marginTop: '100px', fontSize: '1.2rem' }
};

export default CourseView;