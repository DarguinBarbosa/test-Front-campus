import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-spiner',
  template: `<div class="overlay" *ngIf="isLoading | async"><div class="lds-ring"><div>
  </div><div></div><div></div><div></div></div></div>`,
  styleUrls: ['./spiner.component.css']
})
export class SpinerComponent {
  isLoading = this.service.isloading$
  constructor(private service:ServiceService) { }

}
