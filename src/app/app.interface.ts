import { ExpenseType } from "./app.enum";

export interface IExpense {
    id: number;
    note: string;
    amount: number;
    type: ExpenseType;
    date: Date;
}