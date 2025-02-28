import { useState, useEffect } from "react";
import { Typography, message } from "antd";
import { useTranslation } from "react-i18next";
import { UploadOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { eventApi } from "@api";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { PHOTO_FILE_PATH } from "@constants";

async function fetchPhotos(eventId, setPhotos) {
  const response = await eventApi.getEventPhotos(eventId);
  const photoNames = response.data;

  const photoObjects = photoNames.map((filename) => ({
    src: `${PHOTO_FILE_PATH}${eventId}/${filename}`,
    filename,
  }));

  setPhotos(photoObjects);
}

function openLightbox(index, setCurrentImage, setIsLightboxOpen) {
  setCurrentImage(index);
  setIsLightboxOpen(true);
}

function closeLightbox(setIsLightboxOpen) {
  setIsLightboxOpen(false);
}

async function deletePhoto(eventId, filename, setPhotos, t) {
  await eventApi.deleteEventPhotos(eventId, filename);
  message.success(t("COMMON.PHOTO_DELETE-SUCCESS"));
  setPhotos((prevPhotos) =>
    prevPhotos.filter((photo) => photo.filename !== filename)
  );
}

function handleUploadClick(eventId, t, fetchPhotos, setPhotos) {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.multiple = true;
  fileInput.onchange = async (event) => {
    const files = event.target.files;
    if (!files.length) return;

    const formData = new FormData();
    for (let file of files) {
      formData.append("photos", file);
    }

    await eventApi.uploadEventPhotos(eventId, formData);
    message.success(t("COMMON.PHOTO_UPLOAD_SUCCESS"));
    fetchPhotos(eventId, setPhotos);
  };
  fileInput.click();
}

function EventPhotoGallery({ eventId, forEdit = false }) {
  const { t } = useTranslation();
  const [photos, setPhotos] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    fetchPhotos(eventId, setPhotos);
  }, [eventId]);

  if (!photos.length && !forEdit) {
    return null;
  }

  return (
    <div className="event-photo-gallery">
      <Typography.Title level={3}>
        {t("COMMON.PHOTO_GALLERY_TITLE")}
      </Typography.Title>
      <div className="photo-grid">
        {photos.map((photo, index) => (
          <div key={index} className="photo-item">
            <div className="photo-overlay">
              <img src={photo.src} alt={`Event photo ${index + 1}`} />
              <div className="photo-actions">
                <EyeOutlined
                  className="icon"
                  onClick={() =>
                    openLightbox(index, setCurrentImage, setIsLightboxOpen)
                  }
                />
                {forEdit && (
                  <DeleteOutlined
                    className="icon delete"
                    onClick={() =>
                      deletePhoto(eventId, photo.filename, setPhotos, t)
                    }
                  />
                )}
              </div>
            </div>
          </div>
        ))}

        {forEdit && (
          <Typography.Text
            className="upload_photo_to_gallery"
            type="secondary"
            onClick={() =>
              handleUploadClick(eventId, t, fetchPhotos, setPhotos)
            }
          >
            <div className="upload-button">
              <UploadOutlined />
              {t("COMMON.UPLOAD")}
            </div>
          </Typography.Text>
        )}
      </div>

      {isLightboxOpen && (
        <Lightbox
          mainSrc={photos[currentImage].src}
          nextSrc={photos[(currentImage + 1) % photos.length].src}
          prevSrc={
            photos[(currentImage + photos.length - 1) % photos.length].src
          }
          onCloseRequest={() => closeLightbox(setIsLightboxOpen)}
          onMovePrevRequest={() =>
            setCurrentImage((currentImage + photos.length - 1) % photos.length)
          }
          onMoveNextRequest={() =>
            setCurrentImage((currentImage + 1) % photos.length)
          }
        />
      )}
    </div>
  );
}

export default EventPhotoGallery;
