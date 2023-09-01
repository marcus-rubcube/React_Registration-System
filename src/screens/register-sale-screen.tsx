import { ReactElement, useState } from "react";
import { Page } from "../components/page/page";
import { RegisterSaleForm } from "./forms/register-sale-form";
import { SaleTable } from "./tables/sale-table";


export const RegisterSaleScreen = () : ReactElement => {
    const [showForm,setShowForm] = useState(false);
    return (
        <Page>
            {
                showForm? 
                    <RegisterSaleForm setShowForm={setShowForm}/> 
                    :
                    <SaleTable setShowForm={setShowForm}/>
            }
        </Page>
    )
}