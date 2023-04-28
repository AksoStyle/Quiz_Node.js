import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/get_data_services/data.service';
import { DeleteDataService } from '../services/delete_data_services/delete-data.service';
import { SnackbarService } from '../services/snackbar_service/snackbar.service';

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

  constructor(
    private dataService: DataService,
    private deleteDataServices: DeleteDataService,
    private snackbar: SnackbarService,
  ) { }

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