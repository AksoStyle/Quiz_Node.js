import { Component } from '@angular/core';
import { DataService } from '../services/get_data_services/data.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InsertDataService } from '../services/insert_data_services/insert-data.service';
import { SnackbarService } from './../services/snackbar_service/snackbar.service';
@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent {
  forumok : Array<any> = [];
  hozzaszolasok : Array<any> = [];

  sortedComments : Array<Array<Array<any>>> = [];
 

  rightnow = new Date();

  constructor(
    private dataService: DataService,
    private router: Router,
    private insertDataService: InsertDataService,
    private snackbarService: SnackbarService,
    ) {}


    hozzaszolasUpForm = new FormGroup({
      hozzaszolas : new FormControl('', Validators.required),
    })

    HozzaszolasUP(){
      const hozzaszolas = this.hozzaszolasUpForm.get('hozzaszolas')?.value;

      const hozzaszolasData = {
        hozzaszolas : hozzaszolas!,
        commentedTime : new Date(),

      }

      function formatDate(date: Date) {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear().toString().substr(-2);

        return `${day}-${monthNames[monthIndex]}-${year}`;
      }

      const formattedDate = formatDate(hozzaszolasData.commentedTime);
      
      this.insertDataService.insertNewHozzaszolas(1,"1",hozzaszolasData.hozzaszolas, formattedDate).subscribe(res => {
        this.snackbarService.show(['Sikeres kommentelés!']);
        console.log(res);
      }, error => {
        this.snackbarService.show(['Nem sikerült kommentelned:(!']);
      })
    }


    ngOnInit() : void {
      this.getAllForumData();
      this.getAllHozzaszolasData();
      

      setTimeout(() =>{
        this.getHozzaszolasWithForum();
        console.log(this.forumok);
        console.log(this.hozzaszolasok)
        console.log(this.sortedComments);
      }, 1000)
    }

    getAllForumData(){
      this.dataService.getData().subscribe(data => {
        this.forumok = JSON.parse(data.forum_data);
      })
    }


    getAllHozzaszolasData(){
      this.dataService.getData().subscribe(data => {
        this.hozzaszolasok = JSON.parse(data.hozzaszolas_data);
      })
    }

    getHozzaszolasWithForum(){
      for(let f of this.forumok){
        for(let h of this.hozzaszolasok){
          if(f[0] === h[2]){
            this.sortedComments.push([f[1],f[0], h[3]]);
          }
        }
      }
    }


    



}
