import useImagesRelatedToEntity from "../../api/hooks/images/useImagesRelatedToEntity";
import { useEffect, useState } from "react";
import IImage from "../dashboard/features/images/types/IImage";

import "./styles/image-carousel.css";
import Moves from "./components/Moves";

type ImageCarouselProps = {
  entityID: number;
  entityPlural: "products" | "events";
};

const ImageCarousel = ({ entityID, entityPlural }: ImageCarouselProps) => {
  const [images, setImages] = useState<IImage[]>([]);
  const { data, loading, error } = useImagesRelatedToEntity({
    id: entityID,
    entityPlural: entityPlural,
  });
  const [selectedImage, setSelectedImage] = useState<number>();

  const handleMove = (type: string) => {
    if (selectedImage && images) {
      const actualImage = images.find((im) => im.id === selectedImage);
      if (actualImage) {
        const previousImage = images[images.indexOf(actualImage) - 1];
        const nextImage = images[images.indexOf(actualImage) + 1];
        if (type === "next" && nextImage) {
          setSelectedImage(nextImage.id);
        } else if (type === "previous" && previousImage) {
          setSelectedImage(previousImage.id);
        }
      }
    }
  };

  useEffect(() => {
    if (data?.images) {
      setImages(data.images);
      setSelectedImage(
        data.images.find((o) => o.main)?.id || data.images[0].id,
      );
    }
  }, [data]);

  return (
    <>
      {loading && <h2>Ładowanie</h2>}
      {error && <h2>Błąd</h2>}
      {images && selectedImage && (
        <div className="image-carousel">
          <div
            className="background-image-wrapper"
            style={{
              backgroundImage: `url('/api/images/${selectedImage}')`,
            }}
          ></div>
          <div
            className="image-wrapper"
            style={{
              backgroundImage: `url('/api/images/${selectedImage}')`,
            }}
          ></div>
          <Moves
            handleMove={handleMove}
            leftDisabled={selectedImage === images[0].id}
            rightDisabled={selectedImage === images[images.length - 1].id}
          />
        </div>
      )}
    </>
  );
};

export default ImageCarousel;
