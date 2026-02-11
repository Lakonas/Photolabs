import React, { useState } from 'react';
import '../styles/PhotoUploadForm.scss';

const PhotoUploadForm = ({ topics, onClose, onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [topicId, setTopicId] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (selectedFile) {
      // Validate file type
      if (!selectedFile.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }

      // Validate file size (5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }

      setFile(selectedFile);
      setError('');

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleGenerateAI = async () => {
    if (!file) {
      setError('Please select a photo first');
      return;
    }

    setAiGenerating(true);
    setError('');

    try {
      const base64Image = await fileToBase64(file);
      const token = localStorage.getItem('token');

      const response = await fetch('/api/ai/describe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ image: base64Image })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'AI generation failed');
      }

      setDescription(data.description);
    } catch (err) {
      setError(err.message);
    } finally {
      setAiGenerating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a photo');
      return;
    }

    if (!title || !city || !country || !topicId) {
      setError('Please fill in all required fields');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('photo', file);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('city', city);
      formData.append('country', country);
      formData.append('topicId', topicId);

      const token = localStorage.getItem('token');

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      // Success!
      onUploadSuccess(data.photo);
      onClose();

    } catch (err) {
      setError(err.message);
      setUploading(false);
    }
  };

  return (
    <div className="upload-modal-overlay" onClick={onClose}>
      <div className="upload-modal" onClick={(e) => e.stopPropagation()}>
        <div className="upload-modal-header">
          <h2>Upload Photo</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        {error && (
          <div className="error-message">{error}</div>
        )}

        {/* Tab Navigation */}
        <div className="upload-tabs">
          <button
            type="button"
            className={`upload-tab ${activeTab === 'upload' ? 'active' : ''}`}
            onClick={() => setActiveTab('upload')}
          >
            📸 Upload Your Photo
          </button>
          <button
            type="button"
            className={`upload-tab ${activeTab === 'generate' ? 'active' : ''}`}
            onClick={() => setActiveTab('generate')}
          >
            ✨ Generate Photo
          </button>
        </div>

        <form onSubmit={handleSubmit} className="upload-form">
          {activeTab === 'upload' ? (
            <>
              {/* File Input */}
              <div className="form-group">
                <label>Photo *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={uploading}
                />
                {preview && (
                  <div className="image-preview">
                    <img src={preview} alt="Preview" />
                  </div>
                )}
              </div>

              {/* Title */}
              <div className="form-group">
                <label htmlFor="title">Title *</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give your photo a title"
                  disabled={uploading}
                  required
                />
              </div>

              {/* Description */}
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your photo (optional)"
                  rows="3"
                  disabled={uploading || aiGenerating}
                />
                <button
                  type="button"
                  className="ai-generate-button"
                  onClick={handleGenerateAI}
                  disabled={!file || uploading || aiGenerating}
                >
                  {aiGenerating ? '✨ Generating...' : '✨ Generate AI Description'}
                </button>
              </div>

              {/* City */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Toronto"
                    disabled={uploading}
                    required
                  />
                </div>

                {/* Country */}
                <div className="form-group">
                  <label htmlFor="country">Country *</label>
                  <input
                    type="text"
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. Canada"
                    disabled={uploading}
                    required
                  />
                </div>
              </div>

              {/* Topic */}
              <div className="form-group">
                <label htmlFor="topic">Topic *</label>
                <select
                  id="topic"
                  value={topicId}
                  onChange={(e) => setTopicId(e.target.value)}
                  disabled={uploading}
                  required
                >
                  <option value="">Select a topic</option>
                  {topics.map(topic => (
                    <option key={topic.id} value={topic.id}>
                      {topic.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={onClose}
                  disabled={uploading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="upload-button"
                  disabled={uploading}
                >
                  {uploading ? 'Uploading...' : 'Upload Photo'}
                </button>
              </div>
            </>
          ) : (
            <div className="coming-soon">
              <div className="coming-soon__icon">✨</div>
              <h3>AI Image Generation</h3>
              <p>Create stunning images from text descriptions using AI.</p>
              <p className="coming-soon__subtitle">Coming Soon!</p>
              <button
                type="button"
                className="cancel-button"
                onClick={() => setActiveTab('upload')}
              >
                ← Back to Upload
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default PhotoUploadForm;