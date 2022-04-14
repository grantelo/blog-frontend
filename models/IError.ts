export default interface IError {
  message: Array<Object> | string;
  response: any;
  statusCode: number;
}
