import { Component } from '@angular/core';
import { DataService } from '../services/get_data_services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  Jatekosok : Array<any> = [];

  constructor(
    private dataService: DataService,
  ) {}

  getAllJatekos(){
    this.dataService.getData().subscribe(data => {
      this.Jatekosok = JSON.parse(data.jatekos_data);
      this.sortByPoints();
    });
  }

  sortByPoints() {
    this.Jatekosok.sort((a, b) => b[6] - a[6]);
  }

  ngOnInit() : void {
    this.getAllJatekos();
    this.Jatekosok.sort((a, b) => b[6] - a[6]);
    
  }
  
}
