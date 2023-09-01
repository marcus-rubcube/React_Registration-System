import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RegisterClientScreen } from "./screens/register-client-screen";
import { RegisterCategoriesScreen } from "./screens/register-categories-screen";
import { translateMenu } from "./components/menu/translations/ptBr";
import { RegisterProviderScreen } from "./screens/register-provider-screen";
import { RegisterProductsScreen } from "./screens/register-products-screen";
import { RegisterSaleScreen } from "./screens/register-sale-screen";
import { RegisterPurchaseScreen } from "./screens/register-purchase-screen";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RegisterClientScreen />,
    },
    {
      path: translateMenu.routes.clients,
      element: <RegisterClientScreen />,
    },
    {
      path: translateMenu.routes.categories,
      element: <RegisterCategoriesScreen />,
    },
    {
      path: translateMenu.routes.provider,
      element: <RegisterProviderScreen />,
    },
    {
      path: translateMenu.routes.products,
      element: <RegisterProductsScreen/>,
    },
    {
      path: translateMenu.routes.sale,
      element: <RegisterSaleScreen/>
    },
    {
      path: translateMenu.routes.purchase,
      element: <RegisterPurchaseScreen/>
    }
  ]);

  return (
    <div className="App">
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </div>
  );
}

export default App;
