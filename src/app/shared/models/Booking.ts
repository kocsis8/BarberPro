import { User } from "./User";

export interface Booking{
    userId: string,
    employee: User,
    date:string;
}