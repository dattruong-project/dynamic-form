import * as React from 'react';

import { SUBMIT_FIELD_TYPE } from '../constants';
import { FormField } from './formField.component';
import { Dictionary } from '../types';
import { UseFormGetValues, FieldValues } from '../../form-controller';

export interface SubmitFieldProps {
  formId: string;
  dictionary: Dictionary;
  submitDisabled: boolean;
  nextDisabled: boolean;
  getValues: UseFormGetValues<FieldValues>;
  isLastSession: boolean;
  submitLabel: string;
  onNextSession: (value: any) => void;
}

export function SubmitField({
  formId,
  dictionary,
  submitDisabled,
  nextDisabled,
  getValues,
  isLastSession,
  submitLabel,
  onNextSession,
}: SubmitFieldProps) {
  const handleNextSession = React.useCallback(
    (event: { preventDefault: () => void; }) => {
      event.preventDefault();
      onNextSession(getValues());
    },
    [onNextSession, getValues],
  );

  return (
    <div>
      {isLastSession ? (
        <FormField
          id="submit-field"
          fieldType={SUBMIT_FIELD_TYPE}
          disabledField={submitDisabled}
          label={submitLabel}
          dictionary={dictionary}
          formId={formId}
        />
      ) : (
        <FormField
          id="next-field"
          fieldType={SUBMIT_FIELD_TYPE}
          disabledField={nextDisabled}
          onClick={handleNextSession}
          label={submitLabel}
          dictionary={dictionary}
          formId={formId}
        />
      )}
    </div>
  );
}