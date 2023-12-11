import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css']
})
export class SingleCategoryComponent implements OnInit {

  postArray: Post[] | undefined;
  categoryDesc: any;

  constructor(private route: ActivatedRoute, private postService: PostsService ) {}

  ngOnInit(): void {

    this.route.params.subscribe(items => {
      console.log(items);
      this.categoryDesc = items;
      this.postService.loadCategoryPosts(items['id']).subscribe(post => {
        this.postArray = post;
      })
    })
      
  }

}
