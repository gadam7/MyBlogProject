import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor( private firestore: AngularFirestore ) { }

  addSubs(subData: any) {
    this.firestore.collection('subscribers').add(subData).then(() => {
      console.log('Subscriber Saved Successfully');
    });
  }

  checkSubs(subEmail: any ) {
    return this.firestore.collection('subscribers', ref => ref.where('email', '==', subEmail)).get()
  }
}
