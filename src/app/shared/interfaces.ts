export interface LineOfService {
  id: any;
  name: string;
  description?: string;
  location?: string;
  phone?: string;
  standard_days?: StandardDay[];
  modified_days?: ModifiedDay[];
}

export interface StandardDay {
  id: any;
  name: string;
  order: number;
  startTime?: any;
  endTime?: any;
  lineOfServiceId: any;
}

export interface ModifiedDay {
  id: any;
  name: string;
  date: object;
  startTime: any;
  endTime: any;
  allDay: boolean;
  lineOfServiceId: any;
}
