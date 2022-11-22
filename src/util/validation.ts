const emailTester =
  /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
export function isValidEmail(email: string): boolean {
  if (!email) {
    return false;
  }

  const emailParts = email.split('@');
  if (emailParts.length !== 2) {
    return false;
  }

  const account = emailParts[0];
  const address = emailParts[1];
  if (account.length > 64) {
    return false;
  } else if (address.length > 255) {
    return false;
  }

  const domainParts = address.split('.');
  if (
    domainParts.some(part => {
      return part.length > 63;
    })
  ) {
    return false;
  }

  if (!emailTester.test(email)) {
    return false;
  }

  return true;
}

const specialChars = /[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/;
const numbers = /\d/;
export function isValidPassword(password: string): boolean {
  if (!password) {
    return false;
  }

  // Contiene caracteres especiales
  // Numero
  // mas de 6 caracteres
  // 1 mayuscula
  // 1 minuscula
  return (
    specialChars.test(password) &&
    numbers.test(password) &&
    password.length > 6 &&
    password.toLowerCase() !== password &&
    password.toUpperCase() !== password
  );
}

export const notEmpty = (value: string): boolean => {
  return !!value && value.length > 0;
};

export const atLeastOneSelected = (
  value: { key: string; value: string } | undefined,
): boolean => {
  const numberKey = Number(value?.key);
  return !!value && !isNaN(numberKey) && numberKey > 0;
};

export const equalsTo = (otherValue: string) => (currentValue: string) => {
  return otherValue === currentValue;
};
