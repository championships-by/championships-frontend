import { instance } from ".";

const CERTIFICATE = "/certificate";

export const certificateApi = {
  getCertificateById: (params) =>
    instance
      .get(`${CERTIFICATE}/get_certificate_by_id`, { params })
      .then((res) => res.data),

  createCertificate: (data) =>
    instance.post(
      `${CERTIFICATE}/create_certificate_for_each_participant`,
      data
    ),
};
