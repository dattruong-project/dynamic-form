import { Dayjs } from 'dayjs';
import { PickerBaseProps } from 'antd/es/date-picker/generatePicker';
import { DatePicker, DatePickerProps } from 'antd';
import { FormFieldProps } from '../../../form-builder';

export interface PickerBasePropsEx extends Omit<PickerBaseProps<Dayjs>, 'picker'> { }

interface DatePickerComponentProps {
    value: any;
    id: string;
    onChange: (value: any) => void;
    onBlur: (value: any) => void;
    placeholder: string;
    error: any;
    dateFormat?: string,
    picker: "date" | "time";
    maxDate?: Dayjs;
    minDate?: Dayjs;
}

type DatePickerType = FormFieldProps & DatePickerComponentProps & PickerBasePropsEx;

const DatePickerComponent: React.FC<DatePickerType> = ({
    picker,
    value,
    onChange,
    onBlur,
    placeholder,
    propRef,
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

    const onDateChange: DatePickerProps['onChange'] = (_date, dateString) => onChange(dateString);

    return (
            <DatePicker
                {...rest} 
                picker={picker}
                defaultValue={value}
                onChange={onDateChange}
                onBlur={onBlur}
                format={dateFormat}
                disabledDate={disabledDate}
                placeholder={placeholder}
                />
    );
};

export default DatePickerComponent;