import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Galeria } from '../../model/galeria.model';
import { GaleriaServiceProvider } from '../../providers/galeria-service/galeria-service';
import { HttpClient } from '@angular/common/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagemUtilProvider } from '../../providers/imagem-util/imagem-util';

@IonicPage({})
@Component({
  selector: 'page-cadastro-galeria',
  templateUrl: 'cadastro-galeria.html',
})
export class CadastroGaleriaPage {

  formGroup: FormGroup;
  fotoConvert:any;
  items: Galeria[];
  base64Img:string;
  foto:string;


  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,
    private camera: Camera,
    public navParams: NavParams,
    private converter:ImagemUtilProvider,
    private servidor: GaleriaServiceProvider,
    public alertCtrl: AlertController, private http: HttpClient
  ) {

    this.formGroup = this.formBuilder.group({
      nome: [null, [Validators.required]],
      img:  [null, [Validators.required]]
    })
  }

  adicionar() {
    this.servidor.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      },
        error => { });

  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot('ListarGaleriaPage')
          }
        }
      ]
    });
    alert.present();
  }

}
