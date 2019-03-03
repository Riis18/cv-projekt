import { NgModule } from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';

@NgModule({
  declarations: [],
  imports: [
    AngularFireModule.initializeApp(environment.firebase)
  ],
  exports: [
    AngularFireStorageModule,
    AngularFirestoreModule,
  ]
})
export class FirebaseModule { }
