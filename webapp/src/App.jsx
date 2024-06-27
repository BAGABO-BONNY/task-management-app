import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import Home from "./pages/Home";
import EditTodoForm from "./pages/EditTodoForm";
import { TaskContextProvider } from "./context/TaskProvider";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/edit/:id" element={<EditTodoForm />} />
    </Route>
  )
);

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <TaskContextProvider>
        <RouterProvider router={router} />
      </TaskContextProvider>
    </QueryClientProvider>
  );
}

export default App;
