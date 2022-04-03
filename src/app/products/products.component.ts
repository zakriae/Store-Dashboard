import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product';
import { ApiService } from '../Services/api.service';
import {MediaObserver, MediaChange} from '@angular/flex-layout'
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products?: Product[];
  mediaSub?:Subscription;
  deviceSize: string= '';

  constructor(private apiService: ApiService, public mediaObserver:MediaObserver, private dialog: MatDialog ) { }


  ngOnInit(): void {

    this.getProducts();

    this.mediaSub = this.mediaObserver.media$.subscribe(
      (result: MediaChange) => {

        this.deviceSize=result.mqAlias;
        console.log(this.deviceSize)      
        }

    )
  }

  getProducts(): void {

   this.apiService
        .getAllProducts()
        .subscribe({
         next: (product) => this.products=product,
         error: () => alert("an error has accured please try later")
       })
  }
  


}
