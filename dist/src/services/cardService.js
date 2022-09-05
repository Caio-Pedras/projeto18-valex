var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { findById, findByTypeAndEmployeeId, insert, update, } from "../repositories/cardRepository.js";
import { APIKeyIsValid } from "./companyService.js";
import { getEmployeeById } from "./employeeService.js";
import { faker } from "@faker-js/faker";
import Cryptr from "cryptr";
import bcrypt from "bcrypt";
import dayjs from "dayjs";
import dotenv from "dotenv";
dotenv.config();
var key = process.env.CRYPT_KEY;
var cryptr = new Cryptr(key);
export function createCard(APIKey, employeeId, type) {
    return __awaiter(this, void 0, void 0, function () {
        var employee, sameTypeCard, CVC, cardData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, APIKeyIsValid(APIKey)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, getEmployeeById(employeeId)];
                case 2:
                    employee = _a.sent();
                    return [4 /*yield*/, findByTypeAndEmployeeId(type, employeeId)];
                case 3:
                    sameTypeCard = _a.sent();
                    if (sameTypeCard) {
                        throw {
                            type: "unauthorized",
                            message: "A card with this type already exists for this employee"
                        };
                    }
                    CVC = handleSecurityCode();
                    cardData = generateCard(employee.fullName, CVC.encryptedCVC);
                    return [4 /*yield*/, insert(__assign(__assign({}, cardData), { employeeId: employeeId, isVirtual: false, isBlocked: false, type: type }))];
                case 4:
                    _a.sent();
                    return [2 /*return*/, __assign(__assign({}, cardData), { securityCode: CVC.CVC, type: type, employeeId: employeeId, isVirtual: false, isBlocked: false })];
            }
        });
    });
}
function generateCard(employeeName, encryptedCVC) {
    return {
        number: faker.finance.creditCardNumber("mastercard"),
        cardholderName: handleCardHolderName(employeeName),
        securityCode: encryptedCVC,
        expirationDate: handleExpirationDate()
    };
}
function handleCardHolderName(name) {
    var _a = name.split(" "), firtsName = _a[0], otherNames = _a.slice(1);
    var lastName = otherNames.pop();
    var middleNames = otherNames.filter(function (middlename) { return middlename.length >= 3; });
    var middleInitials = middleNames.map(function (middlename) {
        return middlename[0];
    });
    if (middleInitials.length > 0) {
        return [firtsName, middleInitials, lastName].join(" ").toUpperCase();
    }
    else {
        return [firtsName, lastName].join(" ").toUpperCase();
    }
}
function handleSecurityCode() {
    var securityCode = faker.finance.creditCardCVV();
    var CVC = {
        encryptedCVC: cryptr.encrypt(securityCode),
        CVC: securityCode
    };
    return CVC;
}
function handleExpirationDate() {
    var YEARS = 5;
    var FORMAT = "MM/YY";
    var date = dayjs().add(YEARS, "year").format(FORMAT);
    return date;
}
//ativar cartão
export function activateCard(cardId, cvc, password) {
    return __awaiter(this, void 0, void 0, function () {
        var card, isCardActive, SECRET, hashedPassword;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, findById(cardId)];
                case 1:
                    card = _a.sent();
                    if (!card) {
                        throw { type: "NotFound", message: "Card not found" };
                    }
                    isCardActive = card.password;
                    if (isCardActive) {
                        throw { type: "BadRequest", message: "Card already active" };
                    }
                    validateExpirationDate(card.expirationDate);
                    validateSecurityCode(card.securityCode, cvc);
                    validatePassword(password);
                    SECRET = 10;
                    hashedPassword = bcrypt.hashSync(password, SECRET);
                    return [4 /*yield*/, update(cardId, { password: hashedPassword })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function validateExpirationDate(date) {
    var FORMAT = "MM/YY";
    var today = dayjs().format(FORMAT);
    if (dayjs(today).isAfter(dayjs(date))) {
        throw { type: "BadRequest", message: "Invalid expiration date" };
    }
}
function validateSecurityCode(encryptedCVC, securityCode) {
    var decrypted = cryptr.decrypt(encryptedCVC);
    if (decrypted !== securityCode) {
        throw { type: "BadRequest", message: "Invalid security code" };
    }
}
function validatePassword(password) {
    var PASSWORD_FORMAT = /^[0-9]{4}$/;
    if (!PASSWORD_FORMAT.test(password)) {
        throw { type: "BadRequest", message: "Invalid password" };
    }
}
//bloquear cartão
export function toogleBlockCard(cardId, password, type) {
    return __awaiter(this, void 0, void 0, function () {
        var card;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, findById(cardId)];
                case 1:
                    card = _a.sent();
                    if (!card) {
                        throw { type: "NotFound", message: "Card not found" };
                    }
                    validateExpirationDate(card.expirationDate);
                    validateCardBlock(card.isBlocked, type);
                    checkPasswordIsCorrect(card.password, password);
                    return [4 /*yield*/, blockUnblock(cardId, type)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function validateCardBlock(isBlocked, type) {
    if (isBlocked === true && type === "block") {
        throw { type: "BadRequest", message: "Card already blocked" };
    }
    if (isBlocked === false && type === "unblock") {
        throw { type: "BadRequest", message: "Card already available" };
    }
}
export function checkPasswordIsCorrect(hashedPassword, password) {
    if (!bcrypt.compareSync(password, hashedPassword)) {
        throw { type: "unauthorized", message: "Wrong password" };
    }
}
function blockUnblock(cardId, type) {
    return __awaiter(this, void 0, void 0, function () {
        var boolean;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    boolean = "block" === type;
                    return [4 /*yield*/, update(cardId, { isBlocked: boolean })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
