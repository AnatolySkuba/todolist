import { AxiosStatic } from 'axios';

export interface IHttpService {
  baseUrl: string | undefined;
  fetchingService: AxiosStatic;
  apiVersion: string;
}
