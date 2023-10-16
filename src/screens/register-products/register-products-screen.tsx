import { ReactElement, useState } from "react";
import { Page } from "../../common/components/page/page";
import { RegisterProductForm } from "../components/forms/register-products-form";
import { ProductsTable } from "../components/tables/products-table";
import { Provider } from "../components/forms/register-provider-form";
import { Category } from "../components/forms/register-categories-form";
import { INITIAL_PRODUCTS_STATE } from "../../redux/productReducer";
import { useSelector } from "react-redux";
import { ReduxState } from "../../redux/types";

interface RegisterProductsProps {
  providers: Provider[];
  categories: Category[];
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
  categories,
}: RegisterProductsProps): ReactElement => {
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>(
    INITIAL_PRODUCTS_STATE
  );
  const [editMode, setEditMode] = useState(false);
  const products = useSelector((state: ReduxState) => state.products.productList);
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
          categories={categories}
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
