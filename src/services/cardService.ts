import {
  findById,
  findByTypeAndEmployeeId,
  insert,
  TransactionTypes,
  update,
} from "../repositories/cardRepository.js";
import { APIKeyIsValid } from "./companyService.js";
import { getEmployeeById } from "./employeeService.js";
import { faker } from "@faker-js/faker";
import Cryptr from "cryptr";
import bcrypt from "bcrypt";
import dayjs from "dayjs";
import dotenv from "dotenv";

dotenv.config();

const key = process.env.CRYPT_KEY as string;
const cryptr = new Cryptr(key);

export async function createCard(
  APIKey: string,
  employeeId: number,
  type: TransactionTypes
) {
  await APIKeyIsValid(APIKey);
  const employee = await getEmployeeById(employeeId);
  const sameTypeCard = await findByTypeAndEmployeeId(type, employeeId);
  if (sameTypeCard) {
    throw {
      type: "unauthorized",
      message: "A card with this type already exists for this employee",
    };
  }
  const cardData = generateCard(employee.fullName);
  await insert({
    ...cardData,
    employeeId,
    isVirtual: false,
    isBlocked: false,
    type,
  });
  return;
}

function generateCard(employeeName: string) {
  return {
    number: faker.finance.creditCardNumber("mastercard"),
    cardholderName: handleCardHolderName(employeeName),
    securityCode: handleSecurityCode(),
    expirationDate: handleExpirationDate(),
  };
}
function handleCardHolderName(name: string) {
  const [firtsName, ...otherNames] = name.split("");
  const lastName = otherNames.pop();
  const middleNames = otherNames.filter((middlename) => middlename.length >= 3);
  const middleInitials = middleNames.map((middlename) => {
    return middlename[0];
  });

  if (middleInitials.length > 0) {
    return [firtsName, middleInitials, lastName].join("").toUpperCase();
  } else {
    return [firtsName, lastName].join("").toUpperCase();
  }
}
function handleSecurityCode() {
  const securityCode = faker.finance.creditCardCVV();

  return cryptr.encrypt(securityCode);
}
function handleExpirationDate() {
  const YEARS: number = 5;
  const FORMAT: string = "MM/YY";
  const date = dayjs().add(YEARS, "year").format(FORMAT);
  return date;
}

//ativar cartão
export async function activateCard(
  cardId: number,
  cvc: string,
  password: string
) {
  const card = await findById(cardId);
  if (!card) {
    throw { type: "NotFound", message: "Card not found" };
  }
  const isCardActive = card.password;
  if (isCardActive) {
    throw { type: "BadRequest", message: "Card already active" };
  }
  validateExpirationDate(card.expirationDate);
  validateSecurityCode(card.securityCode, cvc);
  validatePassword(password);
  const SECRET = 10;
  const hashedPassword = bcrypt.hashSync(password, SECRET);
  await update(cardId, { password: hashedPassword });
  return;
}

function validateExpirationDate(date: string) {
  const FORMAT: string = "MM/YY";
  const today = dayjs().format(FORMAT);
  if (dayjs(today).isAfter(dayjs(date))) {
    throw { type: "BadRequest", message: "Invalid expire date" };
  }
}
function validateSecurityCode(encryptedCVC: string, securityCode: string) {
  const decrypted = cryptr.decrypt(encryptedCVC);
  if (decrypted !== securityCode) {
    throw { type: "BadRequest", message: "Invalid security code" };
  }
}
function validatePassword(password: string) {
  const PASSWORD_FORMAT = /^[0-9]{4}$/;
  if (!PASSWORD_FORMAT.test(password)) {
    throw { type: "BadRequest", message: "Invalid password" };
  }
}

//transactions
