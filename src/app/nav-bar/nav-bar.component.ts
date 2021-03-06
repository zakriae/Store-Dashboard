import { Component, Input, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ProductsComponent } from '../products/products.component';





@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {


  @Input()
  deviceSize?: string; 
  constructor(public dialog: MatDialog ) {}

  ngOnInit(): void {

   
  }
  
  
  openDialog(): void {

     this.dialog.open(DialogComponent, {
    
      width: '470px'
     
    }) }

}
