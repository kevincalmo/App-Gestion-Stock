/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { CategoriesProduct } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function CategoriesProductUpdateForm(props) {
  const {
    id: idProp,
    categoriesProduct: categoriesProductModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    label: "",
  };
  const [label, setLabel] = React.useState(initialValues.label);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = categoriesProductRecord
      ? { ...initialValues, ...categoriesProductRecord }
      : initialValues;
    setLabel(cleanValues.label);
    setErrors({});
  };
  const [categoriesProductRecord, setCategoriesProductRecord] = React.useState(
    categoriesProductModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(CategoriesProduct, idProp)
        : categoriesProductModelProp;
      setCategoriesProductRecord(record);
    };
    queryData();
  }, [idProp, categoriesProductModelProp]);
  React.useEffect(resetStateValues, [categoriesProductRecord]);
  const validations = {
    label: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          label,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(
            CategoriesProduct.copyOf(categoriesProductRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "CategoriesProductUpdateForm")}
      {...rest}
    >
      <TextField
        label="Label"
        isRequired={false}
        isReadOnly={false}
        value={label}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              label: value,
            };
            const result = onChange(modelFields);
            value = result?.label ?? value;
          }
          if (errors.label?.hasError) {
            runValidationTasks("label", value);
          }
          setLabel(value);
        }}
        onBlur={() => runValidationTasks("label", label)}
        errorMessage={errors.label?.errorMessage}
        hasError={errors.label?.hasError}
        {...getOverrideProps(overrides, "label")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || categoriesProductModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || categoriesProductModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
