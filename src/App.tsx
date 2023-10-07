import { BrowserRouter, Route, Routes } from "react-router-dom";
import { translateMenu } from "./common/components/menu/translations/ptBr";
import { RegisterCategoriesScreen } from "./screens/register-categories/register-categories-screen";
import { RegisterClientScreen } from "./screens/register-client/register-client-screen";
import { RegisterProductsScreen } from "./screens/register-products/register-products-screen";
import { RegisterProviderScreen } from "./screens/register-provider/register-provider-screen";
import { RegisterPurchaseScreen } from "./screens/register-purchase/register-purchase-screen";
import { RegisterSaleScreen } from "./screens/register-sale/register-sale-screen";
import { NotFoundScreens } from "./screens/not-found/not-found";
import { useState } from "react";
import { Categorie } from "./screens/components/forms/register-categories-form";
import { Provider } from "./screens/components/forms/register-provider-form";
import { Purchase } from "./screens/components/forms/register-purchase-form";
import { Client } from "./screens/components/forms/register-client-form";

function App() {
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [clients, setClients] = useState<Client[]>([]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path={translateMenu.routes.clients}
            element={
              <RegisterClientScreen clients={clients} setClients={setClients} />
            }
          />
          <Route
            path={translateMenu.routes.categories}
            element={
              <RegisterCategoriesScreen
                categories={categories}
                setCategories={setCategories}
              />
            }
          />
          <Route
            path={translateMenu.routes.provider}
            element={
              <RegisterProviderScreen
                setProviders={setProviders}
                providers={providers}
              />
            }
          />
          <Route
            path={translateMenu.routes.products}
            element={
              <RegisterProductsScreen
                providers={providers}
                categories={categories}
              />
            }
          />
          <Route
            path={translateMenu.routes.sale}
            element={<RegisterSaleScreen
              clients={clients}
              setClients={setClients} />}
          />
          <Route
            path={translateMenu.routes.purchase}
            element={
              <RegisterPurchaseScreen
                providers={providers}
                purchases={purchases}
                setPurchases={setPurchases}
              />
            }
          />
          <Route
            path="/"
            element={
              <RegisterClientScreen clients={clients} setClients={setClients} />
            }
          />
          <Route path="*" element={<NotFoundScreens />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
