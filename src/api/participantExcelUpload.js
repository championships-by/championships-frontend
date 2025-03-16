import { instance } from ".";

export const participantExcelUpload = {
  uploadExcel: (formData) => {
    return instance.post(`${API_PATH}/participant/upload_excel`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
