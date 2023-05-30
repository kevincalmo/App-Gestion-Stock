/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CategoriesProductCreateFormInputValues = {
    label?: string;
};
export declare type CategoriesProductCreateFormValidationValues = {
    label?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CategoriesProductCreateFormOverridesProps = {
    CategoriesProductCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    label?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CategoriesProductCreateFormProps = React.PropsWithChildren<{
    overrides?: CategoriesProductCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CategoriesProductCreateFormInputValues) => CategoriesProductCreateFormInputValues;
    onSuccess?: (fields: CategoriesProductCreateFormInputValues) => void;
    onError?: (fields: CategoriesProductCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CategoriesProductCreateFormInputValues) => CategoriesProductCreateFormInputValues;
    onValidate?: CategoriesProductCreateFormValidationValues;
} & React.CSSProperties>;
export default function CategoriesProductCreateForm(props: CategoriesProductCreateFormProps): React.ReactElement;
