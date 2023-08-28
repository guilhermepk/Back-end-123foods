import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isAgeValid', async: false })
export class IsAgeValidConstraint implements ValidatorConstraintInterface {
  validate(date: Date, args: ValidationArguments) {
    const currentDate = new Date();
    const birthdate = new Date(date);
    const minAge = 18;

    const diffInMilliseconds = currentDate.getTime() - birthdate.getTime();
    const years = diffInMilliseconds / (1000 * 60 * 60 * 24 * 365);

    return years >= minAge;
  }

  defaultMessage(args: ValidationArguments) {
    return 'A idade deve ser maior ou igual a 18 anos';
  }
}
