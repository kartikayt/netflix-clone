import {
  Navigate,
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/layout";
import Browse from "./pages/browse";
import Login from "./pages/login";
import { AuthProvider, useAuth } from "./common/auth";
import Profiles from "./pages/profiles";

function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const { user } = useAuth();
  // const [isLogged, setisLogged] = useState(false);

  // useEffect(() => {

  // })
  // if (!user) {
  //   return <Navigate to="/login" />;
  // }
  return children;
}

function AppRouter() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route index element={<Profiles />} />
          <Route path="manageprofiles" element={<Profiles edit />} />
          <Route path="browse" element={<Layout />}>
            <Route index element={<Browse />} />
          </Route>
          <Route path="browse" element={<Layout />}>
            <Route index element={<h1>Latest</h1>} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </>,
    ),
  );
  return <RouterProvider router={router}></RouterProvider>;
}

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
