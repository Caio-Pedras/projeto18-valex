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
import { findByCardDetails, findById } from "../repositories/cardRepository.js";
import { findByCardId, insert, } from "../repositories/paymentRepository.js";
import { checkPasswordIsCorrect, validateExpirationDate, } from "./cardService.js";
import * as businessRepository from "../repositories/businessRepository.js";
import { getRecharges } from "./rechargeService.js";
export function listTransactions(cardId) {
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
                    return [4 /*yield*/, findByCardId(cardId)];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
export function handleCardBalance(payments, recharges) {
    return __awaiter(this, void 0, void 0, function () {
        var totalPaymentArray, totalRechargeArray, totalPayment, totalRecharge;
        return __generator(this, function (_a) {
            totalPaymentArray = payments.map(function (payment) {
                return payment.amount;
            });
            totalRechargeArray = recharges.map(function (recharge) {
                return recharge.amount;
            });
            totalPayment = sumArray(totalPaymentArray);
            totalRecharge = sumArray(totalRechargeArray);
            return [2 /*return*/, totalRecharge - totalPayment];
        });
    });
}
function sumArray(array) {
    return array.reduce(function (previousValue, currentValue) { return previousValue + currentValue; }, 0);
}
export function validatePayment(cardId, password, businessId, amount) {
    return __awaiter(this, void 0, void 0, function () {
        var card, business, transactions, recharges, balance, paymentData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, findById(cardId)];
                case 1:
                    card = _a.sent();
                    if (!card) {
                        throw { type: "NotFound", message: "Card not found" };
                    }
                    if (!card.password) {
                        throw { type: "BadRequest", message: "Card must be active" };
                    }
                    validateExpirationDate(card.expirationDate);
                    if (card.isBlocked) {
                        throw { type: "BadRequest", message: "Card blocked" };
                    }
                    checkPasswordIsCorrect(card.password, password);
                    return [4 /*yield*/, businessRepository.findById(businessId)];
                case 2:
                    business = _a.sent();
                    if (!business) {
                        throw { type: "NotFound", message: "Business not found" };
                    }
                    if (card.type !== business.type) {
                        throw {
                            type: "BadRequest",
                            message: "Card type and business type must be the same"
                        };
                    }
                    return [4 /*yield*/, listTransactions(cardId)];
                case 3:
                    transactions = _a.sent();
                    return [4 /*yield*/, getRecharges(cardId)];
                case 4:
                    recharges = _a.sent();
                    return [4 /*yield*/, handleCardBalance(transactions, recharges)];
                case 5:
                    balance = _a.sent();
                    if (amount > balance) {
                        throw { type: "BadRequest", message: "Not enough balance" };
                    }
                    paymentData = {
                        cardId: cardId,
                        businessId: businessId,
                        amount: amount
                    };
                    return [4 /*yield*/, insert(paymentData)];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function validateOnlinePayment(number, cardHolderName, expirationDate, cvc, businessId, amount) {
    return __awaiter(this, void 0, void 0, function () {
        var card, business, transactions, recharges, balance, paymentData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, findByCardDetails(number, cardHolderName, expirationDate)];
                case 1:
                    card = _a.sent();
                    if (!card) {
                        throw { type: "NotFound", message: "Card not found" };
                    }
                    validateExpirationDate(card.expirationDate);
                    if (card.isBlocked) {
                        throw { type: "BadRequest", message: "Card blocked" };
                    }
                    return [4 /*yield*/, businessRepository.findById(businessId)];
                case 2:
                    business = _a.sent();
                    if (!business) {
                        throw { type: "NotFound", message: "Business not found" };
                    }
                    if (card.type !== business.type) {
                        throw {
                            type: "BadRequest",
                            message: "Card type and business type must be the same"
                        };
                    }
                    return [4 /*yield*/, listTransactions(card.id)];
                case 3:
                    transactions = _a.sent();
                    return [4 /*yield*/, getRecharges(card.id)];
                case 4:
                    recharges = _a.sent();
                    return [4 /*yield*/, handleCardBalance(transactions, recharges)];
                case 5:
                    balance = _a.sent();
                    if (amount > balance) {
                        throw { type: "BadRequest", message: "Not enough balance" };
                    }
                    paymentData = {
                        cardId: card.id,
                        businessId: businessId,
                        amount: amount
                    };
                    return [4 /*yield*/, insert(paymentData)];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
