import { Component, OnInit } from '@angular/core';
import { SnackbarService } from '../services/snackbar_service/snackbar.service';
import { Router } from '@angular/router';
import { DataService } from '../services/get_data_services/data.service';
import { UserdataService } from '../services/userdata_service/userdata.service';
import { UpdateDataService } from '../services/update_data_services/update-data.service';

@Component({
  selector: 'app-playgorund',
  templateUrl: './playgorund.component.html',
  styleUrls: ['./playgorund.component.scss']
})
export class PlaygorundComponent implements OnInit {
  timeLeft = 25;
  interval: any;


  questions: Array<any> = [];
  answers: Array<any> = [];
  currentQuestionId: number = 1;
  currentQuestion: any;
  currentAnswers: Array<Array<any>> = [];
  currentAnswerID: any;

  userPontszam = 0;

  constructor(
    private snackbarService: SnackbarService,
    private router: Router,
    private dataService: DataService,
    private userdataService: UserdataService,
    private updateDataService: UpdateDataService,
  ) { }

  ngOnInit(): void {
    this.getAllKerdes();
    this.getAllValasz();

    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        //this.stopTimer();
      }
    }, 1000)
    setTimeout(() => {
      this.getCurrentQuestionAndAnswers();
    }, 1500);
    
    this.userPontszam = this.userdataService.loginData.pontszam;


  }

  scoreUP(score: number){
    this.updateDataService.updateJatekosPontszam(this.userdataService.loginData.jatekos_id.toString(), score)
      .then((response) => {
        console.log('Pontszám sikeresen frissítve!');
        console.log(response);
      })
      .catch((error) => {
        console.log('Hiba történt a pontszám frissítése során:', error);
      });
  }
  
  
  



  stopTimer() {
    clearInterval(this.interval);
    this.snackbarService.show(['Sajnos lejárt az időd.'])
    setTimeout(() => {
      this.router.navigate(['/home'], { queryParams: {} });
    }, 1500);
  }

  getAllKerdes() {
    this.dataService.getData().subscribe(data => {
      this.questions = JSON.parse(data.kerdes_data);
      console.log("Kerdesek: ", this.questions);
    })
  }

  getAllValasz() {
    this.dataService.getData().subscribe(data => {
      this.answers = JSON.parse(data.valasz_data);
      console.log("Valaszok: ", this.answers);
    })
  }

  choose(id: number) {
    console.log(id);
    for (let a of this.answers) {
      if(a[0] === id && a[3] === 1){
        this.userPontszam += 10;
        this.userdataService.loginData.pontszam += 10;
        this.scoreUP(this.userPontszam);
        this.snackbarService.show(['Helyes válasz!']);
        setTimeout(() => {
          this.router.navigate(['/game']);
        }, 1500);
      } else{
        this.snackbarService.show(['WRONG']);
      }
    } 

  }

   getCurrentQuestionAndAnswers(){
    for(let q of this.questions){
      if(q[0] === this.currentQuestionId){
        this.currentQuestion = q[2];
      }
    }

    for(let a of this.answers){
      if(a[1] === this.currentQuestionId){
        this.currentAnswers.push([a[0], a[2]]);
        
      }
    }

    console.log("jelenlegi kérdés: " , this.currentQuestion);
    console.log("jelenlegi válaszok: " , this.currentAnswers);
  }
}