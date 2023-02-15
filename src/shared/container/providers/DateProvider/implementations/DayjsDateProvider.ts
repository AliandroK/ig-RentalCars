import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  datenow(): Date {
    return dayjs().toDate();
  }

  convertToUtc(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  compareInHours(startDate: Date, endDate: Date): number {
    const end_date_utc = this.convertToUtc(endDate);
    const start_date_utc = this.convertToUtc(startDate);

    return dayjs(end_date_utc).diff(start_date_utc, "hour");
  }
}

export { DayjsDateProvider };
