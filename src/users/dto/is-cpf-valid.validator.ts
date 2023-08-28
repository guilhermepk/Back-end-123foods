import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isCpfValid', async: false })
export class IsCpfValidConstraint implements ValidatorConstraintInterface {
  validate(cpf: string, args: ValidationArguments) {
    if (!cpf) {
      return false;
    }

    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11) {
      return false;
    }

    if (/^(\d)\1{10}$/.test(cpf)) {
      return false;
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let firstDigit = 11 - (sum % 11);
    if (firstDigit >= 10) {
      firstDigit = 0;
    }

    if (parseInt(cpf.charAt(9)) !== firstDigit) {
      return false;
    }

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let secondDigit = 11 - (sum % 11);
    if (secondDigit >= 10) {
      secondDigit = 0;
    }

    if (parseInt(cpf.charAt(10)) !== secondDigit) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'CPF inválido';
  }
}
