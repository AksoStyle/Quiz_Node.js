import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register_services/register-data.service';
import { SnackbarService } from '../services/snackbar_service/snackbar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(
    private location: Location,
    private router: Router,
    private snackbar: SnackbarService,
    private registerService: RegisterService
  ) { }




  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    birthdate: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    rePassword: new FormControl('', Validators.required),

  });

  onSubmit() {
    if (this.registerForm.valid) {
      const name = this.registerForm.get('name')?.value;
      const username = this.registerForm.get('username')?.value;
      const email = this.registerForm.get('email')?.value;
      const birthdate = this.registerForm.get('birthdate')?.value;
      const password = this.registerForm.get('password')?.value;


      const today = new Date();
      const birthDate = new Date(birthdate!);
      let age = today.getFullYear() - birthDate.getFullYear();
      const month = today.getMonth() - birthDate.getMonth();
      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if (age >= 14) {
        const userData = {
          nev: name!,
          felhasznalonev: username!,
          email: email!,
          szuletesiDatum: birthDate,
          jelszo: password!,
        };

        function formatDate(date: Date) {
          const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                              "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
          const day = date.getDate();
          const monthIndex = date.getMonth();
          const year = date.getFullYear().toString().substr(-2);
        
          return `${day}-${monthNames[monthIndex]}-${year}`;
        }
        
        const formattedDate = formatDate(userData.szuletesiDatum);

        


        this.registerService.register(
          userData.nev,
          userData.felhasznalonev,
          userData.email,
          userData.jelszo,
          formattedDate, 0)
            .subscribe(res => {
            this.snackbar.show(['Siekres regisztráció!'])
            console.log(res);
            this.router.navigateByUrl('home');
          },
          error => {
            this.snackbar.show(['Sajnos valamilyen hiba lépett fel :(!'])
            console.error(error);
          }
        );
      } else {

        this.snackbar.show(['A felhasználónak 14 évnél idősebbnek kell lennie!'])
      }
    }
  }




  goBack() {
    this.location.back();
  }

}
