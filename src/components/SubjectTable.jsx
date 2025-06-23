import React from 'react'

function SubjectTable({ subjects, onRemove, onEdit, emptyMessage, ariaLabels }) {
  if (!subjects.length) {
    return (
      <div className="empty-table-state">
        <span role="img" aria-label="notebook" style={{fontSize: '2rem', display: 'block', marginBottom: 8}}>📒</span>
        <div>{emptyMessage || 'No data available.'}</div>
      </div>
    )
  }
  return (
    <table className="w-full border subject-table responsive-table">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">Subject</th>
          <th className="border p-2">Grade</th>
          <th className="border p-2">Units</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {subjects.map((subj, index) => (
          <tr key={index}>
            <td className="border p-2">{subj.subject}</td>
            <td className="border p-2">{subj.grade}</td>
            <td>{subj.unit}</td>
            <td>
              <button
                className="remove-btn"
                onClick={() => onRemove(index)}
                aria-label={ariaLabels?.remove || 'Remove'}
              >
                <span role="img" aria-label="remove">🗑️</span> Remove
              </button>
              <button
                className="edit-btn"
                onClick={() => onEdit(index)}
                aria-label={ariaLabels?.edit || 'Edit'}
              >
                <span role="img" aria-label="edit">✏️</span> Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default SubjectTable
