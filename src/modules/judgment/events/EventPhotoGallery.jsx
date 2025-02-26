import { useState, useEffect } from "react";
import { Typography, message } from "antd";
import { useTranslation } from "react-i18next";
import { UploadOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { eventApi } from "@api";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

function EventPhotoGallery({ eventId }) {
  const { t } = useTranslation();
  const [photos, setPhotos] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    fetchPhotos();
  }, [eventId]);

  const fetchPhotos = async () => {
    const response = await eventApi.getEventPhotos(eventId);
    const photoNames = response.data;

    const photoObjects = photoNames.map((filename) => ({
      src: `/backend/static/images/events/${eventId}/${filename}`,
      filename,
    }));

    setPhotos(photoObjects);
  };

  const openLightbox = (index) => {
    setCurrentImage(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const deletePhoto = async (filename) => {
    await eventApi.deleteEventPhotos(eventId, filename);
    message.success(t("COMMON.PHOTO_DELETE-SUCCESS"));
    setPhotos((prevPhotos) =>
      prevPhotos.filter((photo) => photo.filename !== filename)
    );
  };

  const handleUploadClick = () => {
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
      fetchPhotos();
    };
    fileInput.click();
  };

  return (
    <div className="event-photo-gallery">
      <h2>{t("COMMON.PHOTO_GALLERY_TITLE")}</h2>
      <div className="photo-grid">
        {photos.map((photo, index) => (
          <div key={index} className="photo-item">
            <div className="photo-overlay">
              <img src={photo.src} alt={`Event photo ${index + 1}`} />
              <div className="photo-actions">
                <EyeOutlined
                  className="icon"
                  onClick={() => openLightbox(index)}
                />
                <DeleteOutlined
                  className="icon delete"
                  onClick={() => deletePhoto(photo.filename)}
                />
              </div>
            </div>
          </div>
        ))}
        <Typography.Text
          className="upload_photo_to_gallery"
          type="secondary"
          onClick={handleUploadClick}
        >
          <div className="upload-button">
            <UploadOutlined />
            {t("COMMON.UPLOAD")}
          </div>
        </Typography.Text>
      </div>

      {isLightboxOpen && (
        <Lightbox
          mainSrc={photos[currentImage].src}
          nextSrc={photos[(currentImage + 1) % photos.length].src}
          prevSrc={
            photos[(currentImage + photos.length - 1) % photos.length].src
          }
          onCloseRequest={closeLightbox}
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
