export interface SignUp{
    name:string,
    password:string,
    email:string
}

export interface LogIn{
    email:string,
    password:string
}

export interface Product{
    name:string,
    price:number,
    color:string,
    category:string,
    description:string,
    url:string,
    id:number,
    quantity:undefined | number,
    productId:undefined | number,
}

export interface cart{
    name:string,
    price:number,
    color:string,
    category:string,
    description:string,
    url:string,
    id:number | undefined,
    quantity:undefined | number,
    userId:number,
    productId:number
}
export interface priceSummary{
    price:number,
    discount:number,
    tax:number,
    delivery:number,
    total:number
}
export interface order{
    email:string,
    address:string,
    contact:string,
    totalPrice:number,
    userId:number,
    id:number|undefined
}