export const standard_days = [
    {
      columnDef: "name",
      header: "Name",
      cell: (element: any) => `${element.name}`
    },
    {
      columnDef: "startTime",
      header: "Open",
      cell: (element: any) => `${element.startTime && !element.allDay ? element.startTime : 'None'}`
    },
    {
      columnDef: "endTime",
      header: "Close",
      cell: (element: any) => `${element.endTime && !element.allDay ? element.endTime : 'None'}`
    }
  ];

export const modified_days = [
    ...standard_days,
    {
      columnDef: "date",
      header: "Date",
      cell: (element: any) => `${element.date || 'None'}`
    },
    {
      columnDef: "allDay",
      header: "Closed All Day?",
      cell: (element: any) => `${element.allDay ? 'Yes' : 'No'}`
    }
  ];