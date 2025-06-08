import React, { useState } from 'react'

function SubjectForm({ onAdd }) {
  const [subject, setSubject] = useState('')
  const [grade, setGrade] = useState('')
  const [unit, setUnit] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!subject || !grade || !unit) return

    onAdd({ subject, grade, unit: parseFloat(unit) })
    setSubject('')
    setGrade('')
    setUnit('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Subject Name"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <input
        type="number"
        step="0.25"
        min="1.00"
        max="5.00"
        placeholder="Grade (e.g. 1.50)"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
      />
      <input
        type="number"
        min="1"
        placeholder="Units"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      />
      <button type="submit">
        Add Subject
      </button>
    </form>
  )
}

export default SubjectForm
