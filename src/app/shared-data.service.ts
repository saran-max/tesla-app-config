import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  step1Completed: boolean = false;
  step2Completed: boolean = false;

  selectedModel: string = '';
  selectedColor: string = '';

  configSelected: number | null = null;
  includeTow: boolean = false;
  includeYoke: boolean = false;

  constructor() { }

  setSelectedModel(model: string): void {
    this.selectedModel = model;
  }

  getSelectedModel(): string {
    return this.selectedModel;
  }

  setSelectedColor(color: string): void {
    this.selectedColor = color;
    if(this.selectedColor) this.step1Completed = true;
    else {
      this.step1Completed = false;
      this.step2Completed = false;
    }
  }

  getSelectedColor(): string {
    return this.selectedColor;
  }

  setConfigSelected(configId: number): void {
    this.configSelected = configId;
    if(this.configSelected) this.step2Completed = true;
    else this.step2Completed = false;
  }

  getConfigSelected(): number | null {
    return this.configSelected;
  }

  setIncludeTow(value: boolean): void {
    this.includeTow = value;
  }

  getIncludeTow(): boolean {
    return this.includeTow;
  }

  setIncludeYoke(value: boolean): void {
    this.includeYoke = value;
  }

  getIncludeYoke(): boolean {
    return this.includeYoke;
  }

}
