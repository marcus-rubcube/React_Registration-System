import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RegisterClientScreen } from "./screens/register-client/register-client-screen";
import { RegisterCategoriesScreen } from "./screens/register-categories/register-categories-screen";
import { translateMenu } from "./common/components/menu/translations/ptBr";
import { RegisterProviderScreen } from "./screens/register-provider/register-provider-screen";
import { RegisterProductsScreen } from "./screens/register-products/register-products-screen";
import { RegisterSaleScreen } from "./screens/register-sale/register-sale-screen";
import { RegisterPurchaseScreen } from "./screens/register-purchase/register-purchase-screen";

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
      element: <RegisterProductsScreen />,
    },
    {
      path: translateMenu.routes.sale,
      element: <RegisterSaleScreen />,
    },
    {
      path: translateMenu.routes.purchase,
      element: <RegisterPurchaseScreen />,
    },
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
