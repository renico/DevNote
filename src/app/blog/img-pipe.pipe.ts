import { Pipe, PipeTransform, Inject } from '@angular/core';
import { FirebaseApp } from 'angularfire2';

@Pipe({
  name: 'imgPipe'
})
export class ImgPipe implements PipeTransform {
  private storage: any;

  constructor( @Inject(FirebaseApp) firebaseApp: firebase.app.App) {
    this.storage = firebaseApp.storage();
  }

  transform(value: any, args?: any): any {
    if (value.startsWith('gs://')) {
      return this.storage.refFromURL(value).getMetadata()
      .then( metadata => {
        console.log('getImageSrc:' + metadata.downloadURLs[0].toString());
        return metadata.downloadURLs[0].toString();
      }).catch(error => console.log(error));
    } else {
      return value;
    }
  }

}
