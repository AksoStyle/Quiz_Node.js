import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/get_data_services/data.service';
import { DeleteDataService } from '../services/delete_data_services/delete-data.service';
import { UpdateDataService } from '../services/update_data_services/update-data.service';
import { SnackbarService } from '../services/snackbar_service/snackbar.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  updateAdminData = new FormGroup({
    felhasznalonev: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    jelszo: new FormControl('', Validators.required),
  });
  
  updateJatekosData = new FormGroup({
    nev: new FormControl('', Validators.required),
    felhasznalonev: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    jelszo: new FormControl('', Validators.required),
    szuletesi_datum: new FormControl('', Validators.required),
  });

  updateVersenyData = new FormGroup({
    jatekos_id: new FormControl('', Validators.required),
    nev: new FormControl('', Validators.required),
    leiras: new FormControl('', Validators.required),
    nyitasiDatum: new FormControl('', Validators.required),
    engedelyezve: new FormControl('', Validators.required),
    allapot: new FormControl('', Validators.required),
  });

  updateForumData = new FormGroup({
    nev: new FormControl('', Validators.required),
  });

  updateHozzaszolasData = new FormGroup({
    jatekos_id: new FormControl('', Validators.required),
    forum_id: new FormControl('', Validators.required),
    szoveg: new FormControl('', Validators.required),
    datum: new FormControl('', Validators.required),
});
  
  

  constructor(
    private dataService: DataService,
    private deleteDataServices: DeleteDataService,
    private snackbar: SnackbarService,
    private updateService: UpdateDataService,
    private router: Router,
  ) {

    
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

  




  // UPDATE METHODS 

  // ADMIN
  updateAdmin(id : string) {
    const felhasznalonev = this.updateAdminData.get('felhasznalonev')?.value;
    const email = this.updateAdminData.get('email')?.value;
    const jelszo = this.updateAdminData.get('jelszo')?.value;

    const adminData = {
      felhasznalonev: felhasznalonev!,
      email: email!,
      jelszo: jelszo!
    }
    this.updateService.updateAdmin(id, adminData.felhasznalonev, adminData.email, adminData.jelszo)
      .then(() => {
        this.snackbar.show(['Sikeres adatfrissítés!']);
        setTimeout(() => {
          this.router.navigate(['/data'], { queryParams: { reload: true } });
        }, 1500);
      })
      .catch(() => {
        this.snackbar.show(['Adatfrissítés nem sikerült.']);
      });
  }

  //JATEKOS
  updateJatekos(id : string) {
    const nev = this.updateJatekosData.get('nev')?.value;
    const felhasznalonev = this.updateJatekosData.get('felhasznalonev')?.value;
    const email = this.updateJatekosData.get('email')?.value;
    const jelszo = this.updateJatekosData.get('jelszo')?.value;
    const szuletesi_datum = this.updateJatekosData.get('szuletesi_datum')?.value;
    
    const birthDate = new Date(szuletesi_datum!);
    const jatekosData = {
      nev: nev!,
      felhasznalonev: felhasznalonev!,
      email: email!,
      jelszo: jelszo!,
      szuletesi_datum: birthDate,
    }

    function formatDate(date: Date) {
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
      const day = date.getDate();
      const monthIndex = date.getMonth();
      const year = date.getFullYear().toString().substr(-2);
    
      return `${day}-${monthNames[monthIndex]}-${year}`;
    }

    const formattedDate = formatDate(jatekosData.szuletesi_datum);


    this.updateService.updateJatekos(id, jatekosData.nev, jatekosData.felhasznalonev, jatekosData.email, jatekosData.jelszo, formattedDate)
      .then(() => {
        this.snackbar.show(['Sikeres adatfrissítés! ']);
        setTimeout(() => {
          this.router.navigate(['/data'], { queryParams: { reload: true } });
        }, 1500);
      })
      .catch((err) => {
        this.snackbar.show(['Adatfrissítés nem sikerült. Hiba: ', err]);
      });
  }

  // VERSENY 

  updateVerseny(id: string){
    const jatekos_id = this.updateVersenyData.get('jatekos_id')?.value;
    const nev = this.updateVersenyData.get('nev')?.value;
    const leiras = this.updateVersenyData.get('leiras')?.value;
    const nyitasiDatum = this.updateVersenyData.get('nyitasiDatum')?.value;
    const engedelyezve = this.updateVersenyData.get('engedelyezve')?.value;
    const allapot = this.updateVersenyData.get('allapot')?.value;
    
    const gamestartDate = new Date(nyitasiDatum!);
    const versenyData = {
      jatekos_id: jatekos_id!,
      nev: nev!,
      leiras: leiras!,
      nyitasiDatum: gamestartDate,
      engedelyezve: engedelyezve!,
      allapot: allapot!,
    }

    function formatDate(date: Date) {
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
      const day = date.getDate();
      const monthIndex = date.getMonth();
      const year = date.getFullYear().toString().substr(-2);
    
      return `${day}-${monthNames[monthIndex]}-${year}`;
    }

    const formattedDate = formatDate(versenyData.nyitasiDatum);
    console.log("versenyData: ", versenyData);
    this.updateService.updateVerseny(id, versenyData.jatekos_id, versenyData.nev, versenyData.leiras, formattedDate, versenyData.engedelyezve, versenyData.allapot)
    .then(() => {
      this.snackbar.show(['Sikeres adatfrissítés! ']);
      
    })
    
  }

  // FORUM

  updateForum(id: string){
    const nev = this.updateForumData.get('nev')?.value;

    const forumData = {
      nev: nev!
    }

    this.updateService.updateForum(id, forumData.nev)
    .then(() => {
      this.snackbar.show(['Sikeres adatfrissítés! ']);
      setTimeout(() => {
        this.router.navigate(['/data'], { queryParams: { reload: true } });
      }, 1500);
    })
    .catch((err) => {
      this.snackbar.show(['Adatfrissítés nem sikerült. Hiba: ', err]);
    });
  }

  // HOZZASZOLAS

  updateHozzaszolas(id: string){

    const jatekos_id = this.updateForumData.get('jatekos_id')?.value;
    const forum_id = this.updateForumData.get('forum_id')?.value;
    const szoveg = this.updateForumData.get('szoveg')?.value;
    const datum = this.updateForumData.get('datum')?.value;
    
    const datumDate = new Date(datum!);

    const hozzaszolasData = {
      jatekos_id: jatekos_id!,
      forum_id: forum_id!,
      szoveg: szoveg!,
      datum: datumDate!
    }

    function formatDate(date: Date) {
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
      const day = date.getDate();
      const monthIndex = date.getMonth();
      const year = date.getFullYear().toString().substr(-2);
    
      return `${day}-${monthNames[monthIndex]}-${year}`;
    }

    const formattedDate = formatDate(hozzaszolasData.datum);

    this.updateService.updateHozzaszolas(id, hozzaszolasData.jatekos_id, hozzaszolasData.forum_id, hozzaszolasData.szoveg, formattedDate)
    .then(() => {
      this.snackbar.show(['Sikeres adatfrissítés! ']);
      setTimeout(() => {
        this.router.navigate(['/data'], { queryParams: { reload: true } });
      }, 1500);
    })
    .catch((err) => {
      this.snackbar.show(['Adatfrissítés nem sikerült. Hiba: ', err]);
    });
  }

  // TEMAKOR

  updateTemakor(temakor: any){
    this.updateService.updateTemakor(temakor[0], temakor.forum_id, temakor.nev)
    .then(() => {
      this.snackbar.show(['Sikeres adatfrissítés! ']);
      setTimeout(() => {
        this.router.navigate(['/data'], { queryParams: { reload: true } });
      }, 1500);
    })
    .catch((err) => {
      this.snackbar.show(['Adatfrissítés nem sikerült. Hiba: ', err]);
    });
  }

  // JATEKSZOBA

  updateJatekszoba(jatekszoba: any){
    this.updateService.updateJatekszoba(jatekszoba[0], jatekszoba.jatekos_id, jatekszoba.temakor_id,jatekszoba.nehezsegi_szint, jatekszoba.idopont)
    .then(() => {
      this.snackbar.show(['Sikeres adatfrissítés! ']);
      setTimeout(() => {
        this.router.navigate(['/data'], { queryParams: { reload: true } });
      }, 1500);
    })
    .catch((err) => {
      this.snackbar.show(['Adatfrissítés nem sikerült. Hiba: ', err]);
    });
  }

  // KERDES

  updateKerdes(kerdes: any){
    this.updateService.updateKerdes(kerdes[0], kerdes.szoveg, kerdes.nehezsegi_szint)
    .then(() => {
      this.snackbar.show(['Sikeres adatfrissítés! ']);
      setTimeout(() => {
        this.router.navigate(['/data'], { queryParams: { reload: true } });
      }, 1500);
    })
    .catch((err) => {
      this.snackbar.show(['Adatfrissítés nem sikerült. Hiba: ', err]);
    });
  }

  // VALASZ

  updateValasz(valasz: any){
    this.updateService.updateValasz(valasz[0], valasz.kerdesId, valasz.szoveg, valasz.helyesseg)
    .then(() => {
      this.snackbar.show(['Sikeres adatfrissítés! ']);
      setTimeout(() => {
        this.router.navigate(['/data'], { queryParams: { reload: true } });
      }, 1500);
    })
    .catch((err) => {
      this.snackbar.show(['Adatfrissítés nem sikerült. Hiba: ', err]);
    });
  }
  // -----------------------------------------------------------------
  // DELETE METHODS 
  deleteVerseny(VersenyID: number) {
    this.deleteDataServices.deleteVersenyData(VersenyID).subscribe(
      () => {
        this.snackbar.show([`Sikeres verseny törlés ID=${VersenyID} alapján`], 'success-snackbar');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      },
      (err) => {
        this.snackbar.show([`Sikertelen verseny törlés, ID=${VersenyID}, hiba: ${err}`], 'error-snackbar');
      }
    );
  }

  deleteForum(ForumID: number) {
    this.deleteDataServices.deleteForumData(ForumID).subscribe(
      () => {
        this.snackbar.show([`Sikeres forum törlés ID=${ForumID} alapján`], 'success-snackbar');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      },
      (err) => {
        this.snackbar.show([`Sikertelen forum törlés, ID=${ForumID}, hiba: ${err}`], 'error-snackbar');
      }
    );
  }

  deleteHozzaszolas(HozzaszolasID: number) {
    this.deleteDataServices.deleteHozzaszolasData(HozzaszolasID).subscribe(
      () => {
        this.snackbar.show([`Sikeres hozzaszolas törlés ID=${HozzaszolasID} alapján`], 'success-snackbar');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      },
      (err) => {
        this.snackbar.show([`Sikertelen hozzaszolas törlés, ID=${HozzaszolasID}, hiba: ${err}`], 'error-snackbar');
      }
    );
  }

  deleteTemakor(TemakorID: number) {
    this.deleteDataServices.deleteTemakorData(TemakorID).subscribe(
      () => {
        this.snackbar.show([`Sikeres temakor törlés ID=${TemakorID} alapján`], 'success-snackbar');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      },
      (err) => {
        this.snackbar.show([`Sikertelen temakor törlés, ID=${TemakorID}, hiba: ${err}`], 'error-snackbar');
      }
    );
  }

  deleteJatekszoba(JatekosszobaID: number) {
    this.deleteDataServices.deleteJatekszobaData(JatekosszobaID).subscribe(
      () => {
        this.snackbar.show([`Sikeres jatekszoba törlés ID=${JatekosszobaID} alapján`], 'success-snackbar');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      },
      (err) => {
        this.snackbar.show([`Sikertelen jatekszoba törlés, ID=${JatekosszobaID}, hiba: ${err}`], 'error-snackbar');
      }
    );
  }

  deleteKerdes(KerdesID: number) {
    this.deleteDataServices.deleteKerdesData(KerdesID).subscribe(
      () => {
        this.snackbar.show([`Sikeres kerdes törlés ID=${KerdesID} alapján`], 'success-snackbar');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      },
      (err) => {
        this.snackbar.show([`Sikertelen kerdes törlés, ID=${KerdesID}, hiba: ${err}`], 'error-snackbar');
      }
    );
  }

  deleteValasz(ValaszID: number) {
    this.deleteDataServices.deleteValaszData(ValaszID).subscribe(
      () => {
        this.snackbar.show([`Sikeres valasz törlés ID=${ValaszID} alapján`], 'success-snackbar');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      },
      (err) => {
        this.snackbar.show([`Sikertelen valasz törlés, ID=${ValaszID}, hiba: ${err}`], 'error-snackbar');
      }
    );
  }

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



  
}