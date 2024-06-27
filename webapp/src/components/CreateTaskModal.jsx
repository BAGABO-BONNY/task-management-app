import { useState } from "react";
import { Modal } from "./Modal";
import { apiUrl } from "../lib/constants";
import { useQueryClient } from "react-query";

export const CreateTaskModal = ({ onRequestClose, open }) => {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resp = await fetch(`${apiUrl}/api/v1/tasks/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await resp.json();

    if (data.success) {
      queryClient.setQueryData("getAllTasks", (oldData) => ({
        tasks: [...oldData.tasks, data.task],
      }));
      onRequestClose();
    } else if (data.error) {
      setError(data.error);
    }
  };

  return (
    <Modal onRequestClose={onRequestClose} isOpen={open}>
      <div>
        <h2 className="text-center text-xl">Create a Task</h2>
        <p className="mt-3">
          Provide the description and the title of your task
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
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
          {error ? <p className="text-red-300">{error}</p> : null}
          <div className="flex gap-4">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-gray-950 rounded-md"
            >
              Create
            </button>
            <button type="button" onClick={onRequestClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
