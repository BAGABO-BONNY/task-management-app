import React, { useState } from "react";

import { PenIcon, BanIcon } from "lucide-react";

import { CreateTaskModal } from "../components/CreateTaskModal";
import { useTasks } from "../context/TaskProvider";
import { Link } from "react-router-dom";
import { apiUrl } from "../lib/constants";
import { useQueryClient } from "react-query";

export default function Home() {
  const { tasks } = useTasks();
  const [isOpen, setIsOpen] = useState(false);
  const client = useQueryClient();

  return (
    <main className="flex flex-col w-full h-full justify-center items-center overflow-y-auto">
      <div className="flex flex-col justify-center items-center mt-8">
        <h2 className="text-2xl">Task Manager</h2>
        <div>
          <p>Manage your day yo day task from today!</p>
        </div>
      </div>
      <div className="mt-4">
        <button
          type="button"
          className="px-4 py-2 bg-green-500 text-gray-950 rounded-md"
          onClick={() => setIsOpen(!isOpen)}
        >
          Create Task
        </button>
      </div>
      <div className="flex flex-col gap-3 mt-5 w-full md:w-[500px] px-3 mb-9 ">
        {tasks.map((task, idx) => (
          <div
            key={task._id}
            className="bg-gray-800 px-3 py-2 min-h-24 rounded-md cursor-pointer"
          >
            <div className="flex w-full justify-between">
              <p className="font-bold">{task.title}</p>
              <div className="flex gap-4">
                <Link to={`/edit/${task._id}`}>
                  <PenIcon className="h-5 w-5 text-yellow-400" />
                </Link>

                <BanIcon
                  className="h-5 w-5 text-red-500"
                  onClick={async () => {
                    const hasAllowedIt = confirm(
                      "Are you sure you want to delete this?"
                    );

                    if (hasAllowedIt) {
                      const resp = await fetch(
                        `${apiUrl}/api/v1/tasks/delete`,
                        {
                          method: "DELETE",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ id: task._id }),
                        }
                      );

                      const data = await resp.json();

                      if (data.success) {
                        client.setQueryData("getAllTasks", (oldData) => ({
                          tasks: oldData.tasks.filter(
                            (task) => task._id !== data.task._id
                          ),
                        }));
                      }
                    }
                  }}
                />
              </div>
            </div>
            <p className="font-light text-gray-200">{task.description}</p>
          </div>
        ))}
      </div>
      {isOpen ? (
        <CreateTaskModal
          onRequestClose={() => setIsOpen(!isOpen)}
          open={isOpen}
        />
      ) : null}
    </main>
  );
}
