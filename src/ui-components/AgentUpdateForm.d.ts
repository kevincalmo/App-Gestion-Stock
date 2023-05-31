/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Agent } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type AgentUpdateFormInputValues = {
    last_name?: string;
    first_name?: string;
    telephon_number?: string;
    stockID?: string;
};
export declare type AgentUpdateFormValidationValues = {
    last_name?: ValidationFunction<string>;
    first_name?: ValidationFunction<string>;
    telephon_number?: ValidationFunction<string>;
    stockID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AgentUpdateFormOverridesProps = {
    AgentUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    last_name?: PrimitiveOverrideProps<TextFieldProps>;
    first_name?: PrimitiveOverrideProps<TextFieldProps>;
    telephon_number?: PrimitiveOverrideProps<TextFieldProps>;
    stockID?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AgentUpdateFormProps = React.PropsWithChildren<{
    overrides?: AgentUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    agent?: Agent;
    onSubmit?: (fields: AgentUpdateFormInputValues) => AgentUpdateFormInputValues;
    onSuccess?: (fields: AgentUpdateFormInputValues) => void;
    onError?: (fields: AgentUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AgentUpdateFormInputValues) => AgentUpdateFormInputValues;
    onValidate?: AgentUpdateFormValidationValues;
} & React.CSSProperties>;
export default function AgentUpdateForm(props: AgentUpdateFormProps): React.ReactElement;
