import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor( private firestore: AngularFirestore ) { }

  loadFeatured() {
    return this.firestore.collection('posts', ref => ref.where('isFeatured', '==', true).limit(4)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as {
            title: string,
            permalink: string,
            category: {
              categoryId: string,
              categoryDescription: string,
              categoryColor: string
            }
            postImgPath: string,
            excerpt: string,
            content: string,
            isFeatured: boolean,
            views: number,
            status: string,
            //fetch createdAt timestamp from firebase
            createdAt: any         
          };
          const createdAt = data.createdAt.toDate();
          const id = a.payload.doc.id;
          return {
            id,
            title: data.title,
            postImgPath: data.postImgPath,
            excerpt: data.excerpt,
            category: data.category.categoryDescription,
            createdAt: createdAt
          } as unknown as Post;
        })
      })
    );
  }

  loadLatest() {
    return this.firestore.collection('posts', ref => ref.orderBy('createdAt') ).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as {
            title: string,
            permalink: string,
            category: {
              categoryId: string,
              categoryDescription: string,
              categoryColor: string
            }
            postImgPath: string,
            excerpt: string,
            content: string,
            isFeatured: boolean,
            views: number,
            status: string,
            //fetch createdAt timestamp from firebase
            createdAt: any         
          };
          const createdAt = data.createdAt.toDate();
          const id = a.payload.doc.id;
          return {
            id,
            title: data.title,
            postImgPath: data.postImgPath,
            excerpt: data.excerpt,
            category: data.category.categoryDescription,
            createdAt: createdAt
          } as unknown as Post;
        })
      })
    );
  }

  loadCategoryPosts( categoryId: any ) {
    return this.firestore.collection('posts', ref => ref.where('category.categoryId', '==', categoryId).limit(4)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as {
            title: string,
            permalink: string,
            category: {
              categoryId: string,
              categoryDescription: string,
              categoryColor: string
            }
            postImgPath: string,
            excerpt: string,
            content: string,
            isFeatured: boolean,
            views: number,
            status: string,
            //fetch createdAt timestamp from firebase
            createdAt: any         
          };
          const createdAt = data.createdAt.toDate();
          const id = a.payload.doc.id;
          return {
            id,
            title: data.title,
            postImgPath: data.postImgPath,
            excerpt: data.excerpt,
            category: data.category.categoryDescription,
            createdAt: createdAt
          } as unknown as Post;
        })
      })
    );
  }

  loadOnePost( postId: any ) {

    return this.firestore.doc(`posts/${postId}`).valueChanges();
  }
}
