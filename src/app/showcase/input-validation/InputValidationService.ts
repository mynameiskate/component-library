import { IInputValidationService } from "../../library/shared/validation-service/IInputValidationService";

export class InputValidationService implements IInputValidationService {
  private minLength: number = 5;
  private maxLength: number = 30;

  validate(input: string) : Array<string> | null {
    if (input.length < this.minLength) {
      return [`Minimum length is ${this.minLength}`];
    } else if (input.length > this.maxLength) {
      return [`Maximum length is ${this.maxLength}`];
    } else if (Math.random() < 0.5) {
      return ['Sorry, but random generator thinks otherwise.'];
    } else {
      return null;
    }
  }
}
