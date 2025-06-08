import React, { useState } from 'react'
import SubjectForm from './components/SubjectForm'
import SubjectTable from './components/SubjectTable'
import './styles.css'

function App() {
  const [subjects, setSubjects] = useState([])

  const addSubject = (subject) => {
    setSubjects([...subjects, subject])
  }

  const removeSubject = (index) => {
    const updated = [...subjects]
    updated.splice(index, 1)
    setSubjects(updated)
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

return (
    <>
      <header className="header">STI GWA Calculator</header>
      <div className="main-container">
        {/* LEFT: Input Form */}
        <div className="form-container">
          <h2 className="title">Add Subject</h2>
          <SubjectForm onAdd={addSubject} />
        </div>

        {/* RIGHT: List of Inputted Subjects */}
        <div className="list-container">
          <h2 className="title">Subject List</h2>
          <SubjectTable subjects={subjects} onRemove={removeSubject} />
          <div className="result">
            <strong>GWA:</strong> {calculateGWA()}
          </div>
        </div>
      </div>
    </>
  );
}

export default App
