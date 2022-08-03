import { IsString, Matches } from 'class-validator';

export type TDevice = {
  type:
    | 'Notebook'
    | 'Desktop'
    | 'Netbook'
    | 'Screen'
    | 'Printer'
    | 'Scanner';
  condition: 'working' | 'broken' | 'notWorking';
};

export class Device {
  @IsString()
  @Matches(/^(Notebook|Desktop|Netbook|Screen|Printer|Scanner)$/i)
  private type: string;

  @Matches(/^(working|broken|notWorking)$/i)
  private condition: string;

  constructor(type: string, condition: string) {
    this.type = type;
    this.condition = condition;
  }

  public getType(): string {
    return this.type;
  }

  public getCondition(): string {
    return this.condition;
  }
}
