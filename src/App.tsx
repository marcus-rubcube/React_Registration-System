import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { translateMenu } from "./common/components/menu/translations/ptBr";
import { ReduxState } from "./redux/types";
import { NotFoundScreens } from "./screens/not-found/not-found";
import { RegisterCategoriesScreen } from "./screens/register-categories/register-categories-screen";
import { RegisterClientScreen } from "./screens/register-client/register-client-screen";
import { RegisterProductsScreen } from "./screens/register-products/register-products-screen";
import { RegisterProviderScreen } from "./screens/register-provider/register-provider-screen";
import { RegisterPurchaseScreen } from "./screens/register-purchase/register-purchase-screen";
import { RegisterSaleScreen } from "./screens/register-sale/register-sale-screen";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const purchases = useSelector(
    (state: ReduxState) => state.purchases.purchasesList
  );
  const providers = useSelector(
    (state: ReduxState) => state.providers.providerList
  );
  const clients = useSelector((state: ReduxState) => state.clients.clientsList);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path={translateMenu.routes.clients}
            element={<RegisterClientScreen />}
          />
          <Route
            path={translateMenu.routes.categories}
            element={<RegisterCategoriesScreen />}
          />
          <Route
            path={translateMenu.routes.provider}
            element={<RegisterProviderScreen />}
          />
          <Route
            path={translateMenu.routes.products}
            element={<RegisterProductsScreen />}
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
              />
            }
          />
          <Route
            path="/"
            element={<RegisterClientScreen />}
          />
          <Route path="*" element={<NotFoundScreens />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
