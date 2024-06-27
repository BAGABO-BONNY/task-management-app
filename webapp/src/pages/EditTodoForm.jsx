import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { apiUrl } from "../lib/constants";

export default function EditTodoForm() {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [error, setError] = useState("");

  const queryClient = useQueryClient();
  const { id: taskId } = useParams();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resp = await fetch(`${apiUrl}/api/v1/tasks/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, id: taskId }),
    });

    const data = await resp.json();

    if (data.success) {
      queryClient.setQueryData("getAllTasks", (oldData) => ({
        tasks: [...oldData.tasks, data.task],
      }));
    } else if (data.error) {
      setError(data.error);
    }
  };

  return (
    <main className="flex flex-col w-full h-full justify-center items-center overflow-y-auto">
      <h2 className="text-2xl">Edit Task</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 mt-4 w-full md:w-[500px] px-3"
      >
        <label>Title</label>
        <input
          className="input"
          type="text"
          name="title"
          placeholder="eg: Go to school."
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <label>Description</label>
        <textarea
          rows={5}
          type="text"
          className="input"
          name="title"
          placeholder="eg: Wash up and do a short prep"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
        />
        <div className="flex gap-5">
          <input type="checkbox" name="completed" />
          <label>Completed</label>
        </div>
        {error ? <p className="text-red-300">{error}</p> : null}
        <div className="flex gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-gray-950 rounded-md"
          >
            Update
          </button>
          <button type="button" onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}
