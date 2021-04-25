export class Masks {
  private static onlyAlphanumeric(value: string): string {
    if (!value) return "";

    return value.replace(/[^a-z0-9]/gi, "");
  }

  private static onlyLetters(value: string): string {
    if (!value) return "";

    return value.replace(/[^a-zÀ-ú ]/gi, "");
  }

  static onlyNumbers(value: string): string {
    if (!value) return "";

    return value.replace(/[^0-9 ]/gi, "");
  }

  private static maxLength(value: string, max: number): string {
    if (!value) return "";

    return value.substring(0, max);
  }

  static socialNumberMask(value: string): string {
    if (!value) return "";

    value = value.replace(/\D/g, "");
    value = this.maxLength(value, 11);
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return value;
  }

  static cpnjMask(value: string): string {
    if (!value) return "";

    value = value.replace(/\D/g, "");
    value = this.maxLength(value, 14);
    value = value.replace(/(\d{2})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1/$2");
    value = value.replace(/(\d{4})(\d{1,2})$/, "$1-$2");
    return value;
  }

  static crmMask(value: string): string {
    if (!value) return "";

    value = this.onlyAlphanumeric(value);
    value = this.maxLength(value, 15);
    return value;
  }

  static cellphoneMask(value: string): string {
    if (!value) return "";

    value = value.replace(/\D/g, "");
    value = this.maxLength(value, 11);
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d{5})(\d)/, "$1-$2");
    return value;
  }

  static nameMask(value: string): string {
    if (!value) return "";

    value = this.onlyLetters(value);
    value = this.maxLength(value, 100);
    return value;
  }

  static emailMask(value: string): string {
    if (!value) return "";

    value = this.maxLength(value, 50);
    return value;
  }

  static codeMask(value: string): string {
    if (!value) return "";

    value = this.maxLength(value, 6);
    value = this.onlyNumbers(value);
    return value;
  }

  static dateMask(value: string): string {
    if (!value) return "";

    value = value.replace(/\D/g, "");
    value = this.maxLength(value, 8);
    value = value.replace(/(\d{2})(\d)/, "$1/$2");
    value = value.replace(/(\d{2})(\d)/, "$1/$2");
    value = value.replace(/(\d{4})/, "$1");
    return value;
  }

  static timeMask(value: string): string {
    if (!value) return "";

    value = value.replace(/\D/g, "");
    value = this.maxLength(value, 4);
    value = value.replace(/(\d{2})(\d)/, "$1:$2");
    return value;
  }
}
