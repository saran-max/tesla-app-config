import { Component, OnDestroy, OnInit } from '@angular/core';
import { CarConfigService } from '../car-config.service';
import { SharedDataService } from '../shared-data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfigOptions } from './config-options.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-config-options',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './config-options.component.html',
  styleUrl: './config-options.component.scss'
})
export class ConfigOptionsComponent implements OnInit, OnDestroy  {

  optionsData: ConfigOptions = {
    configs: [],
    towHitch: false,
    yoke: false
  };

  configSelected:string ='';
  includeYoke:boolean = false;
  includeTow:boolean = false;

  range: number | undefined;
  speed: number | undefined;
  price: number | undefined;

  private optionsDataSubscription: Subscription = new Subscription;

  constructor(public carConfigService: CarConfigService, private sharedDataService: SharedDataService) {}

  ngOnInit(): void {
    this.fetchOptions();
  }

  fetchOptions():void {
    this.optionsDataSubscription = this.carConfigService.fetchOptions(this.sharedDataService.getSelectedModel()).subscribe({
      next: (data:ConfigOptions) => {
        this.optionsData = data;
        this.carConfigService.setOptionsData(data);
        this.retrievePreviousValues();
      },
      error: (error) => {
        console.error('Error fetching options data:', error);
      }
    });
  }

  retrievePreviousValues():void{
    this.configSelected = this.sharedDataService.getConfigSelected()?.toString() || ''; 
    this.calculateRangeSpeedCost();
    this.includeTow = this.sharedDataService.getIncludeTow();
    this.includeYoke = this.sharedDataService.getIncludeYoke();
  }

  onConfigChange(): void {
    this.sharedDataService.setConfigSelected(parseInt(this.configSelected));
    this.calculateRangeSpeedCost();
    this.includeTow = false;
    this.includeYoke = false;
    this.onTowChanges();
    this.onYokeChanges();
  }

  onTowChanges(): void {
    this.sharedDataService.setIncludeTow(this.includeTow);
  }

  onYokeChanges(): void {
    this.sharedDataService.setIncludeYoke(this.includeYoke);
  }

  calculateRangeSpeedCost(): void {
    const selectedConfig = this.optionsData.configs.find(config => config.id.toString() === this.configSelected);
    if (selectedConfig) {
      this.range = selectedConfig.range;
      this.speed = selectedConfig.speed;
      this.price = selectedConfig.price;
    }
  }

  ngOnDestroy(): void {
    if (this.optionsDataSubscription) {
      this.optionsDataSubscription.unsubscribe();
    }
  }

}
