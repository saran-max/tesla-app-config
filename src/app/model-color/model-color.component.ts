import { Component, OnDestroy, OnInit } from '@angular/core';
import { CarConfigService } from '../car-config.service';
import { CommonModule } from '@angular/common';
import { SharedDataService } from '../shared-data.service';
import { FormsModule } from '@angular/forms';
import { CarColor, CarModel } from './model-color.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-model-color',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './model-color.component.html',
  styleUrl: './model-color.component.scss'
})
export class ModelColorComponent implements OnInit, OnDestroy  {
  modelsData: CarModel[] = [];
  colors: CarColor[] = [];
  selectedModel: string = '';
  selectedColor: string = '';

  private modelsDataSubscription: Subscription = new Subscription;

  constructor(public carConfigService: CarConfigService, private sharedDataService: SharedDataService) {}

  ngOnInit(): void {
    this.fetchModelsData();
  }

  fetchModelsData(): void {
    this.modelsDataSubscription =  this.carConfigService.fetchModelsData().subscribe({
      next: (data: CarModel[]) => {
        this.modelsData = data;
        this.carConfigService.setModelsData(data);
        this.retrievePreviousValues();
      },
      error: (error) => {
        console.error('Error fetching models data:', error);
      }
    });
  }
  
  retrievePreviousValues(): void {
    this.selectedModel = this.sharedDataService.getSelectedModel(); 
    this.selectedColor = this.sharedDataService.getSelectedColor(); 

    if (this.selectedModel) {
      this.colors = this.modelsData.find(model => model.code === this.selectedModel)?.colors || [];
    }
  }

  onModelChange(): void {
    this.sharedDataService.setSelectedModel(this.selectedModel); 

    if (this.selectedModel) {
      this.colors = this.modelsData.find(model => model.code === this.selectedModel)?.colors || [];
      this.selectedColor = this.colors[0]?.code;
    } else {
      this.colors = [];
      this.selectedColor = '';
    } 

    this.onColorChange(); 

  }

  onColorChange(): void {
    this.sharedDataService.setSelectedColor(this.selectedColor);
  }

  ngOnDestroy(): void {
    if (this.modelsDataSubscription) {
      this.modelsDataSubscription.unsubscribe();
    }
  }

}