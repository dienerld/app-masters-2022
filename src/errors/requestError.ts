/* eslint-disable lines-between-class-members */
export type customError = {
  errorMessage: string;
  statusCode: number;
  requiredFields?: string[];
};

export class RequestCustomError {
  errorMessage: string;
  requiredFields?: string[];
  error: boolean;
  statusCode: number;

  constructor(error: customError) {
    this.error = true;
    this.errorMessage = error.errorMessage;
    this.requiredFields = error?.requiredFields;
    this.statusCode = error.statusCode || 500;
  }
}
