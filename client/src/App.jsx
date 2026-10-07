import { useEffect, useState } from "react";
import { useTasks } from "./hooks/useTasks";
import AddTask from "./ui/AddTask";
import TaskCard from "./ui/TaskCard";
import Notice from "./ui/Notice";
import "./styles.css";

export default function App() {
  const [notice, setNotice] = useState({ text: "", type: "success" });

  function showNotice(text, type = "success") {
    setNotice({ text, type });
  }

  const {
    items,
    loading,
    working,
    error,
    reload,
    create,
    update,
    remove
  } = useTasks(showNotice);

  useEffect(() => {
    if (!notice.text) return;

    const timer = setTimeout(
      () => setNotice({ text: "", type: "success" }),
      2400
    );

    return () => clearTimeout(timer);
  }, [notice]);

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <span className="course">ITUE301 · AWDF</span>
          <h1>My Task Board</h1>
          <p>Ayush Kanani · 24CS037</p>
        </div>

        <div className="api-state">
          <span />
          API + MongoDB
        </div>
      </header>

      <div className="content">
        <section className="create-panel">
          <h2>Add a task</h2>
          <p>Create a task and save it directly to the database.</p>
          <AddTask onAdd={create} disabled={working} />
        </section>

        <section className="tasks-panel">
          <div className="heading">
            <div>
              <h2>Tasks</h2>
              <p>
                {items.length} saved task{items.length === 1 ? "" : "s"}
              </p>
            </div>

            <button onClick={reload} disabled={loading} className="reload">
              {loading ? "Loading..." : "Reload"}
            </button>
          </div>

          {error && (
            <div className="server-error">
              <strong>Could not load tasks.</strong>
              <span>{error}</span>
              <button onClick={reload}>Retry</button>
            </div>
          )}

          {loading ? (
            <div className="placeholder">Getting tasks from MongoDB...</div>
          ) : items.length === 0 ? (
            <div className="placeholder">
              No tasks found. Create one from the form.
            </div>
          ) : (
            <div className="cards">
              {items.map(task => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={update}
                  onRemove={remove}
                  disabled={working}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      <footer>
        React Frontend → Express API → Mongoose → MongoDB
      </footer>

      <Notice text={notice.text} type={notice.type} />
    </div>
  );
}
