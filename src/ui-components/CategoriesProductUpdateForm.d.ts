/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { CategoriesProduct } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CategoriesProductUpdateFormInputValues = {
    label?: string;
};
export declare type CategoriesProductUpdateFormValidationValues = {
    label?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CategoriesProductUpdateFormOverridesProps = {
    CategoriesProductUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    label?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CategoriesProductUpdateFormProps = React.PropsWithChildren<{
    overrides?: CategoriesProductUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    categoriesProduct?: CategoriesProduct;
    onSubmit?: (fields: CategoriesProductUpdateFormInputValues) => CategoriesProductUpdateFormInputValues;
    onSuccess?: (fields: CategoriesProductUpdateFormInputValues) => void;
    onError?: (fields: CategoriesProductUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CategoriesProductUpdateFormInputValues) => CategoriesProductUpdateFormInputValues;
    onValidate?: CategoriesProductUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CategoriesProductUpdateForm(props: CategoriesProductUpdateFormProps): React.ReactElement;
