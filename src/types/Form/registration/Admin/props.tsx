type AdminRegisterFormData = {
  email: string;
  password: string;
  confirmPassword: string
};
export type AdminRegisterFormProps = AdminRegisterFormData & {
  updateRegisterFields: (fields: Partial<AdminRegisterFormData>) => void;
};
