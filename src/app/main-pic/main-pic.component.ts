import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import { HomeComponent } from '../home/home.component';
import { AngularDraggableModule } from 'angular2-draggable';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import * as html2canvas from 'html2canvas';


@Component({
  selector: 'app-main-pic',
  templateUrl: './main-pic.component.html',
  styleUrls: ['./main-pic.component.scss']
})
export class MainPicComponent implements OnInit {
  imgSrc = '/assets/img/card.png';
  imgTitel = 'myPic';
  varheight;
  varwidth;
  options: any = {
    removeOnSpill: false
  };
  editMode = true;

  constructor(private dragulaService: DragulaService) { }

  ngOnInit() {
    this.move();
  }

  move() {
    const mainPic = <HTMLImageElement>document.getElementById('mainPic');
    const bar = <HTMLInputElement>document.getElementById('myBar');
    bar.defaultValue = '0';
    bar.addEventListener('change', function () {
      const h = parseInt(bar.value, 0) * 0.13;
      mainPic.style.height = (h + 100) + '%';
      mainPic.style.width = (h + 100) + '%';
    });
    const rgbBar = <HTMLInputElement>document.getElementById('myRgbBar');
    rgbBar.defaultValue = '100';
    rgbBar.addEventListener('change', function () {
      const vv = parseInt(rgbBar.value, 0) / 100;
      mainPic.style.opacity = vv.toString();
    });
  }

  moveImg() {
    const mainPicSrc = <HTMLImageElement>document.getElementById('mainPic');
    const as = mainPicSrc.src;
    const num = HomeComponent.myimages.indexOf(as) - 1;
    console.log(num);
    if (num > 0) {
      mainPicSrc.src = HomeComponent.myimages[num];
      this.imgSrc = HomeComponent.myimages[num];
    } else {
      mainPicSrc.src = HomeComponent.myimages[HomeComponent.myimages.length - 1];
      this.imgSrc = HomeComponent.myimages[HomeComponent.myimages.length - 1];
    }
  }

  moveImRight() {
    const mainPicSrc = <HTMLImageElement>document.getElementById('mainPic');
    const as = mainPicSrc.src;
    const num = HomeComponent.myimages.indexOf(as) + 1;
    console.log(num);
    if (num < HomeComponent.myimages.length - 1) {
      mainPicSrc.src = HomeComponent.myimages[num];
      this.imgSrc = HomeComponent.myimages[num];
    } else {
      mainPicSrc.src = HomeComponent.myimages[1];
      this.imgSrc = HomeComponent.myimages[1];
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

  editPic() {
    const homeContainer = <HTMLDivElement>document.getElementById('homeContainer');
    const btnEdit = <HTMLImageElement>document.getElementById('btnEdit');
    const mainBar = <HTMLInputElement>document.getElementById('myBar');
    const myRgbBar = <HTMLInputElement>document.getElementById('myRgbBar');
    if (this.editMode) {
      homeContainer.style.visibility = 'hidden';
      mainBar.style.visibility = 'visible';
      myRgbBar.style.visibility = 'visible';
      btnEdit.innerHTML = 'Done';
    } else {
      this.loadImage();
      homeContainer.style.visibility = 'visible';
      mainBar.style.visibility = 'hidden';
      myRgbBar.style.visibility = 'hidden';
      btnEdit.innerHTML = 'Edit';

    }
    this.editMode = !this.editMode;
  }

  pdfDownload() {
    const mainicSrc = <HTMLImageElement>document.getElementById('mainPic');
    const mainPicSrc = <HTMLDivElement>document.getElementById('secend_div');
      const newImg = mainicSrc;
      html2canvas(newImg).then(function (canvas) {
      const imgData = canvas.toDataURL('image/png');
      canvas.getContext('2d');
      document.body.appendChild(canvas);
      // const ctx = canvas.getContext('2d');
      // ctx.drawImage(newImg, 0, 0);
      // mainicSrc.appendChild(ctx);
    });
  }

  loadImage() {
    const mainPicSrc = <HTMLDivElement>document.getElementById('secend_div');
    const mainicSrc = <HTMLImageElement>document.getElementById('mainPic');
    const mainPic = document.getElementById('mainPic');
    const image = new Image(400 , 400);
    image.src = mainicSrc.src;
    image.style.overflow = 'hidden';
    document.body.appendChild(image);
  }

}

