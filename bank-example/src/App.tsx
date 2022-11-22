import './App.css';
import { Navigate, createBrowserRouter, RouterProvider } from "react-router-dom";
import {BalancePage} from "./pages/BalancePage";
import { LoginPage } from './pages/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: (<Navigate to ="/login"/>), 
  },
  {
    path: "/login",
    element: (
      <LoginPage/>
    ),
  },
  {
    path: "/balance",
    element: <BalancePage/>,
  },
]);
function App() {
  return (
    <div className="App">
  <RouterProvider router={router} />

    </div>
  );
}

export default App;
