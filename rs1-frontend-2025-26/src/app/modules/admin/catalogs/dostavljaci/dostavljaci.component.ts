import {Component, inject, OnInit} from '@angular/core';
import {DostavljaciApiService} from '../../../../api-services/dostavljaci/dostavljaci-api.service';
import {BaseListPagedComponent} from '../../../../core/components/base-classes/base-list-paged-component';
import {
  DostavljaciListRequest,
  DostavljaciResponse,
  TipDostavljaca
} from '../../../../api-services/dostavljaci/dostavljaci-api.model';
import {Router} from '@angular/router';
import {DialogHelperService} from '../../../shared/services/dialog-helper.service';
import {DialogButton} from '../../../shared/models/dialog-config.model';
import {ToasterService} from '../../../../core/services/toaster.service';

@Component({
  selector: 'app-dostavljaci',
  standalone: false,
  templateUrl: './dostavljaci.component.html',
  styleUrl: './dostavljaci.component.scss'
})
export class DostavljaciComponent  extends BaseListPagedComponent<DostavljaciResponse, DostavljaciListRequest> implements OnInit {

  api = inject(DostavljaciApiService);
  displayColumns: string[] = ["Naziv","Kod","Tip","Aktivan","Dugmici"]
  router = inject(Router);
  dialog = inject(DialogHelperService);
  toaster = inject(ToasterService);

  constructor() {
    super();
    this.request = new DostavljaciListRequest()
  }


getTip(id : number){
    return TipDostavljaca[id];
}
  protected override loadPagedData(): void {
    this.api.list(this.request).subscribe({
      next: data => {
        this.handlePageResult(data);
      }
    })
 }
 ngOnInit(): void {
     this.initList()
 }
 dodajNovog(){

    this.router.navigate(['/admin/dostavljaci/add'])
 }
 updateDostavljaca(id : number){
   this.router.navigate([`/admin/dostavljaci/update/${id}`])
 }

 deleteDostavljaca(dostavljac : DostavljaciResponse){
    this.dialog.confirmDelete(dostavljac.naziv,"Da li zelite obrisati ovog dostavljaca").subscribe({
      next: data => {
        if( data != undefined && data.button == DialogButton.DELETE){
          this.api.delete(dostavljac.id).subscribe({
            next: () => {
              this.toaster.success("uspjesno ste izbrisali");
              this.loadPagedData();
            }
          })
        }
      }
    })
 }

 pretrazi(){
    this.api.list(this.request).subscribe({
      next: data => {
        this.handlePageResult(data);
      }
    })
 }

}
