import { Pipe, PipeTransform, Inject } from '@angular/core';
import { FirebaseApp } from 'angularfire2';

@Pipe({
  name: 'firebaseUrl'
})
export class FirebaseUrlPipe implements PipeTransform {
  private storage: any;

  constructor( @Inject(FirebaseApp) firebaseApp: firebase.app.App) {
    this.storage = firebaseApp.storage();
  }

  transform(value: any, args?: any): any {
    if (value.startsWith('gs://')) {
      return this.storage.refFromURL(value).getMetadata()
      .then( metadata => {
        return metadata.downloadURLs[0].toString();
      }).catch(error => console.log('getFirebaseUrl ERROR:' + error));
    } else {
      return value;
    }
  }

  gatBase64Image(img) {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const dataURL = canvas.toDataURL('image/png');
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
  }

}
