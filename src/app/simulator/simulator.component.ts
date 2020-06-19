import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SimulatorService} from './simulator.service';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {TranslationService} from '../translation.service';


@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  providers: [SimulatorService, TranslationService],
  styleUrls: ['./simulator.component.css']
})
export class SimulatorComponent implements OnInit, OnChanges {

  solverSimulatorActive: boolean;
  deviceSimulatorActive: boolean;
  solverSimulatorDescription: string;
  deviceSimulatorDescription: string;

  constructor(private simulatorService: SimulatorService, private translationService: TranslationService) {
  }

  async ngOnInit() {
    this.isSolverSimulatorActive();
    this.isDeviceSimulatorActive();
    await this.translationService.loadTranslations();
    this.solverSimulatorDescription = this.translationService.getTranslation('simulators.description.solver');
    this.deviceSimulatorDescription = this.translationService.getTranslation('simulators.description.device');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isSolverSimulatorActive();
    this.isDeviceSimulatorActive();
  }

  switchSolverSimulator($event: MatSlideToggleChange) {
    if ($event.checked) {
      this.startSolverSimulator();
    } else {
      this.stopSolverSimulator();
    }
  }

  switchDeviceSimulator($event: MatSlideToggleChange) {
    if ($event.checked) {
      this.startDeviceSimulator();
    } else {
      this.stopDeviceSimulator();
    }
  }

  startSolverSimulator() {
    this.simulatorService.startSolverSimulator().subscribe(value => this.solverSimulatorActive = value);
  }

  stopSolverSimulator() {
    this.simulatorService.stopSolverSimulator().subscribe(value => this.solverSimulatorActive = value);
  }

  isSolverSimulatorActive() {
    this.getSolverSimulatorActive().then(value => {
      return this.solverSimulatorActive = value;
    });
  }

  async getSolverSimulatorActive(): Promise<any> {
    return await this.simulatorService.isSolverSimulatorActive();
  }

  startDeviceSimulator() {
    this.simulatorService.startDeviceSimulator().subscribe(value => this.deviceSimulatorActive = value);
  }

  stopDeviceSimulator() {
    this.simulatorService.stopDeviceSimulator().subscribe(value => this.deviceSimulatorActive = value);
  }

  isDeviceSimulatorActive() {
    this.getDeviceSimulatorActive().then(value => {
      return this.deviceSimulatorActive = value;
    });
  }

  async getDeviceSimulatorActive(): Promise<any> {
    return await this.simulatorService.isDeviceSimulatorActive();
  }
}
