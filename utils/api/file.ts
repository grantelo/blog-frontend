import { AxiosInstance } from "axios";
import { IFile } from "../../models/IFile";

const FileApi = (instance: AxiosInstance) => ({
  upload: (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    return instance.post<IFile>("/file/upload-image", formData);
  },
});

export default FileApi;
