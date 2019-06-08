import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage({})
@Component({
  selector: 'page-listar-galeria',
  templateUrl: 'listar-galeria.html',
})
export class ListarGaleriaPage {
  
  foto:string;

  constructor(private camera: Camera,public navCtrl: NavController, public navParams: NavParams) {
  }

  openGaleria(){

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {

      let base64Image = 'data:image/jpeg;base64,' + imageData;
      
      this.foto = base64Image;

     }, (err) => {
      // Handle error
     });
     

  }

  openCamera(){

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {

      let base64Image = 'data:image/jpeg;base64,' + imageData;
      
      this.foto = base64Image;

     }, (err) => {
      // Handle error
     });
     

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ListarGaleriaPage');
  }

}
