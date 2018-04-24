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
    document.getElementById('myMainBar').addEventListener('click', function (e) {
      const x = e.pageX - this.offsetLeft, // or e.offsetX (less support, though)
          y = e.pageY - this.offsetTop,  // or e.offsetY
          clickedValue = x * this.offsetLeft / this.offsetWidth,
          isClicked = clickedValue <= x;


      if (isClicked) {
          // alert('You clicked within the value range at: ' + clickedValue);
          document.getElementById('mainPic').style.width = '' + clickedValue + '%';
          document.getElementById('myBar').style.width = '' + clickedValue + '%';
      }
  });
    const elem = document.getElementById('myBar');
    let width = 1;
    const id = setInterval(frame, 10);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
        }
    }
}

}
