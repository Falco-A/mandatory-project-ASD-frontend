import {Component, OnInit} from '@angular/core';
import {LoadingController, MenuController, NavController, ToastController} from '@ionic/angular';

import {LoginService} from '../services/login/login.service';
import {ConstantsService} from '../services/constants/constants.service';
import {UserService} from '../services/user/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    public username: string;
    public password: string;

    constructor(private navCtrl: NavController,
                private loginService: LoginService,
                private loadingCtrl: LoadingController,
                private menuCtrl: MenuController,
                private constantsService: ConstantsService,
                private userService: UserService,
                private toastController: ToastController) {
        this.menuCtrl.enable(false);
    }

    ngOnInit() {
    }

    public async login() {
        const loading = await this.loadingCtrl.create({
            message: 'Effettuo il login...',
            keyboardClose: true,
            spinner: 'circles'
        });
        await loading.present();

        this.loginService.login(this.username, this.password).then(async response => {
            if (response == null || response == this.constantsService.HTTP_ACCESS_FAILURE) {
                const toast = await this.toastController.create({
                    message: 'Credenziali errate',
                    position: 'bottom',
                    duration: 2000,
                    color: 'secondary'
                });
                toast.present();
            } else if (response == this.constantsService.HTTP_ACCESS_SUCCESS) {
                this.userService.username = this.username;
                this.navCtrl.navigateRoot('home');
                this.menuCtrl.enable(true);
                const toast = this.toastController.create({
                    message: 'Accesso effettuato con successo',
                    position: 'bottom',
                    duration: 2000,
                    color: 'secondary'
                }).then(() =>
                    toast.present()
                );
            } else {
                console.log('Errore');
            }
        });

        await loading.dismiss();
    }
}
