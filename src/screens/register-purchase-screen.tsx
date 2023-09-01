import { ReactElement, useState } from "react";
import { Page } from "../components/page/page";
import { PurchaseTable } from "./tables/purchase-table";
import { RegisterPurchaseForm } from "./forms/register-purchase-form";


export const RegisterPurchaseScreen = () : ReactElement => {
    const [showForm,setShowForm] = useState(false);
    return (
        <Page>
            {
                showForm? 
                    <RegisterPurchaseForm setShowForm={setShowForm}/> 
                    :
                    <PurchaseTable setShowForm={setShowForm}/>
            }
        </Page>
    )
}