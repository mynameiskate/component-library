export class InputValidationService {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const errorTable = {
      'required': 'Field is required',
      'randomError': 'Sorry, but random generator thinks otherwise',
      'minlength': `Minimum length is ${validatorValue.requiredLength}`
    };

    return errorTable[validatorName];
  }

  static randomValidator(control) {
    if (Math.random() < 0.5) {
      return { 'randomError': true };
    } else {
      return null;
    }
  }
}
