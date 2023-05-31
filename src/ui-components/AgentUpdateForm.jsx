/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Agent } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function AgentUpdateForm(props) {
  const {
    id: idProp,
    agent: agentModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    last_name: "",
    first_name: "",
    telephon_number: "",
    stockID: "",
  };
  const [last_name, setLast_name] = React.useState(initialValues.last_name);
  const [first_name, setFirst_name] = React.useState(initialValues.first_name);
  const [telephon_number, setTelephon_number] = React.useState(
    initialValues.telephon_number
  );
  const [stockID, setStockID] = React.useState(initialValues.stockID);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = agentRecord
      ? { ...initialValues, ...agentRecord }
      : initialValues;
    setLast_name(cleanValues.last_name);
    setFirst_name(cleanValues.first_name);
    setTelephon_number(cleanValues.telephon_number);
    setStockID(cleanValues.stockID);
    setErrors({});
  };
  const [agentRecord, setAgentRecord] = React.useState(agentModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Agent, idProp)
        : agentModelProp;
      setAgentRecord(record);
    };
    queryData();
  }, [idProp, agentModelProp]);
  React.useEffect(resetStateValues, [agentRecord]);
  const validations = {
    last_name: [{ type: "Required" }],
    first_name: [{ type: "Required" }],
    telephon_number: [{ type: "Required" }],
    stockID: [{ type: "Required" }],
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
          last_name,
          first_name,
          telephon_number,
          stockID,
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
            Agent.copyOf(agentRecord, (updated) => {
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
      {...getOverrideProps(overrides, "AgentUpdateForm")}
      {...rest}
    >
      <TextField
        label="Last name"
        isRequired={true}
        isReadOnly={false}
        value={last_name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              last_name: value,
              first_name,
              telephon_number,
              stockID,
            };
            const result = onChange(modelFields);
            value = result?.last_name ?? value;
          }
          if (errors.last_name?.hasError) {
            runValidationTasks("last_name", value);
          }
          setLast_name(value);
        }}
        onBlur={() => runValidationTasks("last_name", last_name)}
        errorMessage={errors.last_name?.errorMessage}
        hasError={errors.last_name?.hasError}
        {...getOverrideProps(overrides, "last_name")}
      ></TextField>
      <TextField
        label="First name"
        isRequired={true}
        isReadOnly={false}
        value={first_name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              last_name,
              first_name: value,
              telephon_number,
              stockID,
            };
            const result = onChange(modelFields);
            value = result?.first_name ?? value;
          }
          if (errors.first_name?.hasError) {
            runValidationTasks("first_name", value);
          }
          setFirst_name(value);
        }}
        onBlur={() => runValidationTasks("first_name", first_name)}
        errorMessage={errors.first_name?.errorMessage}
        hasError={errors.first_name?.hasError}
        {...getOverrideProps(overrides, "first_name")}
      ></TextField>
      <TextField
        label="Telephon number"
        isRequired={true}
        isReadOnly={false}
        value={telephon_number}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              last_name,
              first_name,
              telephon_number: value,
              stockID,
            };
            const result = onChange(modelFields);
            value = result?.telephon_number ?? value;
          }
          if (errors.telephon_number?.hasError) {
            runValidationTasks("telephon_number", value);
          }
          setTelephon_number(value);
        }}
        onBlur={() => runValidationTasks("telephon_number", telephon_number)}
        errorMessage={errors.telephon_number?.errorMessage}
        hasError={errors.telephon_number?.hasError}
        {...getOverrideProps(overrides, "telephon_number")}
      ></TextField>
      <TextField
        label="Stock id"
        isRequired={true}
        isReadOnly={false}
        value={stockID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              last_name,
              first_name,
              telephon_number,
              stockID: value,
            };
            const result = onChange(modelFields);
            value = result?.stockID ?? value;
          }
          if (errors.stockID?.hasError) {
            runValidationTasks("stockID", value);
          }
          setStockID(value);
        }}
        onBlur={() => runValidationTasks("stockID", stockID)}
        errorMessage={errors.stockID?.errorMessage}
        hasError={errors.stockID?.hasError}
        {...getOverrideProps(overrides, "stockID")}
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
          isDisabled={!(idProp || agentModelProp)}
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
              !(idProp || agentModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
