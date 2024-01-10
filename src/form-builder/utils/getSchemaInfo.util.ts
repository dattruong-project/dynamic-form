import { SUBMIT_FIELD_TYPE } from "../constants";
import { FormFields, FormSchema } from "../types";

const EMPTY_ARRAY = [] as const;
const EMPTY_OBJECT = {} as const;

export const sanitizeFieldsById = (fieldsById: string[], fields: FormFields, typesAllowed: string[]): string[] =>
  fieldsById.filter((fieldId) => {
    const type = fields?.[fieldId]?.type;
    return typesAllowed.includes(type) && type !== SUBMIT_FIELD_TYPE;
  });

  export interface SchemaInfo {
    fields: FormFields;
    fieldsById: string[];
    submitLabel: string;
    sessionsById: string[];
    hiddenButton: boolean;
    gutter: number;
  }
  
  export const getSchemaInfo = (schema: FormSchema, typesAllowed: string[], currentSessionIndex: number): SchemaInfo => {
    const sessions = schema?.sessions;
    const sessionsById = schema?.sessionsById || EMPTY_ARRAY;
    const sessionId = sessionsById?.[currentSessionIndex];
    const fieldsById = sessions?.[sessionId]?.fieldsById || EMPTY_ARRAY;
    const submitLabel = sessions?.[sessionId]?.submit?.label;
    const hiddenButton = sessions?.[sessionId]?.hiddenButton || false;
    const gutter = sessions?.[sessionId]?.gutter || 0;
    const fields = schema?.fields || EMPTY_OBJECT;
    
    return {
      fields,
      fieldsById: sanitizeFieldsById(fieldsById, fields, typesAllowed),
      submitLabel,
      sessionsById,
      hiddenButton,
      gutter
    };
  };