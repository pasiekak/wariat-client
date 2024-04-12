import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import "./styles/images.css";
import IImage from "./types/IImage";
import Image from "./components/Image";
import EmptyImage from "./components/EmptyImage";
import { useOutletContext } from "react-router-dom";
import { IDefaultOutletContext } from "../../types/IOutletContext";
import useImagesRelatedToEntity from "../../../../api/hooks/images/useImagesRelatedToEntity";

interface IImagesProps {
  id: number;
  entityPlural: "products" | "events";
  className?: string;
}

const Images = ({ id, entityPlural, className }: IImagesProps) => {
  const { addBanner } = useOutletContext<IDefaultOutletContext>();
  const [images, setImages] = useState<IImage[]>([]);

  const { data } = useImagesRelatedToEntity({
    id,
    entityPlural,
  });

  useEffect(() => {
    if (data) {
      setImages(data.images);
    }
  }, [id, data]);

  const handleAddImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const formData = new FormData();
      formData.append("image", files[0]);
      axios
        .post(`/api/images/${entityPlural}/${id}`, formData)
        .then((res) => {
          if (res.status === 201) {
            setImages((prev) => {
              const newImage = res.data.images[0];
              const newImageOb = {
                id: newImage.id,
                main: newImage.main,
              };
              return [...prev, newImageOb];
            });
            addBanner({
              message: "Dodano zdjęcie.",
              type: "success",
            });
          }
        })
        .catch((err) => {
          if (err?.response?.data?.message)
            addBanner({ message: err.response.data.message, type: "error" });
        });
    }
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`/api/images/${id}`)

      .then((res) => {
        if (res) {
          if (res.status === 200) {
            setImages((prev) => {
              return prev.filter((ob) => ob.id !== id);
            });

            addBanner({
              message: "Usunięto zdjęcie",
              type: "success",
            });
          }
        }
      })
      .catch((err) => {
        if (err?.response?.data?.message)
          addBanner({ message: err.response.data.message, type: "error" });
      });
  };
  const handleMain = (id: number) => {
    axios
      .put(`/api/images/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setImages((prev) => {
            return prev.map((image) => {
              if (image.id === id) {
                return { ...image, main: true };
              } else {
                return { ...image, main: false };
              }
            });
          });
          addBanner({
            message: "Ustawiono nowe główne zdjęcie.",
            type: "success",
          });
        }
      })
      .catch((err) => {
        if (err?.response?.data?.message)
          addBanner({ message: err.response.data.message, type: "error" });
      });
  };

  return (
    <section className={`images${className ? ` ${className}` : ""}`}>
      <h4>Zarządzanie zdjęciami</h4>
      {images.length > 0 &&
        images.map((image) => (
          <Image
            id={image.id}
            main={image.main}
            handleDelete={handleDelete}
            handleMain={handleMain}
            key={image.id}
          />
        ))}
      <EmptyImage handleAddImage={handleAddImage} />
      {images.length === 0 && <h4>Brak zdjęć</h4>}
    </section>
  );
};

export default Images;
