import { BrowserRouter, Route, Routes } from "react-router-dom";
import { translateMenu } from "./common/components/menu/translations/ptBr";
import { RegisterCategoriesScreen } from "./screens/register-categories/register-categories-screen";
import { RegisterClientScreen } from "./screens/register-client/register-client-screen";
import { RegisterProductsScreen } from "./screens/register-products/register-products-screen";
import { RegisterProviderScreen } from "./screens/register-provider/register-provider-screen";
import { RegisterPurchaseScreen } from "./screens/register-purchase/register-purchase-screen";
import { RegisterSaleScreen } from "./screens/register-sale/register-sale-screen";
import { NotFoundScreens } from "./screens/not-found/not-found";

function App() {
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
            element={<RegisterSaleScreen />}
          />
          <Route
            path={translateMenu.routes.purchase}
            element={<RegisterPurchaseScreen />}
          />
          <Route path="/" element={<RegisterClientScreen />} />
          <Route path="*" element={<NotFoundScreens />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
