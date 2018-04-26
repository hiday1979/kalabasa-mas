import { Component, OnInit } from '@angular/core';
import { MyServiceService} from '../my-service.service';
import { HomeComponent } from '../home/home.component';
import { AngularDraggableModule } from 'angular2-draggable';
import { DragulaService } from 'ng2-dragula/ng2-dragula';


@Component({
  selector: 'app-main-pic',
  templateUrl: './main-pic.component.html',
  styleUrls: ['./main-pic.component.scss']
})
export class MainPicComponent implements OnInit {
  imgSrc = '/assets/img/card.png';
  imgTitel = 'myPic';
  options: any = {
    removeOnSpill: false
  };

  constructor(private dragulaService: DragulaService) { }

  ngOnInit() {
    this.move();
  }

  move() {
    const mainPic = document.getElementById('mainPic');
    const bar = <HTMLInputElement> document.getElementById('myBar');
    bar.defaultValue = '0';
    bar.addEventListener('change', function () {
      const h = parseInt(bar.value, 0) * 0.1;
      // mainPic.style.width = '' + (h + 95) + '%';
      mainPic.style.height = (h + 50) + '%';
      mainPic.style.width = (h + 62) + '%';
    });
    const rgbBar = <HTMLInputElement> document.getElementById('myRgbBar');
    rgbBar.defaultValue = '100';
    rgbBar.addEventListener('change', function () {
      const vv = parseInt(rgbBar.value, 0) / 100;
      mainPic.style.opacity = vv.toString();
    });
    }

    moveImg() {
      const mainPicSrc = <HTMLImageElement>document.getElementById('mainPic');
      const as = mainPicSrc.src;
      const num = HomeComponent.myimages.indexOf(as) - 1 ;
      console.log(num);
      if (num > 0) {
        mainPicSrc.src = HomeComponent.myimages[num];
      } else {
        mainPicSrc.src = HomeComponent.myimages[HomeComponent.myimages.length - 1];
      }
    }

    moveImRight() {
      const mainPicSrc = <HTMLImageElement>document.getElementById('mainPic');
      const as = mainPicSrc.src;
      const num = HomeComponent.myimages.indexOf(as) + 1 ;
      console.log(num);
      if (num < HomeComponent.myimages.length - 1) {
        mainPicSrc.src = HomeComponent.myimages[num];
      } else {
        mainPicSrc.src = HomeComponent.myimages[1];
      }

    }

    moveImgFront() {
      const mainPicSrc = <HTMLImageElement>document.getElementById('mainPic');
        mainPicSrc.style.zIndex = '1000';
    }

    onStop($event) {
      const mainPicSrc = <HTMLImageElement>document.getElementById('mainPic');
        mainPicSrc.style.zIndex = '-1000';
    }

}

