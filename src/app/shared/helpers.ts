import { LineOfService } from "./interfaces";
import * as moment from "moment";

export const getEndpoint = (api: string, serviceId?: any): string => {
  if (serviceId) {
    return `https://gmsch.dev.fs.liveperson.com/${api}/${serviceId}`;
  } else {
    return api;
  }
};

export const generateHeaders = (verb: string) => {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  };
};

export const timesTo_hhmmss = (service: LineOfService): LineOfService => {
  const editedStandard = service.standard_days.map(s => {
    s.startTime = s.startTime
      ? moment(s.startTime, "HH:mm:ss").format("HH:mm")
      : s.startTime;
    s.endTime = s.endTime
      ? moment(s.endTime, "HH:mm:ss").format("HH:mm")
      : s.endTime;
    return s;
  });
  const editedModified = service.modified_days.map(m => {
    m.startTime = m.startTime
      ? moment(m.startTime, "HH:mm:ss").format("HH:mm")
      : m.startTime;
    m.endTime = m.startTime
      ? moment(m.endTime, "HH:mm:ss").format("HH:mm")
      : m.startTime;
    return m;
  });
  service.standard_days = editedStandard;
  service.modified_days = editedModified;
  return service;
};

export const customValidatorsForStandard = (
  startTime: string,
  endTime: string,
  formErrors: any,
  field: string
) => {
  if (startTime && endTime) {
    if (field == "startTime" && startTime > endTime) {
      formErrors["startTime"] = "Start time must start before end time.";
    }
  }
  if (field == "endTime" && startTime && !endTime) {
    formErrors["endTime"] = "Start time must be paired with End time. ";
  }
  if (field == "startTime" && endTime && !startTime) {
    formErrors["startTime"] = "End time must be paired with Start time. ";
  }
  return formErrors;
};

export const customValidatorsForModified = (
  startTime: string,
  endTime: string,
  allDay: boolean,
  formErrors: any,
  field: string
) => {
  if (startTime && endTime) {
    if (field == "endTime" && startTime > endTime) {
      // console.log(startTime, endTime)
      formErrors["endTime"] = "Start time must start before end time.";
    }
  }

  if (field == "endTime" && startTime && !endTime) {
    // console.log("hit y start and n end")
    formErrors["endTime"] = "Start time must be paired with End time. ";
    // console.log(formErrors)
  }
  if (field == "startTime" && endTime && !startTime) {
    // console.log("hit n start and y end")
    formErrors["startTime"] = "End time must be paired with Start time. ";
  }
  if (field == "allDay" && allDay && (startTime || endTime)) {
    // console.log("hit y start or end AND allday")
    formErrors["allDay"] = "Start and/or End time will be nullified. ";
  }
  if (field == "allDay" && !allDay && !(startTime && endTime)) {
    formErrors["allDay"] =
      "If service is not closed all day, start and end times are required.";
  }
  return formErrors;
};
