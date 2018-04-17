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
  }

}
