import { useState } from "react";

export default function TaskCard({ task, onEdit, onRemove, disabled }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(task.title);
  const [done, setDone] = useState(task.completed);

  async function save() {
    await onEdit(task._id, {
      title: name,
      completed: done
    });
    setEditing(false);
  }

  function askDelete() {
    const answer = window.confirm(
      `Are you sure you want to delete "${task.title}"?`
    );

    if (answer) onRemove(task._id);
  }

  return (
    <div className={`card ${task.completed ? "completed" : ""}`}>
      {editing ? (
        <input
          className="edit"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      ) : (
        <h3>{task.title}</h3>
      )}

      <p>{task.description || "No description added."}</p>

      <div className="badges">
        <span className={`badge ${task.priority}`}>
          {task.priority}
        </span>
        <span className="status">
          {task.completed ? "Completed" : "Pending"}
        </span>
      </div>

      {editing && (
        <label className="complete-check">
          <input
            type="checkbox"
            checked={done}
            onChange={e => setDone(e.target.checked)}
          />
          Mark as completed
        </label>
      )}

      <div className="card-actions">
        {editing ? (
          <>
            <button onClick={save} disabled={disabled}>Save</button>
            <button
              onClick={() => setEditing(false)}
              className="light"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setEditing(true)} disabled={disabled}>
              Edit
            </button>
            <button
              onClick={askDelete}
              disabled={disabled}
              className="remove"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
