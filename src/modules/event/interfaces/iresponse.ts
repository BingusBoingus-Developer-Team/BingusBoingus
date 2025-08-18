export interface IResponse {
  matcher: RegExp;
  response: string | any;
  responseType?: ResponseType;
}

export enum ResponseType {
  Reply = 'reply',
  Message = 'message',
}
