import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CourseView = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [activeVideo, setActiveVideo] = useState("");
    
    
    const API_URL = "https://mini-udemy-backend-production-65d8.up.railway.app";

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/courses/${id}`);
                setCourse(res.data);
                
                // Check if lectures/sections exist
                const content = res.data.sections || res.data.lectures || [];
                if (content.length > 0) {
                    const videoId = getYouTubeID(content[0].videoUrl);
                    setActiveVideo(`https://www.youtube.com/embed/${videoId}`);
                }
            } catch (err) {
                console.error("Error fetching course content", err);
            }
        };
        fetchCourseDetails();
    }, [id]);

    const getYouTubeID = (url) => {
        if(!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const handleVideoChange = (url) => {
        const videoId = getYouTubeID(url);
        if(videoId) {
            setActiveVideo(`https://www.youtube.com/embed/${videoId}`);
        }
    };

    if (!course) return <div style={styles.loader}>Loading course lectures...</div>;

    const courseContent = course.sections || course.lectures || [];

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
                            <div style={styles.noVideo}>Select a lecture to start learning</div>
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
                        {courseContent.map((section, index) => {
                            const currentId = getYouTubeID(section.videoUrl);
                            const isActive = activeVideo.includes(currentId);
                            
                            return (
                                <div 
                                    key={index} 
                                    onClick={() => handleVideoChange(section.videoUrl)}
                                    style={{
                                        ...styles.lectureItem,
                                        background: isActive 
                                          ? 'rgba(99, 102, 241, 0.3)' 
                                          : 'rgba(255, 255, 255, 0.05)',
                                        borderColor: isActive ? '#6366f1' : 'transparent'
                                    }}
                                >
                                    <span style={{...styles.playIcon, color: isActive ? '#fff' : '#818cf8'}}>
                                        {isActive ? '⏸' : '▶'}
                                    </span>
                                    <span style={styles.lectureTitle}>{section.title}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    fullPageBackground: { minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', padding: '30px 5%', color: '#fff', fontFamily: "'Segoe UI', sans-serif" },
    contentWrapper: { display: 'flex', flexDirection: 'row', gap: '25px', maxWidth: '1400px', margin: '0 auto', flexWrap: 'wrap' },
    playerContainer: { flex: 2, minWidth: '300px' },
    videoFrame: { aspectRatio: '16/9', background: '#000', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' },
    textDetails: { marginTop: '20px' },
    courseTitle: { fontSize: '1.8rem', fontWeight: 'bold' },
    courseDescription: { color: '#94a3b8', marginTop: '10px' },
    sidebar: { flex: 0.8, background: 'rgba(255, 255, 255, 0.03)', borderRadius: '15px', padding: '20px', border: '1px solid rgba(255, 255, 255, 0.1)', height: 'fit-content', minWidth: '280px' },
    sidebarHeader: { marginBottom: '15px', fontSize: '1.1rem', fontWeight: '700' },
    lectureList: { display: 'flex', flexDirection: 'column', gap: '8px' },
    lectureItem: { display: 'flex', alignItems: 'center', padding: '12px', borderRadius: '10px', cursor: 'pointer', transition: '0.2s', border: '1px solid transparent' },
    playIcon: { marginRight: '10px' },
    lectureTitle: { fontSize: '0.95rem' },
    loader: { color: '#fff', textAlign: 'center', marginTop: '100px' },
    noVideo: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#94a3b8' }
};

export default CourseView;