import { instance } from ".";

const routes = "/certificate";

export const certificateApi = {
  getCertificateById: (certificateId) =>
    instance.get(`${routes}/get_certificate_by_id`, {
      params: {
        certificate_id: certificateId,
      },
    }),

  createCertificate: (certificateData) =>
    instance.post(
      `${routes}/create_certificate_for_each_participant`,
      certificateData
    ),
};
