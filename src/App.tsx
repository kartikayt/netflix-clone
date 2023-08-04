import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/layout";
import Browse from "./pages/browse";

function AppRouter() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            <h1 className="text-3xl font-bold underline ">Hello world!</h1>
          }
        />
        <Route path="/login" element={<h1>Login</h1>} />

        <Route path="/browse" element={<Layout />}>
          <Route index element={<Browse />} />
        </Route>
      </>,
    ),
  );
  return <RouterProvider router={router}></RouterProvider>;
}

export default function App() {
  return <AppRouter />;
}