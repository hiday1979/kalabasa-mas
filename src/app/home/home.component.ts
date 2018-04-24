
import { AbuteComponent } from './../abute/abute.component';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { FotterComponent } from '../fotter/fotter.component';
import { HeaderComponent } from '../header/header.component';
import { MyServiceService } from '../my-service.service';


declare var firebase: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  static uid;
  static fbData;
  static fbStorege;
  static myimages = ['/assets/img/card.png'];

  mainPic: HTMLImageElement;
  chosenPic: HTMLImageElement;
  inputImg: HTMLInputElement;
  divImglist: HTMLDivElement;
  imgCount = 15;
  inputImage = 'conected';
  mainImageSrc;
  goalText = 'My first life goal';
  images = ['/assets/img/card.png'];
  options: any = {
    removeOnSpill: true
  };
  imgName = 0;
  clearList = true;

  constructor() {
  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        HomeComponent.uid = user.uid;
        HomeComponent.fbData = firebase.database().ref().child('users/' + HomeComponent.uid);
        HomeComponent.fbData.on('child_added', function (snapshot) {
          const object = Object.values(snapshot.val());
          HomeComponent.myimages.push(object[0]);
        });
      } else {
        // User is signed out.
        firebase.auth().signInAnonymously().catch(function (error) {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
        });
      }
      // ...
    });
    this.divImglist = <HTMLDivElement>document.getElementById('div');
    this.mainPic = <HTMLImageElement>document.getElementById('mainPic');
    this.mainImageSrc = this.mainPic.src;
    this.inputImg = <HTMLInputElement>document.getElementById('myImage');
    this.inputImg.addEventListener('change', function (e) {
      // save file to storage
      const file = this.files[0];
      HomeComponent.fbStorege = firebase.storage().ref(HomeComponent.uid).child(file.name);
      HomeComponent.fbStorege.put(file).then(function (snapshot) {
        HomeComponent.fbStorege.getDownloadURL().then(function (urll) {
          HomeComponent.fbSetData(urll);
        });
      });
    });
    this.logInToFB();
  }

  ngAfterViewInit() {

  }

  previewFile(inputImage) {
    const reader = new FileReader();
    reader.readAsDataURL(this.inputImg.files[0]);
    const imgChosen = URL.createObjectURL(this.inputImg.files[0]);
    this.mainPic.src = imgChosen;
    this.inputImg.value = '';
  }

  saveName(event) {
    this.chosenPic = event.target;
    const myModel =  <HTMLDivElement>document.getElementById('demo');
    if (this.chosenPic.src === this.mainImageSrc) {
      myModel.setAttribute('data-target' , '#myModal');
    } else {
      this.mainPic.src = this.chosenPic.src;
    }
    console.log(this.chosenPic.src === this.mainImageSrc);
    if (this.images.length >= this.imgCount) {
      console.log('I am done');
      document.getElementById('btnDone').style.display = 'initial';
    }
  }

  getAllUserImages() {

  }

  // tslint:disable-next-line:member-ordering
  static fbSetData(inputImage: string) {
    const ref = firebase.database().ref('users/' + HomeComponent.uid);
    ref.push({ url: inputImage });
  }

  logInToFB() {
      this.images = HomeComponent.myimages;
  }

  iAmDone() {
      console.log('I am done');
  }
}
