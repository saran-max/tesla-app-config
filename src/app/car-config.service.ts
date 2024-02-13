import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarModel } from './model-color/model-color.interface';
import { ConfigOptions } from './config-options/config-options.interface';

@Injectable({
  providedIn: 'root'
})
export class CarConfigService {

  private modelsData: CarModel[] = [];
  private optionsData: ConfigOptions = {
    configs: [],
    towHitch: false,
    yoke: false
  };

  constructor(private http: HttpClient) { }

  fetchModelsData(): Observable<CarModel[]> {
    return this.http.get<CarModel[]>('/models');
  }

  fetchOptions(selectedModel: string): Observable<ConfigOptions> {
    return this.http.get<ConfigOptions>(`/options/${selectedModel}`);
  }

  getModelsData(): CarModel[] {
    return this.modelsData;
  }

  setModelsData(data: CarModel[]): void {
    this.modelsData = data;
  }

  getOptionsData(): ConfigOptions {
    return this.optionsData;
  }

  setOptionsData(data: ConfigOptions): void {
    this.optionsData = data;
  }

}
