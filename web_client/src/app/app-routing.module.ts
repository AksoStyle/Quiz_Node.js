import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// Components
import { DataComponent } from './data/data.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { NavbarComponent } from './navbar/navbar.component';





const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'adminpage', component: AdminpageComponent },
  { path: 'data', component: DataComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'navbar', component: NavbarComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
