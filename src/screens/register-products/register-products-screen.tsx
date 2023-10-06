import { ReactElement, useState } from "react";
import { Page } from "../../common/components/page/page";
import { RegisterProductForm } from "../components/forms/register-products-form";
import { ProductsTable } from "../components/tables/pruducts-table";
import { Provider } from "../components/forms/register-provider-form";
import { Categorie } from "../components/forms/register-categories-form";

interface RegisterProductsProps {
  providers: Provider[];
  categories: Categorie[];
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

export const INITIAL_PRODUCTS_STATE: Product = {
  name: "",
  description: "",
  unitPrice: "",
  stockQuantity: 0,
  brand: "",
  category: "",
  manufacturingDate: "",
  model: "",
  provider: "",
};

export const RegisterProductsScreen = ({
  providers,
  categories,
}: RegisterProductsProps): ReactElement => {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product>(
    INITIAL_PRODUCTS_STATE
  );
  const [editMode, setEditMode] = useState(false);
  return (
    <Page>
      {showForm ? (
        <RegisterProductForm
          setShowForm={setShowForm}
          providers={providers}
          products={products}
          setProducts={setProducts}
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
          setProducts={setProducts}
          setSelectedProduct={setSelectedProduct}
          setEditMode={setEditMode}
        />
      )}
    </Page>
  );
};
