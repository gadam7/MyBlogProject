import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  postData: any;
  similarPostArray: Post[] | undefined;

  constructor( private route: ActivatedRoute, private postService: PostsService ) {}

  ngOnInit(): void {
    this.route.params.subscribe(items => {
      this.postService.countViews(items['id']);
      this.postService.loadOnePost(items['id']).subscribe(post => {
        this.postData = post;
        this.loadSimilarPost(this.postData.category.categoryId);
      })
    })
  }
  
  loadSimilarPost(catId: any) {
    this.postService.loadSimilar(catId).subscribe(items => {
      this.similarPostArray = items;
    })
  }

}
