import { create } from 'zustand';

type AuthForm = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

type AuthStore = {
  form: AuthForm;
  updateForm: (fields: Partial<AuthForm>) => void;
  resetForm: () => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  form: {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  },
  updateForm: (fields) =>
    set((state) => ({
      form: { ...state.form, ...fields },
    })),
  resetForm: () =>
    set(() => ({
      form: {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
      },
    })),
}));

export default useAuthStore;
