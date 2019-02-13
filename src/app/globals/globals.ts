import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  serverBaseUrl: string = 'https://localhost:44311/api/';
  serverEndPointLogin: string = 'login';
  serverEndPointCustomer: string = 'customer';
  serverEndPointCity: string = 'city';
  serverEndPointClassification: string = 'classification';
  serverEndPointGender: string = 'gender';
  serverEndPointRegion: string = 'region';
  serverEndPointUser: string = 'user';
}