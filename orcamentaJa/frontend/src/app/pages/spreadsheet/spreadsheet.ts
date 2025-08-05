import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-spreadsheet',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './spreadsheet.html',
  styleUrl: './spreadsheet.scss',
})
export class Spreadsheet implements OnInit {
  editIcon!: SafeHtml;
  deleteIcon!: SafeHtml;
  itemForm: FormGroup;
  editingIndex: number | null = null;

  items = [
    {
      name: 'Software',
      description: 'Licença de Software Anual',
      quantity: 2,
      unitPrice: 150.0,
      total: 300.0,
    },
    {
      name: 'Periféricos',
      description: 'Mousepad Gamer Extra Largo',
      quantity: 5,
      unitPrice: 79.9,
      total: 399.5,
    },
    {
      name: 'Hardware',
      description: 'Monitor Curvo 27" 144Hz',
      quantity: 1,
      unitPrice: 1800.0,
      total: 1800.0,
    },
  ];

  constructor(
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitPrice: [null, [Validators.required, Validators.min(0)]],
    });
    this.setupIcons();
  }

  ngOnInit(): void {}

  submitForm(): void {
    if (this.itemForm.invalid) {
      this.toastr.error('Algo deu errado, confira os dados e tente novamente!');
    }
    const formValue = this.itemForm.value;
    const newItem = {
      name: formValue.name,
      description: formValue.description,
      quantity: formValue.quantity,
      unitPrice: formValue.unitPrice,
      total: formValue.quantity * formValue.unitPrice,
    };
    if (this.editingIndex !== null) {
      this.items[this.editingIndex] = newItem;
      this.toastr.info(
        `O item ${this.editingIndex + 1} foi atualizado com sucesso!`
      );
    } else {
      this.items.push(newItem);
      this.toastr.success('Item adicionado com sucesso!');
    }
    this.resetForm();
  }

  editItem(index: number): void {
    this.editingIndex = index;
    const itemToEdit = this.items[index];
    this.itemForm.setValue({
      name: itemToEdit.name,
      description: itemToEdit.description,
      quantity: itemToEdit.quantity,
      unitPrice: itemToEdit.unitPrice,
    });
  }

  deleteItem(index: number): void {
    this.items.splice(index, 1);
    this.toastr.info(`O item ${index + 1} foi removido!`);
  }

  resetForm(): void {
    this.itemForm.reset({
      name: '',
      description: '',
      quantity: 1,
      unitPrice: null,
    });
    this.editingIndex = null;
  }

  increment(): void {
    const control = this.itemForm.get('quantity');
    if (control) {
      const currentValue = control.value || 0;
      control.setValue(currentValue + 1);
    }
  }

  decrement(): void {
    const control = this.itemForm.get('quantity');
    if (control && control.value > 1) {
      const currentValue = control.value;
      control.setValue(currentValue - 1);
    }
  }

  get grandTotal(): number {
    return this.items.reduce((total, item) => total + item.total, 0);
  }

  private setupIcons(): void {
    const rawEditIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>`;
    const rawDeleteIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>`;
    this.editIcon = this.sanitizer.bypassSecurityTrustHtml(rawEditIcon);
    this.deleteIcon = this.sanitizer.bypassSecurityTrustHtml(rawDeleteIcon);
  }
}
