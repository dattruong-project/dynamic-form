import { Dayjs } from 'dayjs';
import * as React from 'react';
import { RangePickerBaseProps } from 'antd/es/date-picker/generatePicker';
import { DatePicker } from 'antd';
import { FormFieldProps } from '../../../form-builder/components';

export interface RangeDateTimePickerProps extends Omit<RangePickerBaseProps<Dayjs>, 'picker'> { }

interface RangeDateTimePickerComponentProps extends RangeDateTimePickerProps {
    value: any;
    id: string;
    onChange: (value: any) => void;
    onBlur: (value: any) => void;
    placeholder: [string, string];
    error: any;
    dateFormat?: string;
    maxDate?: Dayjs;
    minDate?: Dayjs
}

type RangeDateTimePickerType = FormFieldProps & RangeDateTimePickerComponentProps & RangeDateTimePickerProps;

const RangeDateTimePickerComponent: React.FC<RangeDateTimePickerType> = ({
    value,
    onChange,
    onBlur,
    placeholder,
    dateFormat,
    maxDate,
    minDate,
    ...rest
}) => {

    const disabledDate = (current: Dayjs | undefined) => {
        if (!current) return false;

        if (maxDate && current.isAfter(maxDate, 'day')) return true;
        if (minDate && current.isBefore(minDate, 'day')) return true;
        return false;
    };

    return (
            <DatePicker.RangePicker
                {...rest}
                defaultValue={value}
                onChange={onChange}
                onBlur={onBlur}
                format={dateFormat}
                disabledDate={disabledDate}
                placeholder={placeholder}
            />
    );
};

export default RangeDateTimePickerComponent;