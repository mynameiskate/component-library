export interface IInputValidationService {
  validate(input: string): Array<string> | null;
}
