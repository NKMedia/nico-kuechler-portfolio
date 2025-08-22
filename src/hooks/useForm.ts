import { useState, useCallback, ChangeEvent, FormEvent } from "react";
import type {
  UseFormReturn,
  FormChangeHandler,
  FormSubmitHandler,
} from "../types";

/**
 * Custom hook for managing form state, validation, and submission
 *
 * @template T - The type of the form data object
 * @param {T} initialValues - Initial form values
 * @param {(values: T) => Record<keyof T, string>} validate - Optional validation function
 * @returns {UseFormReturn<T>} Form management object
 */
export function useForm<T extends Record<string, unknown>>(
  initialValues: T,
  validate?: (values: T) => Record<keyof T, string>
): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<keyof T, string>>(
    {} as Record<keyof T, string>
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Handle input changes
  const handleChange: FormChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value, type } = e.target;

      setValues((prev) => ({
        ...prev,
        [name]:
          type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      }));

      // Clear error for this field when user starts typing
      if (errors[name as keyof T]) {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    },
    [errors]
  );

  // Validate form
  const validateForm = useCallback(
    (formValues: T): boolean => {
      if (!validate) return true;

      const newErrors = validate(formValues);
      setErrors(newErrors);

      // Check if any errors exist
      return !Object.values(newErrors).some((error) => error !== "");
    },
    [validate]
  );

  // Handle form submission
  const handleSubmit = useCallback(
    (onSubmit: (values: T) => Promise<void>) => {
      const submitHandler: FormSubmitHandler = async (
        e: FormEvent<HTMLFormElement>
      ) => {
        e.preventDefault();

        if (isSubmitting) return;

        // Validate form
        if (!validateForm(values)) {
          return;
        }

        setIsSubmitting(true);

        try {
          await onSubmit(values);
        } catch (error) {
          console.error("Form submission error:", error);
          // You might want to set a general error here
        } finally {
          setIsSubmitting(false);
        }
      };

      return submitHandler;
    },
    [values, isSubmitting, validateForm]
  );

  // Reset form to initial values
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({} as Record<keyof T, string>);
    setIsSubmitting(false);
  }, [initialValues]);

  // Set error for a specific field
  const setFieldError = useCallback((field: keyof T, error: string) => {
    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  }, []);

  // Clear all errors
  const clearErrors = useCallback(() => {
    setErrors({} as Record<keyof T, string>);
  }, []);

  // Set multiple values at once
  const setFieldValues = useCallback((newValues: Partial<T>) => {
    setValues((prev) => ({
      ...prev,
      ...newValues,
    }));
  }, []);

  // Get error for a specific field
  const getFieldError = useCallback(
    (field: keyof T): string => {
      return errors[field] || "";
    },
    [errors]
  );

  // Check if field has error
  const hasFieldError = useCallback(
    (field: keyof T): boolean => {
      return !!errors[field];
    },
    [errors]
  );

  // Check if form has any errors
  const hasErrors = useCallback((): boolean => {
    return Object.values(errors).some((error) => error !== "");
  }, [errors]);

  // Check if form is valid (no errors and required fields filled)
  const isValid = useCallback((): boolean => {
    return !hasErrors() && validateForm(values);
  }, [hasErrors, validateForm, values]);

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    reset,
    setFieldError,
    clearErrors,
    setFieldValues,
    getFieldError,
    hasFieldError,
    hasErrors,
    isValid,
  };
}

export default useForm;
