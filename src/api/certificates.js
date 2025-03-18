import { instance } from ".";

const CERTIFICATE = "/certificate";

export const certificateApi = {
  getCertificateById: (certificateId) =>
    instance.get(`${CERTIFICATE}/get_certificate_by_id`, {
      params: { certificate_id: certificateId },
    }),

  createCertificate: (certificateData) =>
    instance.post(
      `${CERTIFICATE}/create_certificate_for_each_participant`,
      certificateData
    ),
};
