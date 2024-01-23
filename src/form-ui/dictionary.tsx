
import { Dictionary } from "../form-builder";
import { AutoCompleteComponent, CheckBoxComponent, DatePickerComponent, InputComponent, MultiErrorsComponent, RadioComponent, RangeDateTimePickerComponent, SelectComponent, SubmitButton } from "./component";

export const dictionary: Dictionary = {
    input: InputComponent,
    checkbox: CheckBoxComponent,
    select: SelectComponent,
    radio: RadioComponent,
    errors: MultiErrorsComponent,
    submit: SubmitButton,
    dateTimePicker: DatePickerComponent,
    autoComplete: AutoCompleteComponent,
    rangeDateTimePicker: RangeDateTimePickerComponent,
    card: CardComponent,
    table: TableComponent
};