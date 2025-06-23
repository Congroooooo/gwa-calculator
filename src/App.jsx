import React, { useState } from 'react'
import SubjectForm from './components/SubjectForm'
import SubjectTable from './components/SubjectTable'
import FinalGradeCalculator from './components/FinalGradeCalculator'
import OcrExtractor from './components/OcrExtractor'
import './styles.css'
import stiLogo from './assets/sti logo.png'

function App() {
  const [subjects, setSubjects] = useState([])
  const [editingIndex, setEditingIndex] = useState(null)
  const [editingSubject, setEditingSubject] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState('gwa')

  const addSubject = (subject) => {
    setLoading(true)
    setTimeout(() => {
      setSubjects([...subjects, subject])
      setLoading(false)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 1200)
    }, 500)
  }

  const removeSubject = (index) => {
    const updated = [...subjects]
    updated.splice(index, 1)
    setSubjects(updated)
    if (editingIndex === index) {
      setEditingIndex(null)
      setEditingSubject(null)
    }
  }

  const startEdit = (index) => {
    setEditingIndex(index)
    setEditingSubject(subjects[index])
  }

  const updateSubject = (subject) => {
    setLoading(true)
    setTimeout(() => {
      const updated = [...subjects]
      updated[editingIndex] = subject
      setSubjects(updated)
      setEditingIndex(null)
      setEditingSubject(null)
      setLoading(false)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 1200)
    }, 500)
  }

  const cancelEdit = () => {
    setEditingIndex(null)
    setEditingSubject(null)
  }

  const calculateGWA = () => {
    let totalUnits = 0
    let totalWeighted = 0

    subjects.forEach(({ grade, unit }) => {
      const numGrade = parseFloat(grade)
      const numUnit = parseFloat(unit)
      if (!isNaN(numGrade) && !isNaN(numUnit) && numGrade <= 5.0) {
        totalUnits += numUnit
        totalWeighted += numGrade * numUnit
      }
    })

    return totalUnits === 0 ? "N/A" : (totalWeighted / totalUnits).toFixed(2)
  }

  const handleOcrExtraction = (text) => {
    const lines = text.split('\n');
    const newSubjects = [];
    const gradePattern = /(1\.[0-9]{2}|2\.[0-9]{2}|3\.[0-9]{2}|4\.[0-9]{2}|5\.00)/;
    const unitPattern = /\b([1-9])\b/;

    lines.forEach(line => {
      const gradeMatch = line.match(gradePattern);
      const unitMatch = line.match(unitPattern);

      if (gradeMatch && unitMatch) {
        const grade = gradeMatch[0];
        const unit = unitMatch[0];
        let subject = line.replace(grade, '').replace(unit, '').trim();
        
        if (!subject) {
          subject = `Subject ${subjects.length + newSubjects.length + 1}`;
        }

        newSubjects.push({
          subject,
          grade,
          unit: parseInt(unit, 10)
        });
      }
    });

    if (newSubjects.length > 0) {
      setSubjects(prev => [...prev, ...newSubjects]);
      setActiveTab('gwa');
      alert(`${newSubjects.length} subjects extracted and added to the GWA Calculator.`);
    } else {
      alert('Could not extract any subjects. Please try with a clearer image or a different format.');
    }
  }

  const renderGwaCalculator = () => (
    <>
      {/* LEFT: Input Form */}
      <div className="form-container padded-form-container">
        <h2 className="title">{editingIndex !== null ? 'Edit Subject' : 'Add Subject'}</h2>
        <SubjectForm
          onAdd={addSubject}
          onUpdate={updateSubject}
          onCancel={cancelEdit}
          editingSubject={editingSubject}
          isEditing={editingIndex !== null}
          loading={loading}
          success={success}
          subjectCount={subjects.length}
        />
      </div>

      {/* RIGHT: List of Inputted Subjects */}
      <div className="list-container">
        <h2 className="title">Subject List</h2>
        <SubjectTable
          subjects={subjects}
          onRemove={removeSubject}
          onEdit={startEdit}
          emptyMessage="No subjects yet. Add your first subject!"
          ariaLabels={{edit: 'Edit subject', remove: 'Remove subject'}}
        />
        <div className="result">
          <strong>GWA:</strong> {calculateGWA()}
        </div>
      </div>
    </>
  )

  return (
    <>
      <header className="header">
        <a href="/" className="sti-logo-link" tabIndex={0} aria-label="Go to home">
          <img src={stiLogo} alt="STI Logo" className="sti-logo" />
        </a>
        <span className="header-title">STI GWA Calculator</span>
      </header>
      <div className="main-container">
        <div className="tabs">
          <button className={`tab-btn ${activeTab === 'gwa' ? 'active' : ''}`} onClick={() => setActiveTab('gwa')}>
            GWA Calculator
          </button>
          <button className={`tab-btn ${activeTab === 'final-grade' ? 'active' : ''}`} onClick={() => setActiveTab('final-grade')}>
            Final Grade Calculator
          </button>
          <button className={`tab-btn ${activeTab === 'ocr' ? 'active' : ''}`} onClick={() => setActiveTab('ocr')}>
            Extract from Image
          </button>
        </div>

        <div className="calculator-container">
          {activeTab === 'gwa' && renderGwaCalculator()}
          {activeTab === 'final-grade' && <FinalGradeCalculator />}
          {activeTab === 'ocr' && <OcrExtractor onExtracted={handleOcrExtraction} />}
        </div>
        
        <div className="grading-legend">
          <div className="legend-title">Grading System:</div>
          <ul className="legend-grid">
            <li>☆ 97.50 - 100% (1.00) Excellent</li>
            <li>☆ 94.50 - 97.49% (1.25) Very Good</li>
            <li>☆ 91.50 - 94.49% (1.50) Very Good</li>
            <li>☆ 88.50 - 91.49% (1.75) Very Good</li>
            <li>☆ 85.50 - 88.49% (2.00) Satisfactory</li>
            <li>☆ 81.50 - 85.49% (2.25) Satisfactory</li>
            <li>☆ 77.50 - 81.49% (2.50) Satisfactory</li>
            <li>☆ 73.50 - 77.49% (2.75) Fair</li>
            <li>☆ 69.50 - 73.49% (3.00) Fair</li>
            <li>☆ 69.49 % and below (5.00) Failed</li>
          </ul>
        </div>

        <div className="about-section">
          <h3 className="title">About This Calculator</h3>
          <p>
            This web application is a specialized tool for students of STI College to calculate their General Weighted Average (GWA) and individual subject final grades. Since STI utilizes a unique grading system, standard grade calculators may not provide accurate results. This tool is tailored to match STI's specific grade computation.
          </p>
          
          <h4>How It Works</h4>
          <ul>
            <li><strong>GWA Calculator:</strong> Enter your subjects, final grades (e.g., 1.50, 2.75), and corresponding units. The calculator will compute your GWA in real-time.</li>
            <li><strong>Final Grade Calculator:</strong> Input your term grades (Prelim, Midterm, Pre-Finals, and Finals) for a single subject to calculate your final numerical grade based on the standard STI weightings: Prelim (20%), Midterm (20%), Pre-Finals (20%), and Finals (40%).</li>
            <li><strong>Extract from Image:</strong> Upload a screenshot of your grades from the STI portal. The system uses Optical Character Recognition (OCR) to automatically read and populate the subject list for you.</li>
          </ul>

          <h4>Disclaimer</h4>
          <p>
            This website is a personal project created to enhance coding skills and is not an official tool of STI College. While it aims for accuracy based on the known grading system, it should be used for estimation and educational purposes only. Always refer to official STI College documents for your final, official grades.
          </p>

          <div className="developer-credit">
            <p>Developed by Nicko Balmes</p>
          </div>
        </div>

      </div>
    </>
  );
}

export default App
