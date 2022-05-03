import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";

import { Alert, Avatar, Box, Button, Input } from "@mui/material";

import FormField from "../FormField";
import React, { FC, useRef, useState } from "react";

import { UpdateProfileFormSchema } from "../../utils/validations";
import IError from "../../models/IError";
import Api from "../../utils/api";
import { AxiosResponse } from "axios";
import { IFile } from "../../models/IFile";
import { UpdateUserProfileRequest } from "../../models/request/UpdateProfileRequest";
import { RequestUserUpdateProfileAction } from "../../redux/types/user";

interface ProfileFormProps {
  requestUserUpdateProfile: (
    payload: UpdateUserProfileRequest
  ) => RequestUserUpdateProfileAction;
  fullName: string;
  avatar: string;
  isLoading: boolean;
  error: IError;
}

const ProfileForm: FC<ProfileFormProps> = ({
  requestUserUpdateProfile,
  avatar,
  fullName,
  error,
  isLoading,
}) => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const methods = useForm<UpdateUserProfileRequest>({
    resolver: yupResolver(UpdateProfileFormSchema),
  });

  const { ref, ...rest } = methods.register("avatar");

  const onSubmit = async (payload: any) => {
    let response: AxiosResponse<IFile> | null = null;

    if (payload.avatar.length > 0) {
      //const urlFile = URL.createObjectURL(payload.avatar[0]);
      //console.log(urlFile);
      console.log(payload.avatar[0]);
      response = await Api().file.upload(payload.avatar[0]);
      console.log(response.data.file.url);
    }

    requestUserUpdateProfile({
      fullName: payload.fullName,
      avatar: response?.data.file.url,
    });
  };

  const handleClickAvatar = () => {
    inputRef.current?.click();
  };

  /*  const handleChangeAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = Array.from(e.target.files!);
    setUrl(URL.createObjectURL(file));
    onChange(e);
  };*/

  return (
    <Box
      sx={{
        padding: "15px",
        borderRadius: "16px",
        background: "#fff",
      }}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              onClick={handleClickAvatar}
              src={avatar}
              alt={fullName}
              sx={{
                width: 256,
                height: 256,
                marginBottom: "30px",
                cursor: "pointer",
              }}
            />
            <Input
              {...rest}
              inputRef={(e) => {
                ref(e);
                inputRef!.current = e;
              }}
              type={"file"}
              sx={{ display: "none" }}
            />
            <FormField
              name={"fullName"}
              label={"Полное имя"}
              value={fullName}
            />
            {error?.message && (
              <Alert sx={{ marginBottom: "20px" }} severity={"error"}>
                {error?.message}
              </Alert>
            )}
            <Button
              type={"submit"}
              disabled={disabled || isLoading}
              variant={"text"}
              color={"primary"}
            >
              Сохранить
            </Button>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
};

export default ProfileForm;
