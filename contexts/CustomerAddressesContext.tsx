import { createContext, useState } from "react";
import { SITE_URL } from "../lib/constants";

type AddressesType = {
    Addresses: any;
    setAddresses: ([])=>void;
    Address: any;
    setAddress: ({})=>void;
    // getAddresses: (formData: any)=>void;
    getAddress: (address: any) => void;
    postAddress: (formData: any)=>void;
    delAddress: (id: any, formData: any)=>void;
}

const AddressesDefault: AddressesType = {
    Addresses: undefined,
    setAddresses: ()=> {},
    Address: undefined,
    setAddress: ()=> {},
    // getAddresses: ()=> {},
    getAddress: () => {},
    postAddress: () => {},
    delAddress: () => {}
}

const CustomerAddressesContext = createContext(AddressesDefault)

const CustomerAddressProvider = ({children}: any) => {

    let formInputs = {
        id: '',
        address1: "",
        address2: "",
        city: "",
        company: "",
        country: 0,
        customer_id: 0,
        default_billing: "N",
        default_shipping: "N",
        first_name: "",
        last_name: "",
        phone: "",
        state: "",
        vat: "0",
        zip: "",
    }

    const [Addresses, setAddresses] = useState<string[]>([])
    const [Address, setAddress] = useState<any>(formInputs)

    // const getAddresses = async(formData: any) => {
    //     let res: any = await axios.post(`${API_BASE_URL}dashboard/addresses`, formData).then(respose => { return respose })
    //     setAddresses(res.data.addresses.data)
    // }

    const postAddress = async (formData: any) => {
        let res: any = await fetch(`${SITE_URL}api/dashboard/addresses/create`, {
            method: "POST",
            body: JSON.stringify(formData),
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(respose => { return respose.json() })
        return res
    }

    const getAddress = async (address: any) => {
        setAddress(address)
    }

    const delAddress = async (id: any, formData: any) => {
        let data = {
            id: id,
            formData
        }
        let res: any = await fetch(`${SITE_URL}api/dashboard/addresses/destroy`, {
            method: "POST",
            body: JSON.stringify(data),
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(respose => { return respose.json() })
        return res
    }

    return (
        <CustomerAddressesContext.Provider value={{
            Addresses, setAddresses,
            // getAddresses,
            Address, setAddress,
            getAddress,
            postAddress,
            delAddress
        }}>
            {children}
        </CustomerAddressesContext.Provider>
    )
}

export {CustomerAddressProvider, CustomerAddressesContext}