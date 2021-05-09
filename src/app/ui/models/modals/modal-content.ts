import { MatDialogConfig } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { RoutePath } from "../route-path";

export const registerDonatorModal = (router: Router): MatDialogConfig<any> => {
  return {
    width: "500px",
    data: {
      type: "success",
      text:
        "Para acessar essa funcionalidade você precisa acessar como doador.",
      buttons: [
        {
          text: "Cadastre-se",
          callback: () => router.navigate([RoutePath.RegisterDonator]),
        },
        {
          text: "Já tenha cadastro",
          callback: () => router.navigate([RoutePath.Login]),
        },
      ],
    },
  };
};

export const registerInstitutionModal = (router: Router): MatDialogConfig<any> => {
    return {
      width: "500px",
      data: {
        type: "success",
        text:
          "Para acessar essa funcionalidade você precisa acessar como instituição.",
        buttons: [
          {
            text: "Cadastre-se",
            callback: () => router.navigate([RoutePath.RegisterInstitution]),
          },
          {
            text: "Já tenha cadastro",
            callback: () => router.navigate([RoutePath.Login]),
          },
        ],
      },
    };
  };
