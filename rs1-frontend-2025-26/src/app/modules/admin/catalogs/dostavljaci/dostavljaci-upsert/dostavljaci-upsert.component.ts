import {Component, inject, OnInit} from '@angular/core';
import {DostavljaciApiService} from '../../../../../api-services/dostavljaci/dostavljaci-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {upsertDostavljacDto} from '../../../../../api-services/dostavljaci/dostavljaci-api.model';
import {ToasterService} from '../../../../../core/services/toaster.service';

@Component({
  selector: 'app-dostavljaci-upsert',
  standalone: false,
  templateUrl: './dostavljaci-upsert.component.html',
  styleUrl: './dostavljaci-upsert.component.scss',
})
export class DostavljaciUpsertComponent implements OnInit  {

  api = inject(DostavljaciApiService);
  route = inject(ActivatedRoute);
  toaster = inject(ToasterService);

  fb = inject(FormBuilder);
  form : FormGroup = this.fb.group({
    naziv : ['',Validators.required],
    kod:['',[Validators.required,Validators.maxLength(3)]],
    tip:[1,Validators.required],
    isAktivan:[true,Validators.required]

  })
  router = inject(Router);
  id? : number;
  editMode : boolean = false;

  ngOnInit(): void {
    const idText = this.route.snapshot.paramMap.get("id");
    if(idText){
      this.id = Number(idText);
      this.editMode=true;
      this.loadValues();
    }

  }

  loadValues(): void {
    if(this.id && this.editMode){
      this.api.getById(this.id).subscribe({
        next: data => {
          this.form.patchValue({...data})
        }
      })
    }
  }

  finish(){
    if(this.form.invalid){
      return;
    }
    else{
      const dostavljac : upsertDostavljacDto ={
        naziv : this.form.get("naziv")?.value,
        tip : this.form.get("tip")?.value,
        kod : this.form.get("kod")?.value,
        isAktivan: this.form.get("isAktivan")?.value,
      }
      if(this.editMode && this.id){
        this.api.update(dostavljac,this.id).subscribe({
          next:() => {
            this.router.navigate(['admin/dostavljaci']);
            this.toaster.success("Uspjesno ste updaetovali dostavljaca",2000);
          }

        })
      }
      else{
        this.api.create(dostavljac).subscribe({
          next:() => {
            this.router.navigate(['admin/dostavljaci']);
            this.toaster.success("Uspjesno ste dodali dostavljaca",2000);
          }
        })
      }

    }
  }

}
