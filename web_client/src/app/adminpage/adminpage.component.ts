import { Component } from '@angular/core';
import { InsertDataService } from '../services/insert_data_services/insert-data.service';
import { SnackbarService } from '../services/snackbar_service/snackbar.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.scss']
})
export class AdminpageComponent {
  constructor(
    private insertDataService: InsertDataService,
    private snackbarService: SnackbarService) { }


  versenyUpForm = new FormGroup({
    jatekosid: new FormControl('', Validators.required),
    nev: new FormControl('', Validators.required),
    leiras: new FormControl('', Validators.required),
    startofrace: new FormControl('', Validators.required),
    engedelyezve: new FormControl('', Validators.required),
    allapot: new FormControl('', Validators.required),

  });

  VersenyUP() {
    if (this.versenyUpForm.valid) {
      const jatekosId = this.versenyUpForm.get('jatekosid')!.value;
      if (typeof jatekosId !== 'number' || isNaN(jatekosId)) {
        this.snackbarService.show(['A játékos ID érvénytelen!']);
        return;
      }
      const nev = this.versenyUpForm.get('nev')?.value?.toString() || '';
      const leiras = this.versenyUpForm.get('leiras')?.value?.toString() || '';
      const nyitasiDatum = this.versenyUpForm.get('startofrace')?.value;
      const engedelyezve = this.versenyUpForm.get('engedelyezve')?.value?.toString() || '';
      const allapot = this.versenyUpForm.get('allapot')?.value?.toString() || '';

      




      
      const nyitasiDatumDate = new Date(nyitasiDatum!);


      function formatDate(date: Date) {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear().toString().substr(-2);

        return `${day}-${monthNames[monthIndex]}-${year}`;
      }

      


      const versenyData = {
        jatekosid: jatekosId,
        nev: nev!,
        leiras: leiras!,
        nyitasiDatum: nyitasiDatumDate,
        engedelyezve: engedelyezve!,
        allapot: allapot!
      }

      const nysd = formatDate(versenyData.nyitasiDatum);
      console.log("formatted date: " , nysd);


      this.insertDataService.insertNewVerseny(
        versenyData.jatekosid,
        versenyData.nev,
        versenyData.leiras,
        nysd,
        versenyData.engedelyezve,
        versenyData.allapot)
        .subscribe(res => {
          this.snackbarService.show(['Verseny sikeresen felvéve!']);
          console.log('adminpage.component.ts res: ', res, ' adatok: ', versenyData);
        },
          error => {
            this.snackbarService.show(['Hiba lépett fel a felvitel közben.']);
            console.log('adminpage.component.ts Hiba: ', error, '\n adatok: ', versenyData);

          });
    }
  }



}
