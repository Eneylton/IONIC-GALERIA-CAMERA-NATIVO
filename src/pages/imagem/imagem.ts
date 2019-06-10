import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GaleriaServiceProvider } from '../../providers/galeria-service/galeria-service';


@IonicPage({})
@Component({
  selector: 'page-imagem',
  templateUrl: 'imagem.html',
})
export class ImagemPage {

  galerias: any;

  formGroup: FormGroup;
  

  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private servidor: GaleriaServiceProvider
  ) {

    this.formGroup = this.formBuilder.group({

      nome: [null, [Validators.required]],
      img: [null, [Validators.required]],
      galeria: [null, [Validators.required]]
      
    })

  }

  ionViewDidLoad() {
    let items =  this.navParams.get('item');
    this.servidor.buscarPorID(items.id).subscribe(response=>{
    this.galerias = response;

    this.formGroup.controls.galeria.setValue(this.galerias);
    
    console.log(this.galerias.id);

    })
    
    }


  adicionar() {
    console.log(this.formGroup.value);
    this.servidor.insertImg(this.formGroup.value)
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
            this.navCtrl.setRoot('GaleriaPage')
          }
        }
      ]
    });
    alert.present();
  }
}