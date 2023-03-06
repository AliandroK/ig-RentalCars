interface IDateProvider {
  compareInHours(startDate: Date, endDate: Date): number;
  convertToUtc(date: Date): string;
  datenow(): Date;
  compareInDays(startDate: Date, endDate: Date): number;
}

export { IDateProvider };
