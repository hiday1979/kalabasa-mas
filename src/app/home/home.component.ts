
import { AbuteComponent } from './../abute/abute.component';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { FotterComponent } from '../fotter/fotter.component';
import { MainPicComponent } from '../main-pic/main-pic.component';
import { HeaderComponent } from '../header/header.component';
import { MyServiceService } from '../my-service.service';

declare var firebase: any;
declare var ina: MainPicComponent;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  static chosenImg;
  static fbData;
  static uid;
  static dataList = [];

  imgSrc = '/assets/img/card.png';
  minPicNumber = 5;
  correntPicNumber;
  images = [];
  mainPic: HTMLImageElement;
  chosenPic: HTMLImageElement;
  inputImg: HTMLInputElement;
  divImglist: HTMLDivElement;
  hasBack = true;

  constructor() {
  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        HomeComponent.uid = user.uid;
        HomeComponent.fbData = firebase.database().ref().child('users').child(user.uid);
        HomeComponent.fbData.on('child_added', function (snapshot) {
        const object = Object.values(snapshot.val());
        HomeComponent.dataList.push(object[0]);
      });
      } else {
        // User is signed out.
        console.log('User is signed out');
        firebase.auth().signInAnonymously().catch(function (error) {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
        });
      }
      // ...
    });
    this.mainPic = <HTMLImageElement>document.getElementById('mainPic');
    this.inputImg = <HTMLInputElement>document.getElementById('myImage');
    this.inputImg.addEventListener('change', function (e) {
      // save img
      HomeComponent.chosenImg = this.files[0];
    });
    this.getData();
}


  previewFile() {
    const reader = new FileReader();
    reader.readAsDataURL(this.inputImg.files[0]);
    const imgChosen = URL.createObjectURL(this.inputImg.files[0]);
    this.inputImg.value = '';
    const mainPic = <HTMLImageElement>document.getElementById('mainPic');
    mainPic.src = imgChosen;
    const homeContainer = <HTMLDivElement>document.getElementById('inputContainer');
    homeContainer.style.display = 'initial';
  }

    getData() {
      this.images = HomeComponent.dataList;
      console.log(this.images);
    }

    moveImg() {
      const mainPicSrc = <HTMLImageElement>document.getElementById('mainPic');
      const as = mainPicSrc.src;
      const num = this.images.indexOf(as) - 1;
      console.log(num);
      if (num > 0) {
        mainPicSrc.src = this.images[num];
        this.imgSrc = this.images[num];
      } else {
        mainPicSrc.src = this.images[this.images.length - 1];
        this.imgSrc = this.images[this.images.length - 1];
      }
    }

    moveImRight() {
      const mainPicSrc = <HTMLImageElement>document.getElementById('mainPic');
      const as = mainPicSrc.src;
      const num = this.images.indexOf(as) + 1;
      console.log(num);
      if (num < this.images.length - 1) {
        mainPicSrc.src = this.images[num];
        this.imgSrc = this.images[num];
      } else {
        mainPicSrc.src = this.images[1];
        this.imgSrc = this.images[1];
      }

    }

    saveName(event) {
      console.log('save');
      const btnDelete = <HTMLButtonElement>document.getElementById('btnDelete');
      const btnDone = <HTMLButtonElement>document.getElementById('btnDone');
      btnDelete.style.display = 'inline';
      const homeContainer = <HTMLDivElement>document.getElementById('picDiv');
      homeContainer.style.backgroundImage = 'none';
      const mainPic = <HTMLImageElement>document.getElementById('mainPic');
      mainPic.style.zIndex = '100';
      this.chosenPic = event.target;
      const ts = this.chosenPic.src.localeCompare(mainPic.src);
      mainPic.src = this.chosenPic.src;
      if (this.images.length >= this.minPicNumber) {
        document.getElementById('btnDone').style.display = 'inline';
      }
    }

    addBack() {
      const homeContainer = <HTMLDivElement>document.getElementById('picDiv');
      if (!this.hasBack) {
      homeContainer.style.backgroundImage = 'url("/assets/img/card_background.png")';
      this.hasBack = !this.hasBack;
      }
    }

    fbDeleteItem() {
      const mainPic = <HTMLImageElement>document.getElementById('mainPic');
      const storage = firebase.storage().refFromURL(mainPic.src);
      storage.delete().then(function() {
       console.log(' File deleted successfully');
       HomeComponent.fbData.child('users').child(HomeComponent.uid).remove(function(error) {
        alert(error ? 'Uh oh!' : 'Success!');
      });
      }).catch(function(error) {
        console.log('Uh-oh, an error occurred!');
      });
    }
}
