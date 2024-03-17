import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import "./styles/images.css";
import IImage from "./types/IImage";
import Image from "./components/Image";
import EmptyImage from "./components/EmptyImage";

interface IImagesProps {
  productID: number;
}

const Images = ({ productID }: IImagesProps) => {
  const [images, setImages] = useState<IImage[]>([]);

  useEffect(() => {
    axios.get(`/api/images/products/${productID}`).then((res) => {
      if (res.status === 200) {
        setImages(res.data.images);
      }
    });
  }, [productID]);

  const handleAddImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const formData = new FormData();
      formData.append("image", files[0]);
      axios.post(`/api/images/products/${productID}`, formData).then((res) => {
        if (res.status === 201) {
          setImages((prev) => {
            const newImage = res.data.images[0];
            const newImageOb = {
              id: newImage.id,
              main: newImage.main,
            };
            return [...prev, newImageOb];
          });
        } else {
          alert(res.data.message);
        }
      });
    }
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`/api/images/${id}`)
      .catch((err) => {
        alert(err.response.data.message);
      })
      .then((res) => {
        if (res) {
          if (res.status === 200) {
            setImages((prev) => {
              return prev.filter((ob) => ob.id !== id);
            });
          }
        }
      });
  };
  const handleMain = (id: number) => {
    axios.put(`/api/images/${id}`).then((res) => {
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
      }
    });
  };

  return (
    <section className="images">
      <h3>Zdjęcia produktu</h3>
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
