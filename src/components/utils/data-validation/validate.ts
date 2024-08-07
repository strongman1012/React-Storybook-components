import { ValidationItem } from "../../../types/validation";


/**
 * Given a list of validation items, return a list of errors corresponding
 * to the rules broken. Otherwise, return an empty list [].
 * @param value The value to validate.
 * @param checks The rules to validate against. 
 * @returns A list of strings detailing broken rules -- otherwise an empty list.
 */
export function validateInput<T>(value: T, checks: (ValidationItem<T>)[]): string[] {
    const errorList: string[] = [];
    for (const check of checks) {
        if (!check.verify(value)) {
            if (typeof check.errorText === 'string') {
                errorList.push(check.errorText)
            } else {
                errorList.push(check.errorText(value))
            }
        }
    }
    return errorList;
}

/**
 * Create an "onChange" event handler for text boxes which updates the state with the user input
 * and calls a "validInput" function every time the user inputs a valid value, depending on
 * the rules (validationItems) provided to this function. Allows the user
 * 
 * @returns A react on on change event handler
 */
export function createOnTextChange(
    /**
     * List of validators to use for this on change event
     */
    validators: ValidationItem<string>[],
    /**
     * Function to update the state with the user input
     */
    setState: (newValue: React.SetStateAction<string>) => void,
    /**
     * Additional options
     */
    options?: {
        /**
         * Do not update the state to an invalid state
         */
        disallowInvalid?: boolean,
        /**
         * Callback on valid input
         * @param validString An input which has passed all validators
         */
        onValidInput?: (validString: string) => void,
        /**
         * Callback on invalid input
         * @param errors List of error texts from rules violated
         */
        onInvalidInput?: (errors: string[]) => void
    }
): React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> {

    return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = event.target.value;

        const errors = validateInput(newValue, validators);

        if (errors.length === 0) {
            setState(newValue);
            if (options?.onValidInput) {
                options?.onValidInput(newValue);
            }
        } else {
            if (options != null && 'disallowInvalid' in options && !options.disallowInvalid) {
                setState(newValue);
            }
            if (options?.onInvalidInput) {
                options?.onInvalidInput(errors);
            }
        }
    }
}

/**
 * Join a set of validation items together by the "OR" operator. At least one
 * item must be true for this to be true.
 * @param items List of items to join by "OR |"
 * @param errorText The error text to display as a replacement for the error text which would appear.
 * @returns A new validation item.
 */
export function joinByOr<T>(items: ValidationItem<T>[], errorText?: ValidationItem<T>['errorText']): ValidationItem<T> {
    return {
        errorText: errorText ?? `Must meet one of the following conditions: ${items.map(i => i.errorText).join(", ")}`,
        verify: (val: T) => items.some((validator) => validator.verify(val))
    }
}

/**
 * Join a set of validation items together by the "AND" operator. All validation
 * items must be true for this to be true.
 * @param items List of items to join by "AND |"
 * @param errorText The error text to display as a replacement for the error text which would appear.
 * @returns A new validation item.
 */
export function joinByAnd<T>(items: ValidationItem<T>[], errorText?: ValidationItem<T>['errorText']): ValidationItem<T> {
    return {
        errorText: errorText ?? ((val: T) => items.filter((validator) => !validator.verify(val)).map((validator) => validator.errorText).join(", ")),
        verify: (val: T) => items.some((validator) => validator.verify(val))
    }
}
