import { ReactElement, useState } from "react";
import { useSelector } from "react-redux";
import { Page } from "../../common/components/page/page";
import { INITIAL_PRODUCTS_STATE } from "../../redux/productReducer";
import { ReduxState } from "../../redux/types";
import { RegisterProductForm } from "../components/forms/register-products-form";
import { Provider } from "../components/forms/register-provider-form";
import { ProductsTable } from "../components/tables/products-table";

interface RegisterProductsProps {
  providers: Provider[];
}

export interface Product {
  name: string;
  description: string;
  unitPrice: string;
  stockQuantity: number;
  brand: string;
  model: string;
  manufacturingDate: string;
  category: string;
  provider: string;
}

export const RegisterProductsScreen = ({
  providers,
}: RegisterProductsProps): ReactElement => {
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>(
    INITIAL_PRODUCTS_STATE
  );
  const [editMode, setEditMode] = useState(false);
  const products = useSelector(
    (state: ReduxState) => state.products.productList
  );

  const { categoriesList } = useSelector(
    (state: ReduxState) => state.categories
  );

  return (
    <Page>
      {showForm ? (
        <RegisterProductForm
          setShowForm={setShowForm}
          providers={providers}
          setSelectedProduct={setSelectedProduct}
          setEditMode={setEditMode}
          selectedProduct={selectedProduct}
          editMode={editMode}
          categories={categoriesList}
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
