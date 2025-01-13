export const ValidateInputs = (input: HTMLInputElement, type: string) => {
  let result = { error: false, errorMessage: '', isValid: true };

  switch (type) {
    case 'email':
      if (!input.value || !/\S+@\S+\.\S+/.test(input.value)) {
        result = { error: true, errorMessage: 'Please enter a valid email address.', isValid: false };
      }
      break;
    case 'password':
      if (!input.value || input.value.length < 6) {
        result = { error: true, errorMessage: 'Password must be at least 6 characters long.', isValid: false };
      }
      break;
    default:
      break;
  }

  return result;
};