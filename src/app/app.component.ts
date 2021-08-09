import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, } from '@angular/forms';
import { AppService } from './app-service.service';
import { ExpenseType } from './app.enum';
import { IExpense } from './app.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'zSpaceTask';

  public expenses: Array<IExpense> = [];
  public totalIncome: number = 0;
  public totalExpense: number = 0;
  public currentType!: ExpenseType;
  public expenseIncome: boolean = true;
  public expenseTypes = ExpenseType;
  showModal = false;

  expenditureForm!: FormGroup;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.expenses = this.appService.expenseList;
    this.totalIncome = this.appService.totalIncome;
    this.totalExpense = this.appService.totalExpense;
    this.expenditureForm = new FormGroup({
      note: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"),]),
    })
  }

  toggleModal(type: ExpenseType) {
    this.showModal = !this.showModal;
    this.currentType = type;
    console.log(type);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.expenditureForm.controls;
  }

  closeModal() {
    this.showModal = false;
    this.expenditureForm.reset();
  }

  AddExpenditure() {
    const expenditure: IExpense = {
      amount: parseInt(this.expenditureForm.controls.amount.value),
      date:new Date(),
      id:Math.random(),
      note:this.expenditureForm.controls.note.value,
      type:this.currentType
    };
    this.expenses = this.appService.addExpense(expenditure);
    this.totalIncome = this.appService.totalIncome;
    this.totalExpense = this.appService.totalExpense;
    this.closeModal();
  }

  deleteExpenses(id: any) {
    this.expenses = this.appService.deleteExpense(id);
    this.totalIncome = this.appService.totalIncome;
    this.totalExpense = this.appService.totalExpense;
  }

  clearAll() {
    this.appService.clearAll();
    this.expenses = this.appService.expenseList;
    this.totalIncome = this.appService.totalIncome;
    this.totalExpense = this.appService.totalExpense;
  }

}