import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class MyServiceService {

  private defaultImageArrey = new BehaviorSubject <any> (['/assets/img/air_temp_max.png']);
  myImages = this.defaultImageArrey.asObservable();

  constructor() { }

  addImageSrc (myImage) {
     this.defaultImageArrey.next(myImage);
      }
}
