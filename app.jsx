import React from 'react';

const GlassBlog = () => {
  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      padding: '20px',
    },
    glassCard: {
      background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '16px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)',
      webkitBackdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      padding: '40px',
      maxWidth: '600px',
      width: '100%',
      color: 'white',
    },
    title: {
      fontSize: '2.5rem',
      marginBottom: '10px',
      fontWeight: 'bold',
    },
    meta: {
      fontSize: '0.9rem',
      opacity: '0.8',
      marginBottom: '20px',
      display: 'block',
    },
    content: {
      lineHeight: '1.6',
      fontSize: '1.1rem',
      marginBottom: '30px',
    },
    button: {
      background: 'rgba(255, 255, 255, 0.3)',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '8px',
      color: 'white',
      cursor: 'pointer',
      fontWeight: '600',
      transition: '0.3s',
    }
  };

  return (
    <div style={styles.container}>
      <article style={styles.glassCard}>
        <h1 style={styles.title}>The Future of Glass UI</h1>
        <span style={styles.meta}>Posted on May 8, 2026 • 5 min read</span>
        
        <p style={styles.content}>
          Glassmorphism is more than just a trend; it's a way to create depth 
          and hierarchy in modern web interfaces. By using translucency and 
          background blurs, we can keep the user focused while maintaining 
          a sense of space.
        </p>

        <button 
          style={styles.button}
          onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.4)'}
          onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
        >
          Read More
        </button>
      </article>
    </div>
  );
};

export default GlassBlog;
