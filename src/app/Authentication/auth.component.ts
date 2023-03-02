import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService, ResponseData } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "auth.component.html",
})
export class AuthComponent {
  isLoggedIn: boolean = true;
  isLoading: boolean = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoggedIn = !this.isLoggedIn;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let Auth: Observable<ResponseData>;
    this.isLoading = true;

    if (this.isLoggedIn) {
      Auth = this.authService.login(email, password);
    } else {
      Auth = this.authService.signUp(email, password);
    }

    Auth.subscribe(
      (response) => {
        console.log(response);
        this.isLoading = false;
        this.router.navigate(["./recipes"]);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
    form.reset();
  }
}
