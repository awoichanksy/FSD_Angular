import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material";
import {Device} from "./Device";
import {DevicesService} from "./devices.service";
import {UnifiedTableComponent} from "../unified-table/unified-table.component";
import {ColumnDefinition} from "../unified-table/ColumnDefenition";

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  providers: [DevicesService, UnifiedTableComponent],
  styleUrls: ['./devices.component.css']
})


export class DevicesComponent implements OnInit {

  columns = [
    new ColumnDefinition("name", "Name", (device: Device) => device.name),
    new ColumnDefinition("description", "Description", (device: Device) => device.description),
    new ColumnDefinition("Location", "Location", (device: Device) => device.location)
  ];

  private dataSource: MatTableDataSource<Device>;
  optionSizes: number[] = [2, 5, 10, 15, 20];

  constructor(private deviceService: DevicesService) {
  }

  ngOnInit() {
    this.getDevice();
  }


  getDevice(): void {
    this.deviceService.getDevices()
      .subscribe(devicesArray => this.assignDataToDataSource(devicesArray));
  }

  private assignDataToDataSource(devicesArray) {
    this.dataSource = new MatTableDataSource<Device>(devicesArray);
  }
}
