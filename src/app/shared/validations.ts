import { AbstractControl } from "@angular/forms";

export const createLosValidationMsgs = {
  name: {
    required: "Line of Service name is required"
  },
  location: {
    required: "Location is required"
  },
  phone: {
    required: "Tel. number is required.",
    minlength: "Phone number is too short.",
    invalidNumber: "Phone number is invalid - can only contain numbers."
  }
};

export const createHolidayValidationMsgs = {
  name: {
    required: "Line of Service name is required"
  },
  date: {
    required: "Date is required."
  },
  startTime: {
    invalidTime: "Time must be set at a 5 minute increment."
  },
  endTime: {
    invalidTime: "Time must be set at a 5 minute increment."
  }
};

export const updateWeekdayValidationMsgs = {
    startTime: {
      invalidTime: "Time must be set at a 5 minute increment."
    },
    endTime: {
      invalidTime: "Time must be set at a 5 minute increment."
    }
  };

export const updateHolidayValidationMsgs = {
  date: {
    required: "Date is required."
  },
  startTime: {
    invalidTime: "Time must be set at a 5 minute increment."
  },
  endTime: {
    invalidTime: "Time must be set at a 5 minute increment."
  }
};

export function phoneNumberValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  const valid = control.value ? /^([\d]{6}|((\([\d]{3}\)|[\d]{3})( [\d]{3} |-[\d]{3}-)))[\d]{4}$/.test(
    control.value
  ) : true;
  return valid
    ? null
    : { invalidNumber: { valid: false, value: control.value } };
}

export function timeValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  const valid = control.value ? Number(control.value.substring(3, 5)) % 5 === 0 : true;
  return valid ? null : { invalidTime: { valid: false, value: control.value } };
}
