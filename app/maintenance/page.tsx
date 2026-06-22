import React from "react";

export default function MaintenancePage() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: '#f8fafc',
      zIndex: 99999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      textAlign: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        padding: '40px',
        borderRadius: '16px',
        maxWidth: '600px',
        width: '100%',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{
          height: '80px',
          width: '80px',
          backgroundColor: '#fef3c7',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px'
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
            <path d="M12 9v4"></path>
            <path d="M12 17h.01"></path>
          </svg>
        </div>
        
        <h1 style={{
          fontSize: '32px',
          fontWeight: '700',
          color: '#0f172a',
          margin: '0 0 16px 0',
          letterSpacing: '-0.02em'
        }}>
          We'll be right back
        </h1>
        
        <p style={{
          color: '#64748b',
          fontSize: '18px',
          lineHeight: '1.6',
          margin: '0 0 32px 0',
          maxWidth: '400px'
        }}>
          Clevora Agro is currently undergoing scheduled maintenance. We are updating our systems to serve you better.
        </p>
        
        <div style={{
          width: '100%',
          maxWidth: '300px',
          height: '6px',
          backgroundColor: '#f1f5f9',
          borderRadius: '9999px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            backgroundColor: '#f59e0b',
            width: '100%',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}></div>
        </div>
        
        <p style={{
          color: '#94a3b8',
          fontSize: '14px',
          marginTop: '32px',
          marginBottom: '0'
        }}>
          Thank you for your patience.
        </p>
      </div>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
      `}</style>
    </div>
  );
}
