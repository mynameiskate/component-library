import { AbstractControl } from "@angular/forms";

function random(control: AbstractControl) {
  if (Math.random() < 0.5) {
    return {'randomError': 'Sorry, but random generator thinks otherwise.'};
  } else {
    return null;
  }
}

function matchPassword(controlName: string, matchControlName: string) {
  return (control: AbstractControl) => {
    const password = control.get(controlName);
    const passwordConfirm = control.get(matchControlName);

    if (!password || !password.value || !passwordConfirm) {
      return null;
    }

    if (password.value !== passwordConfirm.value) {
      passwordConfirm.setErrors({...passwordConfirm.errors,
        passwordMatch: 'Passwords do not match!'});
      return;
    } else {
      return null;
    }
  }
}

export {
  random,
  matchPassword
}


