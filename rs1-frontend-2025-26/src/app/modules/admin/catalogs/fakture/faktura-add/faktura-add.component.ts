import {Component, inject, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CreateFakturaCommand,
  FakturaStavkaDto,
  FakturaTip
} from '../../../../../api-services/fakture/fakture-api.models';
import {
  GetProductCategoryByIdQueryDto, ListProductCategoriesQueryDto
} from '../../../../../api-services/product-categories/product-categories-api.model';
import {
  ProductCategoriesApiService
} from '../../../../../api-services/product-categories/product-categories-api.service';
import {FaktureApiService} from '../../../../../api-services/fakture/fakture-api.service';
import {DialogHelperService} from '../../../../shared/services/dialog-helper.service';

interface Tip {
  id: FakturaTip;
  name: string;
}



@Component({
  selector: 'app-faktura-add',
  standalone: false,
  templateUrl: './faktura-add.component.html',
  styleUrl: './faktura-add.component.scss'
})
export class FakturaAddComponent implements OnInit {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  kategorije : ListProductCategoriesQueryDto[] = [];
  categoryApi = inject(ProductCategoriesApiService);
  form: FormGroup;
  dialog = inject(DialogHelperService)
  isSaving = false;
  isLoading = false;
fakturaApi = inject(FaktureApiService);
  tipovi: Tip[] = [
    { id: FakturaTip.Ulazna, name: 'Ulazna' },
    { id: FakturaTip.Izlazna, name: 'Izlazna' }
  ];

  //ispitni zadatak: zamjeniti hardkodirano sa API rezultatom

  constructor() {
    this.form = this.fb.group({
      brojRacuna: [''],
      tip: [''],
      napomena: [''],
      items: this.fb.array([])
    });

    // Dodaj dvije početne stavke
    this.addItem();
    this.addItem();
  }

  ngOnInit(): void {
        this.categoryApi.list().subscribe({
          next: (data) => {
            this.kategorije = data.items;
          }
        })
    }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  addItem(): void {
    const itemGroup = this.fb.group({
      kategorijaId: [''],
      proizvod: [''],
      kolicina: [1]
    });
    this.items.push(itemGroup);
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  onCancel(): void {
    this.router.navigate(['/admin/fakture']);
  }

  onSubmit(): void {
    if (this.form.valid) {
     const stavkeFakture : FakturaStavkaDto[] = []
      for (const item of this.items.controls) {

        const novaStavka : FakturaStavkaDto = {
          name : item.get("proizvod")?.value ?? " ",
          categoryId : Number(item.get("kategorijaId")?.value),
          quantity : Number(item.get("kolicina")?.value ?? 0),

        }
        stavkeFakture.push(novaStavka);
      }
      const faktura : CreateFakturaCommand = {
        broj : this.form.get("brojRacuna")?.value ?? "NN",
        tip  : this.form.get("tip")?.value ?? 1,
        stavke : stavkeFakture,
        napomena : this.form.get("napomena")?.value ?? null,

      }
      this.fakturaApi.create(faktura).subscribe({
        next: (response) => {
          if(response == -1){
            this.dialog.showError("Cannot add","It was not possible to add this");
            this.router.navigate(['admin/fakture']);
          }
          else{
            this.dialog.showSuccess("Added succesfuly","Uspjesno se dodala faktura");
            this.router.navigate(['admin/fakture']);
          }
        }

      })

    }
  }
}
