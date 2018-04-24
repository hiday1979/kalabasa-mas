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
    const bar = <HTMLInputElement> document.getElementById('myBar');
    bar.addEventListener('change', function () {
      document.getElementById('mainPic').style.width = '' + bar.value + '%';
    };
    const rgbBar = <HTMLInputElement> document.getElementById('myRgbBar');
    rgbBar.addEventListener('change', function () {
      document.getElementById('mainPic').style.opacity = rgbBar.value / 100;
    };
    }
    }
}

