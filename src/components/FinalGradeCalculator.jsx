import React, { useState } from 'react';

const gradingSystem = [
  { grade: 1.00, range: [97.5, 100], description: 'Excellent' },
  { grade: 1.25, range: [94.5, 97.49], description: 'Very Good' },
  { grade: 1.50, range: [91.5, 94.49], description: 'Very Good' },
  { grade: 1.75, range: [88.5, 91.49], description: 'Very Good' },
  { grade: 2.00, range: [85.5, 88.49], description: 'Satisfactory' },
  { grade: 2.25, range: [81.5, 85.49], description: 'Satisfactory' },
  { grade: 2.50, range: [77.5, 81.49], description: 'Satisfactory' },
  { grade: 2.75, range: [73.5, 77.49], description: 'Fair' },
  { grade: 3.00, range: [69.5, 73.49], description: 'Fair' },
  { grade: 5.00, range: [0, 69.49], description: 'Failed' }
];

const getGradeFromPercentage = (percentage) => {
  for (const item of gradingSystem) {
    if (percentage >= item.range[0] && percentage <= item.range[1]) {
      return item;
    }
  }
  return null;
};

function FinalGradeCalculator() {
  const [grades, setGrades] = useState({
    prelim: '',
    midterm: '',
    prefinals: '',
    finals: '',
  });

  const [finalGrade, setFinalGrade] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGrades(prev => ({ ...prev, [name]: value }));
  };

  const calculateFinalGrade = (e) => {
    e.preventDefault();
    const { prelim, midterm, prefinals, finals } = grades;
    const p = parseFloat(prelim);
    const m = parseFloat(midterm);
    const pf = parseFloat(prefinals);
    const f = parseFloat(finals);

    if (isNaN(p) || isNaN(m) || isNaN(pf) || isNaN(f)) {
        alert('Please fill in all grade components.');
        return;
    }

    const finalPercentage = (p * 0.20) + (m * 0.20) + (pf * 0.20) + (f * 0.40);
    const result = {
        percentage: finalPercentage.toFixed(2),
        ...getGradeFromPercentage(finalPercentage)
    };

    setFinalGrade(result);
  };

  const clearForm = () => {
    setGrades({ prelim: '', midterm: '', prefinals: '', finals: '' });
    setFinalGrade(null);
  }

  return (
    <>
      <div className="form-container">
        <h2 className="title">Final Grade Calculator</h2>
        <form onSubmit={calculateFinalGrade}>
          <div className="input-group">
            <label htmlFor="prelim">Prelim (20%)</label>
            <input type="number" id="prelim" name="prelim" value={grades.prelim} onChange={handleChange} placeholder="Enter prelim grade" required />
          </div>
          <div className="input-group">
            <label htmlFor="midterm">Midterm (20%)</label>
            <input type="number" id="midterm" name="midterm" value={grades.midterm} onChange={handleChange} placeholder="Enter midterm grade" required />
          </div>
          <div className="input-group">
            <label htmlFor="prefinals">Pre-Finals (20%)</label>
            <input type="number" id="prefinals" name="prefinals" value={grades.prefinals} onChange={handleChange} placeholder="Enter pre-finals grade" required />
          </div>
          <div className="input-group">
            <label htmlFor="finals">Finals (40%)</label>
            <input type="number" id="finals" name="finals" value={grades.finals} onChange={handleChange} placeholder="Enter finals grade" required />
          </div>
          <button type="submit">Calculate Final Grade</button>
        </form>
        {finalGrade && (
            <button type="button" onClick={clearForm} style={{marginTop: 8, width: '100%', background: '#6c757d'}}>
                Clear
            </button>
        )}
      </div>

      <div className="list-container">
        {finalGrade ? (
          <div className="final-grade-result">
             <h3 className="title">Result</h3>
             <div className="result-item">
                <span>Final Percentage:</span>
                <strong>{finalGrade.percentage}%</strong>
             </div>
             <div className="result-item">
                <span>Equivalent Grade:</span>
                <strong>{finalGrade.grade.toFixed(2)}</strong>
             </div>
             <div className="result-item">
                <span>Description:</span>
                <strong>{finalGrade.description}</strong>
             </div>
          </div>
        ) : (
            <div className="empty-table-state">
                <span role="img" aria-label="memo" style={{fontSize: '2rem', display: 'block', marginBottom: 8}}>📝</span>
                <div>Enter your term grades to see the final computation.</div>
            </div>
        )}
      </div>
    </>
  );
}

export default FinalGradeCalculator; 