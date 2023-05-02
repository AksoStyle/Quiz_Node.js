import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/get_data_services/data.service';
import { SnackbarService } from '../services/snackbar_service/snackbar.service';
import { Router } from '@angular/router';
import { UserdataService } from '../services/userdata_service/userdata.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  temakor_nevek: Array<any> = [];
  selectedTemakor: string = '';
  selectedLevel: number = 1;


  userData = { 
    token: '',
    jatekos_id: 0,
    nev: '',
    felhasznalonev: '',
    email: '',
    pontszam: 0,
  }

  constructor(
    private dataService: DataService,
    private snackbarService: SnackbarService,
    private router: Router,
    private UserdataService : UserdataService,
    ) {}

  
  ngOnInit(): void {
    this.getTemakorNevek();
    
    console.log(this.UserdataService.loginData);

    this.userData.token = this.UserdataService.loginData.token;
    this.userData.jatekos_id = this.UserdataService.loginData.jatekos_id;
    this.userData.nev = this.UserdataService.loginData.nev;
    this.userData.felhasznalonev = this.UserdataService.loginData.felhasznalonev;
    this.userData.email = this.UserdataService.loginData.email;
    this.userData.pontszam = this.UserdataService.loginData.pontszam;
  }

  start(temakor: string, nehezseg : number){
    this.selectedTemakor = temakor;
    this.selectedLevel = nehezseg;
    this.snackbarService.show([`Topic: ${this.selectedTemakor}, Level: ${this.selectedLevel}`]);
    setTimeout(() => {
      this.router.navigate(['/playground'], { queryParams: { topic: this.selectedTemakor, level: this.selectedLevel } });
    }, 1500);
  }

  getTemakorNevek = () => {
    this.dataService.getData().subscribe(data =>  {
      this.temakor_nevek = JSON.parse(data.temakor_nevek);
    })
  }


}
