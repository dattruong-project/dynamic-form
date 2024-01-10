export const SUBMIT_FIELD_TYPE = 'submit';

interface DeFaultRulesNames {
  [key: string]: string;
}

export const DEFAULT_RULES_NAMES: DeFaultRulesNames = {
  minLength: "minLength",
  maxLength: "minLength",
  required: "required",
  pattern: "pattern"
};