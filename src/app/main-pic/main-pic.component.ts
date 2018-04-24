import { Component, OnInit } from '@angular/core';
import { MyServiceService} from '../my-service.service';


@Component({
  selector: 'app-main-pic',
  templateUrl: './main-pic.component.html',
  styleUrls: ['./main-pic.component.scss']
})
export class MainPicComponent implements OnInit {
  imgSrc = '/assets/img/imgPlaceHolder.png';
  imgTitel = 'myPic';

  constructor(private _data: MyServiceService) { }

  ngOnInit() {
    this.move();
  }

  move() {
    const mainPic = document.getElementById('mainPic');
    const bar = <HTMLInputElement> document.getElementById('myBar');
    bar.addEventListener('change', function () {
      mainPic.style.width = '' + bar.value + '%';
    });
    const rgbBar = <HTMLInputElement> document.getElementById('myRgbBar');
    rgbBar.addEventListener('change', function () {
      const vv = parseInt(rgbBar.value, 0) / 100;
      mainPic.style.opacity = vv.toString();
    });
    }
}

