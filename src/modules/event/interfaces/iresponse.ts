export interface IResponse {
  matcher: RegExp;
  response: string | Object;
  responseType?: ResponseType;
}

export enum ResponseType {
  Reply = 'reply',
  Message = 'message',
}
