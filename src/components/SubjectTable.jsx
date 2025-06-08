import React from 'react'

function SubjectTable({ subjects, onRemove }) {
  return (
    <table className="w-full border">
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
                onClick={() => onRemove(index)}
              >
                Remove
              </button>
                <button 
                    onclick={() => onEdit(index)}>Edit
                </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default SubjectTable
