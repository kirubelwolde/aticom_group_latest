import { 
  useForm, 
  UseFormReturn, 
  FieldValues, 
  UseFormProps, 
  UseFormReset,
  SubmitHandler,
  SubmitErrorHandler,
  DefaultValues,
  FieldPath
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodType, ZodTypeDef } from 'zod';
import { useCallback, useRef } from 'react';

type FormHandlerOptions<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TSchema extends ZodType = ZodType<any, any, any>
> = {
  schema: TSchema;
  defaultValues?: DefaultValues<TFieldValues>;
  onSubmit: SubmitHandler<TFieldValues>;
  onSuccess?: (data: TFieldValues) => void;
  onError?: (error: unknown) => void;
  onInvalid?: SubmitErrorHandler<TFieldValues>;
} & Omit<UseFormProps<TFieldValues, TContext>, 'resolver' | 'defaultValues'>;

// Extended return type to include all form methods
type UseFormHandlerReturn<TFieldValues extends FieldValues> = {
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  reset: UseFormReset<TFieldValues>;
  isSubmitting: boolean;
} & Omit<UseFormReturn<TFieldValues>, 'handleSubmit' | 'reset'>;

export function useFormHandler<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TSchema extends ZodType = ZodType<any, any, any>
>({
  schema,
  defaultValues,
  onSubmit,
  onSuccess,
  onError,
  onInvalid,
  ...formProps
}: FormHandlerOptions<TFieldValues, TContext, TSchema>): UseFormHandlerReturn<TFieldValues> {
  const formMethods = useForm<TFieldValues, TContext>({
    resolver: zodResolver(schema) as any,
    defaultValues: defaultValues as DefaultValues<TFieldValues>,
    mode: 'onChange',
    ...formProps,
  });

  const isSubmittingRef = useRef(false);

  const handleSubmit = useCallback(
    async (e?: React.BaseSyntheticEvent) => {
      if (isSubmittingRef.current) return;
      isSubmittingRef.current = true;

      try {
        const isValid = await formMethods.trigger();
        if (!isValid) {
          onInvalid?.(formMethods.formState.errors);
          return;
        }

        const data = formMethods.getValues();
        await onSubmit(data);
        onSuccess?.(data);
      } catch (error) {
        console.error('Form submission error:', error);
        onError?.(error);
      } finally {
        isSubmittingRef.current = false;
      }
    },
    [formMethods, onError, onInvalid, onSubmit, onSuccess]
  );

  const resetForm = useCallback<UseFormReset<TFieldValues>>(
    (values, keepStateOptions) => {
      return formMethods.reset(values || defaultValues as any, keepStateOptions);
    },
    [defaultValues, formMethods]
  );

  return {
    ...formMethods,
    handleSubmit,
    reset: resetForm,
    isSubmitting: isSubmittingRef.current,
  };
}

// Example usage:
/*
const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type FormData = z.infer<typeof formSchema>;

const { register, handleSubmit, formState: { errors }, reset } = useFormHandler<FormData>({
  schema: formSchema,
  defaultValues: { email: '', password: '' },
  onSubmit: async (data) => {
    // Handle form submission
    await loginUser(data);
  },
  onSuccess: (data) => {
    console.log('Form submitted successfully', data);
  },
  onError: (error) => {
    console.error('Form submission failed', error);
  },
});
*/
