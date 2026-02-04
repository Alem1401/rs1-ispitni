import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FaktureApiService } from '../../../../api-services/fakture/fakture-api.service';
import {ListFaktureQueryDto, FakturaTip, getFaktureList} from '../../../../api-services/fakture/fakture-api.models';
import {BaseListPagedComponent} from '../../../../core/components/base-classes/base-list-paged-component';

@Component({
  selector: 'app-fakture',
  standalone: false,
  templateUrl: './fakture.component.html',
  styleUrl: './fakture.component.scss'
})
export class FaktureComponent extends BaseListPagedComponent<ListFaktureQueryDto, getFaktureList> implements OnInit {
  protected override loadPagedData(): void {
    this.faktureApiService.list(this.request).subscribe(
      {next: response => this.handlePageResult(response)}
    )

  }
  private router = inject(Router);
  private faktureApiService = inject(FaktureApiService);

  fakture: ListFaktureQueryDto[] = [];
  displayedColumns: string[] = ['brojRacuna', 'tip', 'datumKreiranja', 'brojStavki'];

  constructor() {
    super();
    this.request = new getFaktureList()
  }
  ngOnInit(): void {
 this.initList()
  }



  onNovaFaktura(): void {
    this.router.navigate(['/admin/fakture/add']);
  }

  /**
   * Helper metoda za prikaz tipa fakture kao string
   */
  getTipString(tip: FakturaTip): string {
    return tip === FakturaTip.Ulazna ? 'ULAZNA' : 'IZLAZNA';
  }

  /**
   * Helper metoda za CSS klasu badge-a
   */
  getTipClass(tip: FakturaTip): string {
    return tip === FakturaTip.Ulazna ? 'ulazna' : 'izlazna';
  }
}
