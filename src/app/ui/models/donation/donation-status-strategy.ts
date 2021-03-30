import { DonationStatus } from "./donation-status.enum";

export interface IDonationStatusStrategy {
  getInstitutionColumn(): string;
}

export class DonationStatusStrategyFactory {
  createStrategy(status: DonationStatus): IDonationStatusStrategy {
    switch (status) {
      case DonationStatus.Canceled:
        return new DonationStatusCanceledStrategy();
      case DonationStatus.Initiated:
        return new DonationStatusInitiatedStrategy();
      case DonationStatus.Scheduled:
        return new DonationStatusScheduledStrategy();
      case DonationStatus.Completed:
        return new DonationStatusCompletedStrategy();
      default:
        return new DonationStatusInitiatedStrategy();
    }
  }
}

export class DonationStatusCanceledStrategy {
  getInstitutionColumn(): string {
    return "";
  }
}

export class DonationStatusInitiatedStrategy {
  getInstitutionColumn(): string {
    return "";
  }
}

export class DonationStatusScheduledStrategy {
  getInstitutionColumn(): string {
    return "";
  }
}

export class DonationStatusCompletedStrategy {
  getInstitutionColumn(): string {
    return "";
  }
}
