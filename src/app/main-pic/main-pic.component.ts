import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import { HomeComponent } from '../home/home.component';
import { AngularDraggableModule } from 'angular2-draggable';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import * as html2canvas from 'html2canvas';
import { Cloudinary } from '@cloudinary/angular-5.x';


declare var firebase: any;

@Component({
  selector: 'app-main-pic',
  templateUrl: './main-pic.component.html',
  styleUrls: ['./main-pic.component.scss']
})
export class MainPicComponent implements OnInit {
  static uid;
  static fbData;
  static fbStorege;
  static myimages = [];

  picName = '';

  constructor() { }

  ngOnInit() {
    this.fbLogIn();
    this.move();
  }


  move() {
    const mainPic = <HTMLImageElement>document.getElementById('mainPic');
    const bar = <HTMLInputElement>document.getElementById('myRgbBar');
    bar.addEventListener('change', function () {
      const h = parseInt(bar.value, 0);
      mainPic.style.height = (h + 50) + '%';
      // mainPic.style.width = (h + 50) + '%';
    });
    const rgbBar = <HTMLInputElement>document.getElementById('myBar');
    rgbBar.addEventListener('change', function () {
      const vv = parseInt(rgbBar.value, 0) / 100;
      mainPic.style.opacity = vv.toString();
    });
  }

  btnMovePicTofront() {
    const mainPicther = <HTMLImageElement>document.getElementById('mainPic');
    mainPicther.style.zIndex = '100';
  }

  onStop($event) {
    const mainPicSrc = <HTMLImageElement>document.getElementById('mainPic');
    mainPicSrc.style.zIndex = '-100';
  }

  fbLogIn() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        MainPicComponent.uid = user.uid;
        MainPicComponent.fbData = firebase.database().ref().child('users/' + user.uid);
        MainPicComponent.fbStorege = firebase.storage().ref(user.uid);
      } else {
        // User is signed out.
        console.log('User is signed out');
      }
      // ...
  });
}

  previewFile(inputImage) {
    const inputNamePic = <HTMLInputElement>document.getElementById('inputNamePic');
    if (inputNamePic.value === '') {
      alert('no name');
    } else {
    const scrollingWrapper = <HTMLDivElement>document.getElementById('scrolling-wrapper');
    const inputContainer = <HTMLDivElement>document.getElementById('inputContainer');
    inputContainer.style.display = 'inline';
    scrollingWrapper.style.display = 'none';
    const mainPic = <HTMLImageElement>document.getElementById('mainPic');
    const inputImg = <HTMLInputElement>document.getElementById('myImage');
    const reader = new FileReader();
    reader.readAsDataURL(inputImg.files[0]);
    const imgChosen = URL.createObjectURL(inputImg.files[0]);
    mainPic.src = imgChosen;
    inputImg.value = '';
    }
  }

  doneEditing() {
    const scrollingWrapper = <HTMLDivElement>document.getElementById('scrolling-wrapper');
    const inputContainer = <HTMLDivElement>document.getElementById('inputContainer');
    inputContainer.style.display = 'none';
    scrollingWrapper.style.display = 'inline';
    const newImg = <HTMLDivElement>document.getElementById('picDiv');
    const newImgName = <HTMLDivElement>document.getElementById('picName');
    html2canvas(newImg).then(function (canvas) {
      const imgData = canvas.toDataURL('image/png;base64;');
      canvas.getContext('2d');
      canvas.toBlob(function(blob) {
        MainPicComponent.fbStorege.child(newImgName.innerHTML).put(blob).then(function (snapshot) {
          MainPicComponent.fbStorege.child(newImgName.innerHTML).getDownloadURL().then(function (urll) {
            MainPicComponent.fbData.push({ url: urll});
          });
        });
      });
  });
  }


}
