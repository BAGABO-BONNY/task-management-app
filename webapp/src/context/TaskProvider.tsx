import React, { createContext, useContext } from "react";
import { useQuery } from "react-query";
import { apiUrl } from "../lib/constants";

const TaskContext = createContext({ tasks: [] });

export default TaskContext;

const getTasks = async () => {
  const resp = await fetch(`${apiUrl}/api/v1/tasks`);

  return resp.json();
};

export const TaskContextProvider = ({ children }) => {
  const { data, isLoading } = useQuery(["getAllTasks"], getTasks);

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <TaskContext.Provider value={{ tasks: data.tasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
