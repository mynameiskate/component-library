import { AbstractControl } from "@angular/forms";

function getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
  const errorTable = {
    min: `Minimum value is ${validatorValue.min}`,
    max: `Maximum value is ${validatorValue.max}`,
    required: 'Field is required',
    randomError: 'Sorry, but random generator thinks otherwise',
    minlength: `Minimum length is ${validatorValue.requiredLength}`,
    maxlength: `Maximum length is ${validatorValue.requiredLength}`,
    email: 'Incorrect email format',
    pattern: `Required format is ${validatorValue.requiredPattern}`
  };

  return errorTable.hasOwnProperty(validatorName)
    ? errorTable[validatorName]
    : validatorValue;
}

function random(control: AbstractControl) {
  if (Math.random() < 0.5) {
    return {'randomError': 'Sorry, but random generator thinks otherwise.'};
  } else {
    return null;
  }
}

function matchPassword(controlName: string, matchControlName: string) {
  return (control: AbstractControl) => {
    let password = control.get(controlName);
    let passwordConfirm = control.get(matchControlName);

    if (!password || !password.value || !passwordConfirm) {
      return null;
    }

    if (password.value !== passwordConfirm.value) {
      control.get(matchControlName).setErrors({passwordMatch: 'Passwords do not match!'})
    } else {
      return null;
    }
  }
}

export {
  getValidatorErrorMessage,
  random,
  matchPassword
}


