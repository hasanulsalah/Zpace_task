import { Injectable } from '@angular/core';
import { ExpenseType } from './app.enum';
import { IExpense } from './app.interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private expenses: Array<IExpense> = [
    {
      amount: 75.20,
      date: new Date(),
      id: 1,
      note: 'Pharmacy',
      type: ExpenseType.Expense
    },
    {
      amount: 77550.00,
      date: new Date(),
      id: 2,
      note: 'Salary',
      type: ExpenseType.Income
    },
    {
      amount: 100.00,
      date: new Date(),
      id: 3,
      note: 'Loan Return',
      type: ExpenseType.Income
    },
    {
      amount: 575,
      date: new Date(),
      id: 4,
      note: 'food',
      type: ExpenseType.Expense
    }
  ];

  constructor() { }

  get expenseList() {
    return this.expenses;
  }

  // get expenseType(){
  //   return this.expenses.reduce((type,exp) =>  )
  // }

  public addExpense(expense: IExpense) {
     this.expenses.push(expense);
     return this.expenses;
  }

  get totalIncome() {
    return this.expenses.reduce((sum, exp) => exp.type === ExpenseType.Income ? sum + exp.amount : sum, 0)
  }
  get totalExpense() {
    return this.expenses.reduce((sum, exp) => exp.type === ExpenseType.Expense ? sum +  exp.amount : sum, 0)
  }

  public clearAll() {
    this.expenses = [];
  }

  public deleteExpense(expenseId:any) {
    this.expenses = this.expenses.filter(exp => exp.id !== expenseId);
    return this.expenses;
  }

  
}
