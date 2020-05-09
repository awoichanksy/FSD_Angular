import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SimulatorService} from './simulator.service';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  providers: [SimulatorService],
  styleUrls: ['./simulator.component.css']
})
export class SimulatorComponent implements OnInit, OnChanges {

  solverSimulatorActive: boolean;
  deviceSimulatorActive: boolean;

  constructor(private simulatorService: SimulatorService) {
  }

  ngOnInit() {
    this.isSolverSimulatorActive();
    this.isDeviceSimulatorActive();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isSolverSimulatorActive();
    this.isDeviceSimulatorActive();
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
