import {Component, inject, OnInit} from '@angular/core';
import {DostavljaciApiService} from '../../../../api-services/dostavljaci/dostavljaci-api.service';
import {BasePagedQuery} from '../../../../core/models/paging/base-paged-query';
import {BaseListPagedComponent} from '../../../../core/components/base-classes/base-list-paged-component';
import {
  DostavljaciListRequest,
  ResponseDostavljacDto, TipDostavljaca
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
export class DostavljaciComponent extends BaseListPagedComponent<ResponseDostavljacDto, DostavljaciListRequest> implements OnInit {

  searchTerm : string = '';
  displayColumns : string[] = ["Naziv","Kod","Tip","Aktivan","Akcije"]
  api = inject(DostavljaciApiService)
  router = inject(Router);
  dialog = inject(DialogHelperService);
  toaster = inject(ToasterService);
  constructor() {
    super();
    this.request = new DostavljaciListRequest();
  }

  ngOnInit(): void {
    this.loadPagedData()
  }

  protected override loadPagedData(): void {
    this.api.list(this.request).subscribe({
      next: data => {
        this.handlePageResult(data)
        console.log(data)
      }
    })
  }
addDostavljac(){
    this.router.navigate(['admin/dostavljaci/add'])

}
search(){
    this.request.search= this.searchTerm;
    this.loadPagedData();
}
  getTip(id : number){
    return TipDostavljaca[id]
  }
  edituj(id : number){
   this.router.navigate(['admin/dostavljaci/edit/',id])
  }
  obrisi(element : ResponseDostavljacDto){
    this.dialog.confirmDelete(element.naziv,"are you sure").subscribe({
      next: data => {
        if(data?.button === DialogButton.DELETE){
          this.api.deleteDostavljac(element.id ).subscribe({
            next :() => {

             this.dialog.showSuccess("sucees","succesfully deleeted").subscribe();
             this.loadPagedData();
            }
          })
        }

      }
    })
  }

}
