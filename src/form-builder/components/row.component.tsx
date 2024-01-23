import { Col, Row } from "antd";
import { FC } from "react";
import React from "react";
import { Control, FieldValues, FieldErrors, UseFormWatch, useFormContext, Controller } from "../../form-controller";
import {, FormFields, ExtraValidation, Dictionary } from "../types";
import {getFieldRules, FieldRules } from "../utils/validation.utils";
import { FormField } from "./formField.component";
import { filterDependentsFieldsById } from "../utils/conditionalFields.utils";

type RowComponentProps = {
    id?: string;
    formId: string;
    dictionary: Dictionary;
    colsGroup: ColsGroup;
    gutter?: number;
    fields: FormFields;
    fieldsById: string[];
    control: Control<FieldValues, any>;
    errors: FieldErrors<FieldValues>;
    extraValidation?: ExtraValidation;
    gridDefinition: GridDefinition;
    watch: UseFormWatch<FieldValues>
}
const RowComponent: FC<RowComponentProps> = ({
    id,
    fields,
    gutter,
    control,
    colsGroup,
    formId,
    dictionary,
    errors,
    fieldsById,
    extraValidation,
    gridDefinition,
    watch,
}) => {
    const context = useFormContext();
    const { getValues } = context;

    const getFieldValidationRules = (fieldId) => {
        const field = fields?.[fieldId];

        if (!field || !field.validation) {
            return {};
        }

        return {
            [fieldId]: getFieldRules({
                validation: field.validation,
                extraValidation,
                watch,
            }),
        };
    };

    const validationRulesById = React.useMemo(
        () =>
            fieldsById.reduce((accumulator, fieldId) => {
                return {
                    ...accumulator,
                    ...getFieldValidationRules(fieldId),
                };
            }, {} as { [key: string]: FieldRules }),
        [extraValidation, fields, fieldsById, watch]
    );

    const filteredFields = filterDependentsFieldsById({
        fieldsById,
        fields,
        getValues,
        errors,
        extraValidation,
    });

    const renderCol = (
        colDef,
        fields,
        filteredFields,
        control,
        formId,
        dictionary,
        errors,
        validationRulesById,
        context
    ) => {
        const fieldData = fields[colDef.id];

        if (!fieldData) {
            return null;
        }

        const { type, id, disabledField, meta, validation, data, ...callbacks } = fieldData;

        return (
            <Col
                order={colDef.order}
                span={colDef.grid?.span ?? 24}
                key={`${colDef.id}`}
                offset={colDef.grid?.offset}
                xs={colDef.grid?.xs}
                sm={colDef.grid?.sm}
                md={colDef.grid?.md}
                lg={colDef.grid?.lg}
                xl={colDef.grid?.xl}
                xxl={colDef.grid?.xxl}
            >
                {filteredFields.includes(id) && (
                    <>
                        <Controller
                            name={id}
                            control={control}
                            defaultValue={data}
                            rules={validationRulesById[id]}
                            render={({ field }) => {
                                const { ref, ...fieldRest } = field;
                                return (
                                    <FormField
                                        id={id}
                                        formId={formId}
                                        data={data}
                                        disabledField={disabledField}
                                        fieldType={type}
                                        validation={validation}
                                        dictionary={dictionary}
                                        error={errors?.[id]}
                                        errors={errors}
                                        propRef={ref}
                                        {...callbacks}
                                        {...meta}
                                        {...fieldRest}
                                    />
                                );
                            }}
                        />
                        {colDef.colsGroup?.cols &&
                            renderColsGroup(
                                colDef.colsGroup,
                                fields,
                                filteredFields,
                                control,
                                formId,
                                dictionary,
                                errors,
                                validationRulesById,
                                context
                            )}
                    </>
                )}
            </Col>
        );
    };

    const renderColsGroup = (
        colsGroup,
        fields,
        filteredFields,
        control,
        formId,
        dictionary,
        errors,
        validationRulesById,
        context
    ) => (
        <React.Fragment key={colsGroup.id}>
            {colsGroup.cols?.map((colDef) => {
                //check colDef is nested

                const row = gridDefinition.rows?.find((row) => row.id === colDef.id);
                if (row) {

                    return (
                        <Col order={colDef.order}
                            span={colDef.grid?.span ?? 24}
                            key={`${colDef.id}`}
                            offset={colDef.grid?.offset}
                            xs={colDef.grid?.xs}
                            sm={colDef.grid?.sm}
                            md={colDef.grid?.md}
                            lg={colDef.grid?.lg}
                            xl={colDef.grid?.xl}
                            xxl={colDef.grid?.xxl}>
                            <RowComponent
                                key={row.id}
                                id={row.id}
                                colsGroup={row.colsGroup}
                                gutter={row.gutter}
                                fields={fields}
                                formId={formId}
                                dictionary={dictionary}
                                control={control}
                                errors={errors}
                                extraValidation={extraValidation}
                                watch={watch}
                                fieldsById={fieldsById} gridDefinition={gridDefinition}
                            />
                        </Col>

                    );
                } else {
                    return renderCol(
                        colDef,
                        fields,
                        filteredFields,
                        control,
                        formId,
                        dictionary,
                        errors,
                        validationRulesById,
                        context
                    );
                }
            })}
        </React.Fragment>
    );

    return (
        <Col span={24} id={id}>
            <Row gutter={gutter}>
                {renderColsGroup(
                    colsGroup,
                    fields,
                    filteredFields,
                    control,
                    formId,
                    dictionary,
                    errors,
                    validationRulesById,
                    context
                )}
            </Row>
        </Col>
    );
};
export default RowComponent;