import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //featuredPostsArray: Array<object> = [];
  featuredPostsArray: Post[] | undefined;
  latestPostsArray: Post[] | undefined;

  constructor( private postService: PostsService) {
    
  }

  ngOnInit(): void {
    this.postService.loadFeatured().subscribe(items => {
      console.log(items);
      this.featuredPostsArray = items;
    });

    this.postService.loadLatest().subscribe(items => {
      this.latestPostsArray = items;
    });
      
  }

}
