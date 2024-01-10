export const extraValidation = {
    validationAllFalse: () => (fieldValue) => {
      const allFalse = fieldValue && fieldValue.every(({selected}) => selected === false);
      return !allFalse;
    },
    validationEqual: (meta) => (fieldValue, watch) => {
      const {relatedTo} = meta;
      const value = watch(relatedTo);
      return value === fieldValue;
    },
};

