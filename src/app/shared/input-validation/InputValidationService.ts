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

function randomValidator(control) {
  if (Math.random() < 0.5) {
    return {'randomError': 'Sorry, but random generator thinks otherwise.'};
  } else {
    return null;
  }
}

export {
  getValidatorErrorMessage,
  randomValidator
}


