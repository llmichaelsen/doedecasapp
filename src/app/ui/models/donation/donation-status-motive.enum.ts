export enum DonationCompletionMotive {
  SuccessInTime = "Com sucesso, no horário agendado.",
  SuccessOutOfTime = "Com sucesso, fora do horário agendado.",
  UnSuccessfully = "Sem sucesso",
}

export function donationCompletionMotiveSelect(): Array<any> {
  return Object.keys(DonationCompletionMotive).map((key) => {
    return { id: key, description: DonationCompletionMotive[key] };
  });
}
