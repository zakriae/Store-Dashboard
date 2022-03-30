import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../Services/api.service';
import {MatDialogRef} from '@angular/material/dialog'
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  productForm !: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private apiService: ApiService, 
              private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      brand: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  addProduct(): void {

    if(this.productForm.valid)
    {
      console.log(this.productForm.value)
      this.apiService.postProduct(this.productForm.value)
      .subscribe({
        next: ()=> {
          alert("product created");
          this.productForm.reset();
          this.dialogRef.close('save');
          
        },
        error: (err: Error)=> alert("and error has accured"+err)
        
      }
      )
    }
     
    
  }
  
}
