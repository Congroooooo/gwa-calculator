import React, { useState } from 'react';
import { createWorker } from 'tesseract.js';

const workerPath = 'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/worker.min.js';
const langPath = 'https://tessdata.projectnaptha.com/4.0.0_best';

function OcrExtractor({ onExtracted }) {
  const [image, setImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');

  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setImage(imageUrl);
    }
  };

  const handleExtract = async () => {
    if (!image) {
      alert('Please upload an image first.');
      return;
    }

    setIsProcessing(true);
    setStatus('Initializing...');
    setProgress(0);

    try {
      const worker = await createWorker('eng', 1, {
        workerPath,
        langPath,
        logger: m => {
          setStatus(m.status);
          // Provide progress for different stages
          if (m.progress) {
            setProgress(m.progress * 100);
          }
        },
      });

      const { data: { text } } = await worker.recognize(image);
      await worker.terminate();

      onExtracted(text);
      setStatus('Extraction complete!');
      setIsProcessing(false);

    } catch (error) {
      console.error(error);
      setStatus('Error during OCR.');
      alert('An error occurred during text extraction. This can happen on the first run if the OCR models fail to download. Please check your network connection and the browser console for errors.');
      setIsProcessing(false);
    }
  };

  return (
    <div style={{width: '100%'}}>
      <h2 className="title">Extract Grades from Image</h2>
      <div className="input-group">
        <label htmlFor="image-upload">Upload Screenshot of Grades</label>
        <input type="file" id="image-upload" accept="image/*" onChange={handleImageUpload} />
      </div>

      {isProcessing && (
        <div className="ocr-progress">
          <p>{status} ({Math.round(progress)}%)</p>
          <progress value={progress} max="100"></progress>
        </div>
      )}

      {image && !isProcessing && (
        <div className="image-preview" style={{marginBottom: '1rem'}}>
          <img src={image} alt="Preview" style={{maxWidth: '100%', borderRadius: '8px'}} />
        </div>
      )}

      <button onClick={handleExtract} disabled={isProcessing || !image}>
        {isProcessing ? 'Extracting...' : 'Extract Text'}
      </button>
    </div>
  );
}

export default OcrExtractor; 