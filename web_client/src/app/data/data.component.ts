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
  updateJatekos(jatekos: any) {
    this.updateService.updateJatekos(jatekos[0], jatekos.nev, jatekos.felhasznalonev, jatekos.email, jatekos.jelszo, jatekos.szuletesiDatum)
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

  updateVerseny(verseny: any){
    this.updateService.updateVerseny(verseny[0], verseny.jatekos_ID, verseny.nev, verseny.leiras, verseny.nyitasiDatum, verseny.engedelyezve, verseny.allapot)
    .then(() => {
      this.snackbar.show(['Sikeres adatfrissítés! ']);
      
    })
    
  }

  // FORUM

  updateForum(forum: any){
    this.updateService.updateForum(forum[0], forum.nev)
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

  updateHozzaszolas(hozzaszolas: any){
    this.updateService.updateHozzaszolas(hozzaszolas[0], hozzaszolas.jatekos_id, hozzaszolas.forum_id, hozzaszolas.szoveg, hozzaszolas.datum)
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