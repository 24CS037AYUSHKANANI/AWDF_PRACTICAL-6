import { useState } from "react";

export default function AddTask({ onAdd, disabled }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");

  async function submit(event) {
    event.preventDefault();

    if (!title.trim()) return;

    await onAdd({
      title,
      description,
      priority
    });

    setTitle("");
    setDescription("");
    setPriority("low");
  }

  return (
    <form className="add-box" onSubmit={submit}>
      <label>Task name</label>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="e.g. Complete AWDF practical"
        required
      />

      <label>Description</label>
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Short task description"
      />

      <label>Priority</label>
      <select
        value={priority}
        onChange={e => setPriority(e.target.value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button disabled={disabled}>
        {disabled ? "Adding..." : "Create Task"}
      </button>
    </form>
  );
}
