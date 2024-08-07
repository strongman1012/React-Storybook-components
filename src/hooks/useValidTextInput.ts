import { StandardTextFieldProps } from "@material-ui/core";
import { useEffect, useState } from "react";
import { validateInput, createOnTextChange } from "../components/utils/data-validation/validate";
import { ValidationItem } from "../types/validation";

/**
 * The return type of the valid text input hook
 */
type ValidTextInputHook = {
    /**
     * Props which can be passed directly to a MUI text box
     */
    textBoxProps: Required<Pick<StandardTextFieldProps, 'error' | 'helperText' | 'onChange' | 'value'>>
    /**
     * True if the current displayed text has any rule violations
     */
    hasErrors: boolean;
    /**
     * Last valid value which was input. Uses initial value as starting value UNLESS the initial value
     * is invalid, in which case lastValidValue is undefined.
     */
    lastValidValue?: string;
};

type Options = {
    /**
     * Update the current displayed text to match the initial value if
     * the initial value changes
     */
    updateWithInitialValue?: boolean,
    /**
     * Do not allow the user to type invalid input
     */
    disallowInvalid?: boolean
};

/**
 * Handles validating user input values by changing what text box props are set. Displays
 * error message when input is invalid. Calls provided callback when a valid value is entered. 
 * 
 * Options:
 * - updateWithInitialValue: allow for displayed value to update alongside initial value. Set this to true in the
 * case where the initial value is a redux or other state like value.
 * - disallowInvalid: Do not allow invalid input to be entered at all.
 * 
 * @param initialValue Initial value for the text box
 * @param validators Rules to validate user input against
 * @param onValidValue Action to take when the user inputs a valid value
 * @param options Options to modify behavior.
 * @returns Props for a MUI text box.
 */
const useValidTextInput = (initialValue: string, validators: ValidationItem<string>[], onValidValue: (safeValue: string) => void, options?: Options): ValidTextInputHook => {

    const [value, setValue] = useState<string>(initialValue);
    const [lastValidValue, setLastValidValue] = useState<string | undefined>(validateInput(initialValue, validators).length === 0 ? initialValue : undefined);

    useEffect(() => {
        if (options?.updateWithInitialValue) {
            setValue(initialValue)
        }
    }, [initialValue, options?.updateWithInitialValue])

    const errors = validateInput(value, validators);

    const hasErrors = errors.length > 0;

    return {
        textBoxProps: {
            error: hasErrors,
            helperText: errors.length > 0 ? errors[0] : ' ',
            value: value,
            onChange: createOnTextChange(
                validators,
                setValue,
                {
                    onValidInput: (v) => {
                        setLastValidValue(v);
                        onValidValue(v);
                    },
                    disallowInvalid: options?.disallowInvalid
                }
            )
        },
        hasErrors: hasErrors,
        lastValidValue: lastValidValue
    }
}

export default useValidTextInput;
