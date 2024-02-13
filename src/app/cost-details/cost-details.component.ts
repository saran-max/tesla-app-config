import { Component } from '@angular/core';
import { CarColor, CarModel } from '../model-color/model-color.interface';
import { Config, ConfigOptions } from '../config-options/config-options.interface';
import { CarConfigService } from '../car-config.service';
import { SharedDataService } from '../shared-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cost-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cost-details.component.html',
  styleUrl: './cost-details.component.scss'
})
export class CostDetailsComponent {
  modelsData: CarModel[] = [];
  optionsData: ConfigOptions = {
    configs: [],
    towHitch: false,
    yoke: false
  };

  modelName: string | undefined;
  colorDetails: CarColor | undefined;
  selectedConfig: Config | undefined;
  towCost: number = 0;
  yokeCost: number = 0;
  totalCost: number = 0;

  constructor(private carConfigService: CarConfigService, public sharedDataService: SharedDataService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.modelsData = this.carConfigService.getModelsData();
    this.optionsData = this.carConfigService.getOptionsData();
    
    const selectedModel = this.sharedDataService.getSelectedModel();
    const selectedColor = this.sharedDataService.getSelectedColor();
    const configSelected = this.sharedDataService.getConfigSelected();

    const carModel = this.modelsData.find(model => model.code === selectedModel);
    if (carModel) {
      this.modelName = carModel.description;
      this.colorDetails = carModel.colors.find(color => color.code === selectedColor);
    }

    this.selectedConfig = this.optionsData.configs.find(config => config.id === configSelected);

    this.towCost = this.sharedDataService.getIncludeTow() ? 1000 : 0;
    this.yokeCost = this.sharedDataService.getIncludeYoke() ? 1000 : 0;
    this.calculateTotalCost();
  }

  calculateTotalCost(): void {
    this.totalCost = 0;
    this.totalCost += this.selectedConfig?.price ?? 0;
    this.totalCost += this.colorDetails?.price ?? 0;
    this.totalCost += this.towCost;
    this.totalCost += this.yokeCost;
  }

}
