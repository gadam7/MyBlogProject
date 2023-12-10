import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor( private firestore: AngularFirestore ) { }

  loadData() {
    return this.firestore.collection('categories').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as { description: string, color: string };
          const id = a.payload.doc.id;
          return { id, description: data.description, color: data.color} as Category;
        })
      })
    );
  }


}
