import { instance } from ".";

export const certificateApi = {
  getCertificateById: (certificateId) =>
    instance.get("/certificate/get_certificate_by_id", {
      params: {
        certificate_id: certificateId,
      },
    }),

  createCertificate: (certificateData) =>
    instance.post(
      "/certificate/create_certificate_for_each_participant",
      certificateData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    ),
};
