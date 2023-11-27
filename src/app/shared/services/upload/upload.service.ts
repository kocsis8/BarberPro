import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UploadImage } from '../../models/UploadImage';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  collectionName = 'Image';
  
  constructor(private afs: AngularFirestore) { }

  create(image: UploadImage){
   return this.afs.collection<UploadImage>(this.collectionName).add(image);
  }

  getAllImages(){
    return this.afs.collection<UploadImage>(this.collectionName, ref => ref)
    .get()
    .pipe(
      map((querySnapshot) => {
        const uploadImages: UploadImage[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data() as UploadImage;
          uploadImages.push(data);
        });

        return uploadImages;
      })
    );
  }
}
