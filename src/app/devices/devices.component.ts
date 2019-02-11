import {Component, OnInit} from '@angular/core';
import {Device} from "./Device";
import {DevicesService} from "./devices.service";
import {UnifiedTableComponent} from "../unified-table/unified-table.component";
import {ColumnDefinition} from "../unified-table/ColumnDefenition";
import * as Collections from "typescript-collections";
import {DataObjectClass} from "../dataobject/DataObjectClass";

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
    new ColumnDefinition("Location", "Location", (device: Device) => device.location),
    new ColumnDefinition("updateTimestamp", "LastUpdated", (device: Device) => device.updateTimestamp)
  ];

  private dataSource:  Collections.Set<DataObjectClass>;
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

  private assignDataToDataSource(devicesArray: Device[]) {
    this.dataSource = new Collections.Set<DataObjectClass>();
    this.putDataIntoCollection(devicesArray, this.dataSource);
  }

  private putDataIntoCollection(devicesArray: Device[], dataCollection: Collections.Set<DataObjectClass>) {
    if (devicesArray != null && devicesArray.length > 0) {
      devicesArray.forEach(device => {
        let deviceWithType = Object.assign(new Device(), device);
        return dataCollection.add(deviceWithType);
      });
    }
  }
}
