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

  forumUpForm = new FormGroup({
    nev: new FormControl('', Validators.required),
  });

  hozzaszolasUpForm = new FormGroup({
    jatekosid: new FormControl('', Validators.required),
    forumid: new FormControl('', Validators.required),
    szoveg: new FormControl('', Validators.required),
    datum: new FormControl('', Validators.required),
  });

  temakorUpForm = new FormGroup({
    forumid: new FormControl('', Validators.required),
    nev: new FormControl('', Validators.required),
  });

  jatekSzobaUpForm = new FormGroup({
    jatekosid: new FormControl('', Validators.required),
    temakorid: new FormControl('', Validators.required),
    nehezsegiSzint: new FormControl('', Validators.required),
    idopont: new FormControl('', Validators.required),
  });

  kerdesUpForm = new FormGroup({
    temakorid: new FormControl('', Validators.required),
    szoveg: new FormControl('', Validators.required),
    nehezsegiSzint: new FormControl('', Validators.required),
  });

  valaszUpForm = new FormGroup({
    kerdesid: new FormControl('', Validators.required),
    szoveg: new FormControl('', Validators.required),
    helyesseg: new FormControl('', Validators.required),
  });

  ForumUP() {
    if(this.forumUpForm.valid){
      const nev = this.forumUpForm.get('nev')?.value;

      const forumNev = nev!;

      this.insertDataService.insertNewForum(forumNev).subscribe(res =>{
        this.snackbarService.show(['Forum sikeresen felvéve!']);
      },
      error => {
        this.snackbarService.show(['Hiba lépett fel a felvitel közben.']);
        console.log('adminpage.component.ts Hiba: ', error, '\n adatok: ', forumNev);

      });
    }
  }

  hozzaszolasUP(){
    if(this.hozzaszolasUpForm.valid){
      const jatekosId = this.hozzaszolasUpForm.get('jatekosid')!.value;
      if (typeof jatekosId !== 'number' || isNaN(jatekosId)) {
        this.snackbarService.show(['A játékos ID érvénytelen!']);
        return;
      }
      const forumId = this.hozzaszolasUpForm.get('forumid')?.value?.toString() || '';
      const szoveg = this.hozzaszolasUpForm.get('szoveg')?.value?.toString() || '';
      const datum = this.hozzaszolasUpForm.get('datum')?.value?.toString() || '';

      const DatumDate = new Date(datum!);


      function formatDate(date: Date) {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear().toString().substr(-2);

        return `${day}-${monthNames[monthIndex]}-${year}`;
      }
      
      const hozzaszolasData = {
        jatekosid: jatekosId!,
        forumid: forumId,
        szoveg: szoveg,
        datum: DatumDate
      }

      const nysd = formatDate(hozzaszolasData.datum);
      console.log("formatted date: " , nysd);

      this.insertDataService.insertNewHozzaszolas(
        hozzaszolasData.jatekosid,
        hozzaszolasData.forumid,
        hozzaszolasData.szoveg,
        nysd
      )
      .subscribe(res =>{

      },
      error => {
        this.snackbarService.show(['Hiba lépett fel a felvitel közben.']);
        console.log('adminpage.component.ts Hiba: ', error, '\n adatok: ', hozzaszolasData);

      });
    }
  }

  TemakorUP(){
    if(this.temakorUpForm.valid){
      const forumId = this.temakorUpForm.get('forumid')?.value?.toString() || '';
      const nev = this.temakorUpForm.get('nev')?.value?.toString() || '';

      const temakorData = {
        forumid: forumId,
        nev: nev,
      }

      this.insertDataService.insertNewTemakor(
        temakorData.forumid,
        temakorData.nev,
      )
      .subscribe(res =>{
        this.snackbarService.show(['Temakor sikeresen felvéve!']);
        console.log('adminpage.component.ts res: ', res, ' adatok: ', temakorData);
      },
      error => {
        this.snackbarService.show(['Hiba lépett fel a felvitel közben.']);
        console.log('adminpage.component.ts Hiba: ', error, '\n adatok: ', temakorData);

      });
    }
  }

  JatekSzobaUP(){
    if(this.jatekSzobaUpForm.valid){
      const jatekosId = this.jatekSzobaUpForm.get('jatekosid')!.value;
      if (typeof jatekosId !== 'number' || isNaN(jatekosId)) {
        this.snackbarService.show(['A játékos ID érvénytelen!']);
        return;
      }
      const temakorId = this.jatekSzobaUpForm.get('temakorid')?.value?.toString() || '';
      const nehezsegiSzint = this.jatekSzobaUpForm.get('nehezsegiSzint')?.value?.toString() || '';
      const idopont = this.jatekSzobaUpForm.get('idopont')?.value?.toString() || '';

      const idopontDate = new Date(idopont!);


      function formatDate(date: Date) {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear().toString().substr(-2);

        return `${day}-${monthNames[monthIndex]}-${year}`;
      }
      
      const jatekszobaData = {
        jatekos_id: jatekosId!,
        temakor_id: temakorId,
        nehezsegi_szint: nehezsegiSzint,
        idopont: idopontDate
      }

      const nysd = formatDate(jatekszobaData.idopont);
      console.log("formatted date: " , nysd);

      this.insertDataService.insertNewJatekszoba(
        jatekszobaData.jatekos_id,
        jatekszobaData.temakor_id,
        jatekszobaData.nehezsegi_szint,
        nysd
      )
      .subscribe(res =>{

      },
      error => {
        this.snackbarService.show(['Hiba lépett fel a felvitel közben.']);
        console.log('adminpage.component.ts Hiba: ', error, '\n adatok: ', jatekszobaData);

      });
    }
  }

  KerdesUP(){
    if(this.kerdesUpForm.valid){
      const temakorId = this.kerdesUpForm.get('temakorid')?.value?.toString() || '';
      const szoveg = this.kerdesUpForm.get('szoveg')?.value?.toString() || '';
      const nehezsegiSzint = this.kerdesUpForm.get('nehezsegiSzint')?.value?.toString() || '';

      const kerdesData = {
        temakorid: temakorId,
        szoveg: szoveg,
        nehezsegiSzint: nehezsegiSzint,
      }

      this.insertDataService.insertNewKerdes(
        kerdesData.temakorid,
        kerdesData.szoveg,
        kerdesData.nehezsegiSzint,
      )
      .subscribe(res =>{
        this.snackbarService.show(['kerdes sikeresen felvéve!']);
        console.log('adminpage.component.ts res: ', res, ' adatok: ', kerdesData);
      },
      error => {
        this.snackbarService.show(['Hiba lépett fel a felvitel közben.']);
        console.log('adminpage.component.ts Hiba: ', error, '\n adatok: ', kerdesData);

      });
    }
  }

  ValaszUP(){
    if(this.valaszUpForm.valid){
      const kerdesId = this.valaszUpForm.get('kerdesid')?.value;
      if (typeof kerdesId !== 'number' || isNaN(kerdesId)) {
        this.snackbarService.show(['A kérdés ID érvénytelen!']);
        return;
      }
      const szoveg = this.valaszUpForm.get('szoveg')?.value?.toString() || '';
      const helyesseg = this.valaszUpForm.get('helyesseg')?.value?.toString() || '';

      const valaszData = {
        kerdesid: kerdesId,
        szoveg: szoveg,
        helyesseg: helyesseg,
      }

      this.insertDataService.insertNewValasz(
        valaszData.kerdesid!,
        valaszData.szoveg,
        valaszData.helyesseg,
      )
      .subscribe(res =>{
        this.snackbarService.show(['valasz sikeresen felvéve!']);
        console.log('adminpage.component.ts res: ', res, ' adatok: ', valaszData);
      },
      error => {
        this.snackbarService.show(['Hiba lépett fel a felvitel közben.']);
        console.log('adminpage.component.ts Hiba: ', error, '\n adatok: ', valaszData);

      });
    }
  }

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
