export class InputValidationService {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const config = {
      'required': 'Field is required',
      'randomError': 'Sorry, but random generator thinks otherwise',
      'minlength': `Minimum length is ${validatorValue.requiredLength}`
    };

    return config[validatorName];
  }

  static randomValidator(control) {
    if (Math.random() < 0.5) {
      return { 'randomError': true };
    } else {
      return null;
    }
  }
}
