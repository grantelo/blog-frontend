import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";

import { Alert, Avatar, Box, Button, CircularProgress, Input } from "@mui/material";

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
  const [loading, setLoading] = useState<boolean>(false)
  const [url, setUrl] = useState<string>(avatar);
  const methods = useForm<UpdateUserProfileRequest>({
    resolver: yupResolver(UpdateProfileFormSchema),
  });

  const { ref, onChange, ...rest } = methods.register("avatar");

  const onSubmit = async (payload: any) => {
    let response: AxiosResponse<IFile> | null = null;

    if (payload.avatar.length > 0) {
      setLoading(true)
      const urlFile = URL.createObjectURL(payload.avatar[0]);
      response = await Api().file.upload(payload.avatar[0]);
      setLoading(false)
    }

    requestUserUpdateProfile({
      fullName: payload.fullName,
      avatar: response?.data.file.url,
    });
  };

  const handleClickAvatar = () => {
    inputRef.current?.click();
  };

  const handleChangeAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e?.target?.files?.length) return

    const file = e.target.files[0];
    setUrl(URL.createObjectURL(file));
    onChange(e);
  };

  console.log("avatar")
  console.log(avatar)

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
            <Box sx={{position: 'relative', marginBottom: "30px",}}>
              <Avatar
                  onClick={handleClickAvatar}
                  src={url}
                  alt={fullName}
                  sx={{
                    width: 256,
                    height: 256,
                    cursor: "pointer",
                  }}
              />
              {true && (
                  <Box sx={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.6)', borderRadius: '50%'}}>
                <Box sx={{position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-20px',
                  marginLeft: '-20px',

                }}>
                  <CircularProgress/>
                </Box>
                  </Box>
              )}
            </Box>
            <Input
              {...rest}
              onChange={handleChangeAvatar}
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
