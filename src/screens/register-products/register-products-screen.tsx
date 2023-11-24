import { ReactElement, useState } from "react";
import { useSelector } from "react-redux";
import { Page } from "../../common/components/page/page";
import { INITIAL_PRODUCTS_STATE } from "../../redux/productReducer";
import { ReduxState } from "../../redux/types";
import { Category } from "../components/forms/register-categories-form";
import { RegisterProductForm } from "../components/forms/register-products-form";
import { Provider } from "../components/forms/register-provider-form";
import { ProductsTable } from "../components/tables/products-table";

export interface Product {
  id: string;
  name: string;
  description: string;
  unitPrice: string;
  stockQuantity: number;
  brand: string;
  model: string;
  manufacturingDate: string;
  category: Category;
  provider: Provider;
}

export const RegisterProductsScreen = (): ReactElement => {
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>(
    INITIAL_PRODUCTS_STATE
  );
  const [editMode, setEditMode] = useState(false);
  const products = useSelector(
    (state: ReduxState) => state.products.productList
  );

  return (
    <Page>
      {showForm ? (
        <RegisterProductForm
          setShowForm={setShowForm}
          setSelectedProduct={setSelectedProduct}
          setEditMode={setEditMode}
          selectedProduct={selectedProduct}
          editMode={editMode}
        />
      ) : (
        <ProductsTable
          setShowForm={setShowForm}
          products={products}
          setSelectedProduct={setSelectedProduct}
          setEditMode={setEditMode}
        />
      )}
    </Page>
  );
};
