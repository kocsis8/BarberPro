export interface User{
    id: string,
    email: string,
    phone: string,
    name:{
        firstname: string;
        lastname: string;
    }
    employe: boolean,
}