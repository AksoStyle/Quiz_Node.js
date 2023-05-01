import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/get_data_services/data.service';
import { SnackbarService } from '../services/snackbar_service/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  temakor_nevek: Array<any> = [];
  selectedTemakor: string = '';
  selectedLevel: number = 1;


  constructor(
    private dataService: DataService,
    private snackbarService: SnackbarService,
    private router: Router,
    ) {}

  
  ngOnInit(): void {
    this.getTemakorNevek();
    
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
