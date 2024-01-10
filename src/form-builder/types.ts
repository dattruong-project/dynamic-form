import * as React from 'react';
import { FieldNamesMarkedBoolean, FieldValues, UseFormWatch } from '../form-controller/types';

export type DirtyFields = FieldNamesMarkedBoolean<FieldValues>;

export interface FormMeta {
  [key: string]: unknown;
}

export enum ValidationRule {
  required = "required",
  min = "minLength",
  max = "maxLength",
  pattern = "pattern"
};

export interface Validation {
  key: string;
  type?: ValidationRule;
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

type Grid = {
  xs? : number;
  sm? : number;
  md? : number;
  lg? : number;
  xl? : number;
  xxl? : number;
  flex?: number;
  offset?: number
}

export interface FormField {
  id: string;
  type: DictionaryComponentType | string;
  data?: any;
  meta?: FormMeta | undefined;
  disabledField?: boolean;
  dependsOn?: Array<string | DependsOnObject>;
  grid?: Grid;
  validation?: Validations | undefined
}

export interface FormFields {
  [key: string]: FormField;
}

export interface FormSession {
  id: string;
  fieldsById: string[];
  submit: {
    label: string;
  };
  meta?: FormMeta,
  hiddenButton?: boolean,
  gutter?: number;
}

export interface FormCell {
  fieldId: string;
  col: number;
  flex: number;
  row: number;
  rowspan:number
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
  RangeDateTimePicker = "rangeDateTimePicker"
}

export type Dictionary = {
  [key in DictionaryComponentType | string]: React.ComponentType<any>;
};

export enum Picker {
  Date = "date",
  Time = "time"
}
