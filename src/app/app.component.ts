import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CarConfigService } from './car-config.service';
import { SharedDataService } from './shared-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule, HttpClientModule, RouterOutlet, RouterLink],
  providers:[ CarConfigService, SharedDataService],
  templateUrl: './app.component.html',
  styleUrls:['./app.component.scss']
})
export class AppComponent {

  activeStep:string = 'Step1';

  constructor(private router: Router, public sharedDataService: SharedDataService) {}

  ngOnInit():void { }

  openStep(stepName: string): void {
    let routePath: string;
  
    switch (stepName) {
      case 'step1':
        this.activeStep = 'Step1';
        routePath = '/model-color';
        break;
      case 'step2':
        this.activeStep = 'Step2';
        routePath = '/config-options';
        break;
      case 'step3':
        this.activeStep = 'Step3';
        routePath = '/cost-details';
        break;
      default:
        return; 
    }
  
    this.router.navigate([routePath]);
  }  

}
