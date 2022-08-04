export interface DeviceDto {
  type:
    | 'Notebook'
    | 'Desktop'
    | 'Netbook'
    | 'Screen'
    | 'Printer'
    | 'Scanner';
  condition: 'working' | 'broken' | 'notWorking';
}
