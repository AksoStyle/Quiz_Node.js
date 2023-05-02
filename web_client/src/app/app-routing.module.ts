import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// Components
import { DataComponent } from './data/data.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GameComponent } from './game/game.component';
import { PlaygorundComponent } from './playgorund/playgorund.component';

import { AuthService } from './authguard/authservice.service';
import { AuthGuard } from './authguard/auth-guard.guard';





const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'adminpage', component: AdminpageComponent , canActivate: [AuthGuard]},
  { path: 'data', component: DataComponent , canActivate: [AuthGuard]},
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'game', component: GameComponent , canActivate: [AuthGuard]},
  { path: 'playground', component: PlaygorundComponent , canActivate: [AuthGuard]},
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthService],
  exports: [RouterModule]
})
export class AppRoutingModule { }
