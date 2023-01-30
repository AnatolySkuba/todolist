import axios, { AxiosStatic } from 'axios'; // It could be any fetching services, such as default fetch, call api, xhr, etc.
import { IAddTodoForm } from '../todo/types/add-todo-form.type';
import { IHttpService } from '../common/types/http-service.types';
import { IUser } from '../user/types/user.type';
import { APP_KEYS } from '../common/consts';

export class HttpService implements IHttpService {
  constructor(baseUrl = process.env.REACT_APP_SERVER_URL, apiVersion = 'api') {
    this.baseUrl = baseUrl;
    this.fetchingService = axios;
    this.apiVersion = apiVersion;
  }

  baseUrl: string | undefined;

  fetchingService: AxiosStatic;

  apiVersion: string;

  private getFullApiUrl(url: string) {
    return `${this.baseUrl}/${this.apiVersion}/${url}`;
  }

  private populateTokenToHeaderConfig(): {
    Authorization: string | null;
  } {
    return {
      Authorization: `Bearer ${localStorage.getItem(APP_KEYS.STORAGE_KEYS.TOKEN)}`
    };
  }

  private extractUrlAndDataFromConfig({
    data,
    url,
    ...configWithoutDataAndUrl
  }: {
    [x: string]: any;
  }) {
    return configWithoutDataAndUrl;
  }

  async get(config: { url: string; headers?: object }, withAuth = true) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig()
      };
    }
    const response = await this.fetchingService.get(
      this.getFullApiUrl(config.url),
      this.extractUrlAndDataFromConfig(config)
    );
    return response;
  }

  async put(
    config: { url: string; headers?: object },
    body: {
      email?: string;
      oldPassword?: string;
      newPassword?: string;
      name?: string;
      value?: boolean;
    },
    withAuth = true
  ) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig()
      };
    }
    const response = await this.fetchingService.put(
      this.getFullApiUrl(config.url),
      body,
      this.extractUrlAndDataFromConfig(config)
    );
    return response.data;
  }

  async post(
    config: { url: string; headers?: object },
    body: IAddTodoForm | IUser,
    withAuth = true
  ) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig()
      };
    }
    const response = await this.fetchingService.post(
      this.getFullApiUrl(config.url),
      body,
      this.extractUrlAndDataFromConfig(config)
    );
    return response.data;
  }

  async delete(config: { url: string; headers?: object }, withAuth = true) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig()
      };
    }
    const response = await this.fetchingService.delete(
      this.getFullApiUrl(config.url),
      this.extractUrlAndDataFromConfig(config)
    );
    return response.data;
  }
}
