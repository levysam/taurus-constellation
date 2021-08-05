import { ValidationError } from 'yup';

export interface ValidationErrors {
  [key: string]: string;
}

const extractValidationErrors = (error: ValidationError): ValidationErrors => {
  const validationErrors: ValidationErrors = {};

  error.inner.forEach((item) => {
    if (item.path) {
      validationErrors[item.path] = item.message;
    }
  });

  return validationErrors;
};

export default extractValidationErrors;
