import { Component, OnInit } from '@angular/core';
import {AfterViewInit,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css']
})
export class EditProductsComponent implements OnInit {
  
  displayedColumns: string[] = ['productName', 'brand','img', 'category', 'price', 'description', 'action'];

  dataSource: MatTableDataSource<any> = new  MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private api:ApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
     this.getAllProducts()
  }

  getAllProducts(): void {
       this.api.getAllProducts().subscribe({

      next: (res) => {
                       this.dataSource= new MatTableDataSource(res);
                       this.dataSource.paginator= this.paginator;
                       this.dataSource.sort = this.sort

                       }
       }
       ) 
  }

  applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource!.filter = filterValue.trim().toLowerCase();

    if (this.dataSource!.paginator) {
      this.dataSource!.paginator.firstPage();
    }
}


editProduct(row : any): void {

  this.dialog.open(DialogComponent,{
    
    width: '470px',

    data: row
   
  }).afterClosed().subscribe(val => {
    if(val==='update') this.getAllProducts();
  })
}


deleteProduct(row: any ): void {

  this.api.deleteProduct(row.id).subscribe(
    {
      next : () => {
        alert('product deleted succedfully')
         this.getAllProducts()},
      error: () => alert('an error has accured')
    }
  )
    
}

 

}
