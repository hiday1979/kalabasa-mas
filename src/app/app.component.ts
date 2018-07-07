import { Component } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Cloudinary } from '@cloudinary/angular-5.x';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'app';
  options: any = {
      removeOnSpill: true
  };

  constructor (private dragulaService: DragulaService, private cloudinary: Cloudinary) {
  }
}
