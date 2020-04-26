import {Component, OnInit} from '@angular/core';
import {Device} from './Device';
import {DevicesService} from './devices.service';
import {UnifiedTableComponent} from '../unified-table/unified-table.component';
import {ColumnDefinition} from '../unified-table/ColumnDefenition';
import * as Collections from 'typescript-collections';
import {DataObjectClass} from '../dataobject/DataObjectClass';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DialogComponent} from '../dialog/dialog.component';
import {Observable} from 'rxjs';
import {ControlBase} from '../unified-form/databound-field';
import {DeviceFormFields} from './device.form-fields';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  providers: [DevicesService, UnifiedTableComponent],
  styleUrls: ['./devices.component.css']
})


export class DevicesComponent implements OnInit {

  constructor(private deviceService: DevicesService, private dialog: MatDialog) {
  }

  columns = [
    new ColumnDefinition('name', 'Name', (device: Device) => device.name),
    new ColumnDefinition('description', 'Description', (device: Device) => device.description),
    new ColumnDefinition('Location', 'Location', (device: Device) => device.location),
    new ColumnDefinition('updateTimestamp', 'LastUpdated', (device: Device) => device.updateTimestamp),
  ];

  private dataSource: Collections.Set<DataObjectClass>;
  optionSizes: number[] = [2, 5, 10, 15, 20];
  private newOrUpdatedObjects: Collections.Set<Device>;

  private static putSingleObjectIntoCollection(device, dataCollection: Collections.Set<Device>) {
    if (device != null) {
      const deviceWithType = Object.assign(new Device(), device);
      dataCollection.add(deviceWithType);
    }
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
        const deviceWithType = Object.assign(new Device(), device);
        return dataCollection.add(deviceWithType);
      });
    }
  }

  addNewDevice() {
    this.openAddNewDeviceDialog();
  }


  openAddNewDeviceDialog() {
    const fields: ControlBase<any>[] = DeviceFormFields.getDeviceFormFields();


    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      dialogTitle: 'Add new Device',
      fields: fields
    };


    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      device => {
        if (device != null) {
          const deviceWithType = Object.assign(new Device(), device);
          const result: Observable<Device[]> = this.deviceService.addNewDevice(deviceWithType);
          result.subscribe(device => {
            this.newOrUpdatedObjects = new Collections.Set<Device>();
            DevicesComponent.putSingleObjectIntoCollection(device, this.newOrUpdatedObjects);
          });
        }
      }
    );
  }

}
