import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Angular komponens importok
import { AdminpageComponent } from './adminpage/adminpage.component';

//Adat komponens
import { DataComponent } from './data/data.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';



const routes: Routes = [
  {
    path: 'adminpage', component: AdminpageComponent
  },
  {
    path: 'data', component: DataComponent
  },{
    path: 'home', component: HomeComponent
  },{
    path: 'login', component: LoginComponent
  },{
    path: 'register', component: RegisterComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
