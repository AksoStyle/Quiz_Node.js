import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  adminData: Array<any> = [];
  jatekosData: Array<any> = [];
  versenyData: Array<any> = [];
  forumData: Array<any> = [];
  hozzaszolasData: Array<any> = [];
  temakorData: Array<any> = [];
  jatekszobaData: Array<any> = [];
  kerdesData: Array<any> = [];
  valaszData: Array<any> = [];

  constructor(private dataService: DataService) { }

  getAdminData = () => {
    this.dataService.getData().subscribe(data => {
      this.adminData = JSON.parse(data.admin_data);
      });
  }

  getJatekosData = () => {
    this.dataService.getData().subscribe(data => {
      this.jatekosData = JSON.parse(data.jatekos_data);
      });
  }

  getVersenyData = () => {
    this.dataService.getData().subscribe(data => {
      this.versenyData = JSON.parse(data.verseny_data);
      
      });
  }

  getForumData = () => {
    this.dataService.getData().subscribe(data => {
      this.forumData = JSON.parse(data.forum_data);
      });
  }

  getHozzaszolasData = () => {
    this.dataService.getData().subscribe(data => {
      this.hozzaszolasData = JSON.parse(data.hozzaszolas_data);
      });
  }

  getTemakorData = () => {
    this.dataService.getData().subscribe(data => {
      this.temakorData = JSON.parse(data.temakor_data);
      });
  }

  getJatekszobaData = () => {
    this.dataService.getData().subscribe(data => {
      this.jatekszobaData = JSON.parse(data.jatekosszoba_data);
      });
  }

  getKerdesData = () => {
    this.dataService.getData().subscribe(data => {
      this.kerdesData = JSON.parse(data.kerdes_data);
      });
  }

  getValaszData = () => {
    this.dataService.getData().subscribe(data => {
      this.valaszData = JSON.parse(data.valasz_data);
      });
  }

  ngOnInit(): void {
    this.getAdminData();
    this.getJatekosData();
    this.getVersenyData();
    this.getForumData();
    this.getHozzaszolasData();
    this.getTemakorData();
    this.getJatekszobaData();
    this.getKerdesData();
    this.getValaszData();
  }
}