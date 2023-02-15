interface IDateProvider {
  compareInHours(startDate: Date, endDate: Date): number;
  convertToUtc(date: Date): string;
  datenow(): Date;
}

export { IDateProvider };
