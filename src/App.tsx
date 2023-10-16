import { useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { translateMenu } from "./common/components/menu/translations/ptBr";
import { ReduxState } from "./redux/types";
import { Purchase } from "./screens/components/forms/register-purchase-form";
import { NotFoundScreens } from "./screens/not-found/not-found";
import { RegisterCategoriesScreen } from "./screens/register-categories/register-categories-screen";
import { RegisterClientScreen } from "./screens/register-client/register-client-screen";
import { RegisterProductsScreen } from "./screens/register-products/register-products-screen";
import { RegisterProviderScreen } from "./screens/register-provider/register-provider-screen";
import { RegisterPurchaseScreen } from "./screens/register-purchase/register-purchase-screen";
import { RegisterSaleScreen } from "./screens/register-sale/register-sale-screen";

function App() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const providers = useSelector(
    (state: ReduxState) => state.providers.providerList
  );
  const clients = useSelector((state: ReduxState) => state.clients.clientsList);
  const categories = useSelector(
    (state: ReduxState) => state.categories.categoriesList
  );

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path={translateMenu.routes.clients}
            element={<RegisterClientScreen clients={clients} />}
          />
          <Route
            path={translateMenu.routes.categories}
            element={
              <RegisterCategoriesScreen
                categories={categories}
              />
            }
          />
          <Route
            path={translateMenu.routes.provider}
            element={<RegisterProviderScreen providers={providers} />}
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
            element={<RegisterSaleScreen clients={clients} />}
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
            element={<RegisterClientScreen clients={clients} />}
          />
          <Route path="*" element={<NotFoundScreens />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
