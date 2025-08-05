  import { StrictMode } from 'react'
  import { createRoot } from 'react-dom/client'
  import { createBrowserRouter, RouterProvider } from 'react-router-dom'
  import { AuthProvider } from './contexts/AuthContext.tsx'
  import { Outlet } from 'react-router-dom'
  import PrivateRoute from './Pages/PrivateRoute'
  import { ProductProvider } from './contexts/ProductContext.tsx'
  import { CartProvider } from './contexts/CartContext.tsx'
  import { ThankYouPage, Home, CheckoutPage, ProductPage, LoginOurRegister } from './Pages'
  import './index.css'

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <CartProvider><ProductProvider><AuthProvider><Outlet /></AuthProvider></ProductProvider></CartProvider>
      ),
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "home",
          element: <Home />
        },
        {
          path: "ProductPage",
          element: <ProductPage />
        },
        {
          path: "ThankYouPage",
          element: <ThankYouPage />
        },
        {
          path: "LoginOurRegister",
          element: <LoginOurRegister />
        },
        {
          path: "CheckoutPage",
          element: <PrivateRoute />,
          children: [{ index: true, element: <CheckoutPage /> }]
        }
      ]
    }
  ])

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
