import { Injectable } from "@angular/core";
import { Network } from '@ionic-native/network';
import { general } from '../../class/general/general';



@Injectable()
export class NetworkService {


    constructor(private network: Network,private general:general) {

    }

    initNetwork() {
console.log('observando conexiones');
        // watch network for a disconnection
        let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
            console.log('network was disconnected :-(');
            this.general.showToastMessage('No tienes acceso a internet','bottom');
        });

        // stop disconnect watch
        disconnectSubscription.unsubscribe();


        // watch network for a connection
        let connectSubscription = this.network.onConnect().subscribe(() => {
            console.log('network connected!');
            // this.general.showToastMessage('Tienes acceso a internet','bottom');
            // We just got a connection but we need to wait briefly
            // before we determine the connection type. Might need to wait.
            // prior to doing any api requests as well.
            setTimeout(() => {
                if (this.network.type === 'wifi') {
                    console.log('we got a wifi connection, woohoo!');
                }
            }, 3000);
        });

        // stop connect watch
        connectSubscription.unsubscribe();
    }


}