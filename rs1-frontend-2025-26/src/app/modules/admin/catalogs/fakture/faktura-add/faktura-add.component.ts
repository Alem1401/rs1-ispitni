import {Component, inject, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  FakturaStavkaUpsertDto,
  FakturaTip,
  FakturaUpsertDto
} from '../../../../../api-services/fakture/fakture-api.models';
import {
  ListProductCategoriesQueryDto
} from '../../../../../api-services/product-categories/product-categories-api.model';
import {
  ProductCategoriesApiService
} from '../../../../../api-services/product-categories/product-categories-api.service';
import {ToasterService} from '../../../../../core/services/toaster.service';
import {FaktureApiService} from '../../../../../api-services/fakture/fakture-api.service';

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
  pcApi = inject(ProductCategoriesApiService);
  form: FormGroup;
  isSaving = false;
  isLoading = false;
  toaster = inject(ToasterService);
  fakturaApi = inject(FaktureApiService);
  tipovi: Tip[] = [
    { id: FakturaTip.Ulazna, name: 'Ulazna' },
    { id: FakturaTip.Izlazna, name: 'Izlazna' }
  ];


  kategorije: ListProductCategoriesQueryDto[] = [];
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
        this.pcApi.list().subscribe({
          next: data =>{
            this.kategorije = data.items;
          }
        })
    }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  addItem(): void {
    const itemGroup = this.fb.group({
      kategorijaId: [1,Validators.required],
      proizvod: ['',Validators.required],
      kolicina: [1,Validators.min(1)]
    });
    this.items.push(itemGroup);
  }

  removeItem(index: number): void {
    if(this.items.length === 1){
      this.toaster.error("Must contain at least one item");
      return;

    }
    this.items.removeAt(index);
  }

  onCancel(): void {
    this.router.navigate(['/admin/fakture']);
  }

  onSubmit(): void {
    if (this.form.valid) {
      const stavkeFakture : FakturaStavkaUpsertDto[] = [];
      for (const item of this.items.controls) {
        const stavka : FakturaStavkaUpsertDto = {
          name : item.get("proizvod")?.value,
          productCategoryId : item.get("kategorijaId")?.value,
          quantity : item.get("kolicina")?.value,
        }
        stavkeFakture.push(stavka);

      }
      const faktura : FakturaUpsertDto = {
        tip: this.form.get("tip")?.value,
        stavke :  stavkeFakture,
        napomena : this.form.get("napomena")?.value,
        brojRacuna: this.form.get("brojRacuna")?.value,
      }
      this.fakturaApi.create(faktura).subscribe({
        next: data => {
          if(data <0){
            this.toaster.error("faktura nije validna jer item koji izlazi iz skladista ili ne postoji ili ga nema dovoljno na stanju");
            this.router.navigate(['/admin/fakture']);
          }
          else{
            this.toaster.success("uspjesno kreirana faktura");
            this.router.navigate(['/admin/fakture']);
          }

        }
      })

    }
  }
}
