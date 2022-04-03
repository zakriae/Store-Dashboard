import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../Services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  productForm !: FormGroup;
  actionBtn: string= 'save'

  constructor(private formBuilder: FormBuilder,
              private apiService: ApiService, 
              private dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public editData: any) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      brand: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      img: ['' ]
    })
    if(this.editData) {
        this.actionBtn='update'
        this.productForm.controls['productName'].setValue(this.editData.productName);
        this.productForm.controls['brand'].setValue(this.editData.brand);
        this.productForm.controls['img'].setValue(this.editData.img);
        this.productForm.controls['category'].setValue(this.editData.category);
        this.productForm.controls['price'].setValue(this.editData.price);
        this.productForm.controls['description'].setValue(this.editData.description);

    }
  }

  addProduct(): void {

    if(!this.editData)
    {
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

    } else{

      this.updateProduct(this.productForm.value, this.editData.id)
    }

   
    
  }

  updateProduct(data: any, id: number): void  {
      this.apiService.putProduct(data,id).subscribe(
        {
          next: () => {alert("product was updated");
          this.productForm.reset();
          this.dialogRef.close('update');
        },
        error: (err: Error)=> alert("and error has accured"+err)
        }
       
      )
  }


}
