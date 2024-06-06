import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DocumentEditor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSave = async () => {
    try {
      await axios.post('http://localhost:5000/document/create', {
        title,
        content
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMessage('Document saved successfully');
    } catch (error) {
      setMessage('Error saving document');
    }
  };

  return (
    <div>
      <h2>Document Editor</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DocumentEditor;
