import { useCallback, useEffect, useState } from "react";
import {
  getTasks,
  addTask,
  editTask,
  removeTask
} from "../lib/taskApi";

export function useTasks(showNotice) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState("");

  const reload = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const result = await getTasks();
      setItems(result.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  async function create(data) {
    setWorking(true);
    try {
      const result = await addTask(data);
      setItems(current => [result.data, ...current]);
      showNotice("Task added");
    } catch (err) {
      showNotice(err.message, "error");
    } finally {
      setWorking(false);
    }
  }

  async function update(taskId, data) {
    setWorking(true);
    try {
      const result = await editTask(taskId, data);
      setItems(current =>
        current.map(item => item._id === taskId ? result.data : item)
      );
      showNotice("Task updated");
    } catch (err) {
      showNotice(err.message, "error");
    } finally {
      setWorking(false);
    }
  }

  async function remove(taskId) {
    setWorking(true);
    try {
      await removeTask(taskId);
      setItems(current => current.filter(item => item._id !== taskId));
      showNotice("Task removed");
    } catch (err) {
      showNotice(err.message, "error");
    } finally {
      setWorking(false);
    }
  }

  return {
    items,
    loading,
    working,
    error,
    reload,
    create,
    update,
    remove
  };
}
