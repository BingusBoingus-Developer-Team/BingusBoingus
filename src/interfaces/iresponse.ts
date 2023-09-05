interface IResponse {
  matcher: RegExp;
  response: string;
}

export const responseList: Array<IResponse> = [
  {
    matcher: /wag1/i,
    response: 'wagwan2',
  },
  {
    matcher: /^.{150,}$/,
    response: 'halbe Bibel, ganzer huansohn ?XD',
  },
  {
    matcher: /https:\/\//,
    response: 'send yo virus link to someone else no?xd',
  },
];
