import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './app/store';
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from 'react-router-dom';
import LoginPage from './component/LoginPage.jsx';
import Protected from './component/Protected.jsx';
import RegisterPage from './component/RegisterPage.jsx';
import Addnewtask from './component/Addnewtask.jsx'
import Showtasks from './component/Showtasks.jsx';
import LandingPage from './component/LandingPage.jsx';

const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  children: [
    {
      path: "/",
      element: <LandingPage />
    },
    {
      path: "*",
      element: <LandingPage />
    },
    {
      path: "/login",
      element: <LoginPage />
    },
    {
      path: "/register",
      element: <RegisterPage />
    },
    {
      path: "/addtask",
      element: <Protected Element={Addnewtask} />
    },
    {
      path: "/showtask",
      element: <Protected Element={Showtasks} />
    },
  ]
}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
  </StrictMode>
)
