import React, { useState } from 'react'

function SubjectForm({ onAdd, onUpdate, onCancel, editingSubject, isEditing, loading, success, subjectCount }) {
  const [subject, setSubject] = useState(editingSubject ? editingSubject.subject : '')
  const [grade, setGrade] = useState(editingSubject ? editingSubject.grade : '')
  const [unit, setUnit] = useState(editingSubject ? editingSubject.unit : '')

  React.useEffect(() => {
    if (editingSubject) {
      setSubject(editingSubject.subject)
      setGrade(editingSubject.grade)
      setUnit(editingSubject.unit)
    } else {
      setSubject('')
      setGrade('')
      setUnit('')
    }
  }, [editingSubject])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!grade || !unit) return
    let finalSubject = subject
    if (!subject.trim()) {
      finalSubject = `Subject ${subjectCount + 1}`
    }
    if (isEditing) {
      onUpdate({ subject: finalSubject, grade, unit: parseFloat(unit) })
    } else {
      onAdd({ subject: finalSubject, grade, unit: parseFloat(unit) })
    }
    setSubject('')
    setGrade('')
    setUnit('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="subject-input">Subject Name <span style={{fontWeight:400, color:'#888'}}>(optional)</span></label>
        <input
          id="subject-input"
          type="text"
          placeholder={`Subject ${subjectCount + 1}`}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={{fontSize: '16px'}}
        />
      </div>
      <div className="input-group">
        <label htmlFor="grade-input">Grade</label>
        <input
          id="grade-input"
          type="number"
          step="0.25"
          min="1.00"
          max="5.00"
          placeholder="Grade (e.g. 1.50)"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          style={{fontSize: '16px'}}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="unit-input">Units</label>
        <input
          id="unit-input"
          type="number"
          min="1"
          placeholder="Units"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          style={{fontSize: '16px'}}
          required
        />
      </div>
      <button type="submit" disabled={loading} className={success ? 'success-btn' : ''}>
        {loading ? (isEditing ? 'Updating...' : 'Adding...') : success ? 'Success!' : isEditing ? 'Update Subject' : 'Add Subject'}
      </button>
      {isEditing && (
        <button type="button" onClick={onCancel} style={{marginTop: 8}} aria-label="Cancel editing">
          Cancel
        </button>
      )}
    </form>
  )
}

export default SubjectForm
