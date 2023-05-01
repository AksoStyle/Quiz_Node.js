import { Component, OnInit } from '@angular/core';
import { SnackbarService } from '../services/snackbar_service/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-playgorund',
  templateUrl: './playgorund.component.html',
  styleUrls: ['./playgorund.component.scss']
})
export class PlaygorundComponent implements OnInit {
  timeLeft = 25;
  interval: any;
  constructor(
    private snackbarService: SnackbarService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.stopTimer();
      }
    }, 1000)



  }

  stopTimer() {
    clearInterval(this.interval);
    this.snackbarService.show(['Sajnos lejárt az időd.'])
    setTimeout(() => {
      this.router.navigate(['/home'], { queryParams: {  } });
    }, 1500);
  }


}
