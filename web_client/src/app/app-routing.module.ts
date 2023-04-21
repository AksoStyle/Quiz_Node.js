import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Angular komponens importok
import { AdminpageComponent } from './adminpage/adminpage.component';

//Adat komponens
import { DataComponent } from './data/data.component';



const routes: Routes = [
  {
    path: 'adminpage', component: AdminpageComponent
  },
  {
    path: 'data', component: DataComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
