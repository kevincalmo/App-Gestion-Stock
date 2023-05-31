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
export declare type AgentCreateFormInputValues = {
    last_name?: string;
    first_name?: string;
    telephon_number?: string;
    stockID?: string;
};
export declare type AgentCreateFormValidationValues = {
    last_name?: ValidationFunction<string>;
    first_name?: ValidationFunction<string>;
    telephon_number?: ValidationFunction<string>;
    stockID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AgentCreateFormOverridesProps = {
    AgentCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    last_name?: PrimitiveOverrideProps<TextFieldProps>;
    first_name?: PrimitiveOverrideProps<TextFieldProps>;
    telephon_number?: PrimitiveOverrideProps<TextFieldProps>;
    stockID?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AgentCreateFormProps = React.PropsWithChildren<{
    overrides?: AgentCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: AgentCreateFormInputValues) => AgentCreateFormInputValues;
    onSuccess?: (fields: AgentCreateFormInputValues) => void;
    onError?: (fields: AgentCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AgentCreateFormInputValues) => AgentCreateFormInputValues;
    onValidate?: AgentCreateFormValidationValues;
} & React.CSSProperties>;
export default function AgentCreateForm(props: AgentCreateFormProps): React.ReactElement;
