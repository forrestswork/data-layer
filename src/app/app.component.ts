import { Component } from '@angular/core';
import {PostService} from 'data-store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'data-layer';
  constructor(private postService: PostService) {
    postService.entities$.subscribe(console.log);
    postService.getAll();
  }
}
