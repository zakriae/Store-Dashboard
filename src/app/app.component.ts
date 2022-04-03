import { Component, OnDestroy, OnInit } from '@angular/core';
import {MediaObserver, MediaChange} from '@angular/flex-layout'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  
   mediaSub?:Subscription;

   deviceSize: string= '';

   constructor(public mediaObserver:MediaObserver){}

   ngOnInit(): void {
     this.mediaSub = this.mediaObserver.media$.subscribe(
       (result: MediaChange) => {

         this.deviceSize=result.mqAlias;
         console.log(this.deviceSize)      
         }

     )
   }

   ngOnDestroy(): void {
      this.mediaSub?.unsubscribe()
   }
}
