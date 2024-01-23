import * as React from 'react';
import { FieldNamesMarkedBoolean, FieldValues, UseFormReturn, UseFormWatch } from '../form-controller/types';
import { FormFieldProps } from './components';

export type DirtyFields = FieldNamesMarkedBoolean<FieldValues>;

export interface FormMeta {
  [key: string]: unknown;
}

export enum ValidateRule {
  required = "required",
  min = "minLength",
  max = "maxLength",
  pattern = "pattern"
};

export interface Validation {
  key: string;
  type?: ValidateRule;
  message: string;
  value?: unknown;
  watch?: UseFormWatch<FieldValues>
  meta?: unknown
}

export interface Validations {
  [key: string]: Validation;
}

export interface DependsOnObject {
  fieldId: string;
  key: string;
  value?: string | number | null | string[] | number[];
  validate?: boolean;
}

export interface Option {
  label: string;
  value: any;
  disabled?: boolean;
}

export type Grid = {
  xs? : number;
  sm? : number;
  md? : number;
  lg? : number;
  xl? : number;
  xxl? : number;
  flex?: number;
  offset?: number;
  span?: number
}

export interface FormField {
  id: string;
  type: DictionaryComponentType | string;
  data?: any;
  meta?: FormMeta | undefined;
  disabledField?: boolean;
  dependsOn?: Array<string | DependsOnObject>;
  validation?: Validations | undefined;
  componentDidMount?: (context?: UseFormReturn) => void;
  componentWillUnMount?: (context?: UseFormReturn) => void;
  componentDidUpdate?: (context?: UseFormReturn) => void;
}

export interface FormFields {
  [key: string]: FormField;
}

// export type ColsGroup = {
//   id: string;
//   cols: ColDefinition[];
// };

// export type ColDefinition = {
//   id: string;
//   grid?: Grid;
//   order?: number; 
// }

// export type GridDefinition = {
//   rows?: {
//     id: string
//     colsGroup: ColsGroup,
//     gutter?: number
//   }[],
//   gridsByOrder?: string[]; 
// }

export interface FormSession {
  id: string;
  fieldsById: string[];
  submit: {
    label: string;
  };
  meta?: FormMeta,
  hiddenButton?: boolean,
  // gridDefinition?: GridDefinition
}

export interface FormSessions {
  [key: string]: FormSession;
}

export interface FormSchema {
  fields: FormFields;
  sessions: FormSessions;
  sessionsById: string[];
}

export interface ExtraValidation {
  [key: string]: (value?: any) => (input?: any, watch?: UseFormWatch<FieldValues>) => boolean | string | undefined | Promise<boolean | string | undefined>;
}

export enum DictionaryComponentType {
  Input = "input",
  Checkbox = "checkbox",
  Select = "select",
  Radio = "radio",
  Errors = "errors",
  Submit = "submit",
  AutoComplete = "autoComplete",
  DateTimePicker = "dateTimePicker",
  RangeDateTimePicker = "rangeDateTimePicker",
  ListView = "listView",
  Card = "card",
  Row = "row",
  Col = "col"
}

export type Dictionary = {
  [key in DictionaryComponentType | string]: React.ComponentType<any>;
};

export enum Picker {
  Date = "date",
  Time = "time"
}
