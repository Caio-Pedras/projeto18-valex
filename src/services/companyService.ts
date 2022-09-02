import { findByApiKey } from "../repositories/companyRepository.js";
export async function APIKeyIsValid(APIKey: string) {
  const company = await findByApiKey(APIKey);
  if (!company) {
    throw { type: "unauthorized", message: "Unauthorized API Key" };
  }
}
