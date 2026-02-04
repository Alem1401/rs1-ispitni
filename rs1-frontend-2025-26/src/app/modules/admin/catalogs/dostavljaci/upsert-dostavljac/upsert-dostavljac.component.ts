import {Component, inject, OnInit} from '@angular/core';
import {DostavljaciApiService} from '../../../../../api-services/dostavljaci/dostavljaci-api.service';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {upsertDostavljac} from '../../../../../api-services/dostavljaci/dostavljaci-api.model';
import {DialogHelperService} from '../../../../shared/services/dialog-helper.service';
import {DialogButton} from '../../../../shared/models/dialog-config.model';

@Component({
  selector: 'app-upsert-dostavljac',
  standalone: false,
  templateUrl: './upsert-dostavljac.component.html',
  styleUrl: './upsert-dostavljac.component.scss',
})
export class UpsertDostavljacComponent implements OnInit {


  id = 0
  editMode = false;
  api = inject(DostavljaciApiService)
  fb = inject(FormBuilder)
  route = inject(ActivatedRoute)
  router = inject(Router)
  dialog = inject(DialogHelperService);
  form = this.fb.group({
    naziv : ['',Validators.required],
    kod : ['',{validators: [Validators.required,Validators.maxLength(3)]}],
    aktivan : [true,Validators.required],
    tip : [1,Validators.required],
  })


  ngOnInit(): void {
    let idString = this.route.snapshot.paramMap.get('id');
    if (idString) {
      this.id= Number(idString);
      this.editMode = true;
      this.fillData()


    }
  }

  fillData(): void {
    this.api.getById(this.id).subscribe({
      next: (response) => {
        this.form.patchValue({
          naziv: response.naziv,
          kod: response.kod,
          aktivan: response.aktivan,
          tip: response.tip // ako imaš tip u formi
        });
      }
    });
  }

  onSubmit() : void{
    if(this.form.valid){
      const dto : upsertDostavljac = {
        naziv : this.form.get("naziv")?.value ?? "",
        aktivan : this.form.get("aktivan")?.value ?? true,
        kod : this.form.get("kod")?.value ?? "aaa",
        tip : this.form.get("tip")?.value ?? 1

      }
      if(this.editMode === true){
        this.dialog.confirm("Confirmation","Are you sure you want to update this ?").subscribe({
          next: response => {if(response?.button === DialogButton.YES){
            this.api.updateDostavljac(dto,this.id).subscribe({
              next: () => this.router.navigate(['admin/dostavljaci']),
            })
          }

          }
        })

      }
      else if(this.editMode === false){
        this.api.create(dto).subscribe({
          next: () => this.router.navigate(['admin/dostavljaci']),
        })
      }

    }
  }

}
