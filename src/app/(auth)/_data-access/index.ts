import { toast } from "@/components/ui/use-toast";
import { APIs, postRequest } from "@/lib/server-client";
import { displayQueryError } from "@/lib/utils";
import { QueryResponse } from "@/types/queries";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

type RegisterUserProps = {
  email: string;
  password: string;
  confirmPassword: string;
};

type LoginProps = Omit<RegisterUserProps, "confirmPassword">;
type ResetPasswordRequest = Pick<RegisterUserProps, "email">;
type ResetPassword = Omit<RegisterUserProps, "email">;

export async function registerUser(data: RegisterUserProps) {
  return postRequest<QueryResponse<any>, RegisterUserProps>({
    url: APIs.createAccount,
    payload: data,
  });
}

export const useCreateAccount = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: registerUser,
    onSuccess(data) {
      toast({
        variant: "success",
        description: `${data.message}`,
      });
      router.push("/verify");
    },
    onError: (error: AxiosError<any>) => {
      displayQueryError(error);
    },
  });
};

export async function loginUser(data: LoginProps) {
  return postRequest<QueryResponse<any>, LoginProps>({
    url: APIs.login,
    payload: data,
  });
}

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess(data) {
      toast({
        variant: "success",
        description: `${data.message}`,
      });
    },
    onError: (error: AxiosError<any>) => {
      displayQueryError(error);
    },
  });
};

export async function requestPasswordReset(data: ResetPasswordRequest) {
  return postRequest<QueryResponse<any>, ResetPasswordRequest>({
    url: APIs.resetPasswordRequest,
    payload: data,
  });
}

export const useRequestPasswordReset = () => {
  return useMutation({
    mutationFn: requestPasswordReset,
    onSuccess(data) {
      toast({
        variant: "success",
        description: `${data.message}`,
      });
    },
    onError: (error: AxiosError<any>) => {
      displayQueryError(error);
    },
  });
};

export async function resetPassword(data: ResetPassword) {
  return postRequest<QueryResponse<any>, ResetPassword>({
    url: APIs.resetPassword,
    payload: data,
  });
}

export const useResetPassword = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: resetPassword,
    onSuccess(data) {
      toast({
        variant: "success",
        title: "Password Reset Successful",
        description: `${data.message}`,
      });

      router.push("/login");
    },
    onError: (error: AxiosError<any>) => {
      displayQueryError(error);
    },
  });
};

type SetUpProfileProps = {
  first_name: string;
  last_name: string;
  user_name: string;
  profession?: string;
  bio?: string;
  address?: string;
  city: string;
  country: string;
  id: string;
};

export async function setupProfile(data: SetUpProfileProps) {
  return postRequest<QueryResponse<any>, SetUpProfileProps>({
    url: APIs.setupProfile,
    payload: data,
  });
}

export const useSetupProfile = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: setupProfile,
    onSuccess(data) {
      toast({
        variant: "success",
        description: `${data.message}`,
      });

      router.push(`/${data.data.user_name}`);
    },
    onError: (error: AxiosError<any>) => {
      displayQueryError(error);
    },
  });
};
