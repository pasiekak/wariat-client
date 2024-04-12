import useImagesRelatedToEntity from "../../api/hooks/images/useImagesRelatedToEntity";
import { useEffect, useState } from "react";
import IImage from "../dashboard/features/images/types/IImage";

import "./styles/image-carousel.css";
import "./styles/miniatures.css";

import Moves from "./components/Moves";
import { useMediaQuery } from "react-responsive";
import Miniatures from "./components/Miniatures";

type ImageCarouselProps = {
  entityID: number;
  entityPlural: "products" | "events";
  showMiniatures?: boolean;
  handleBigScreen?: boolean;
};

const ImageCarousel = ({
  entityID,
  entityPlural,
  showMiniatures = false,
  handleBigScreen = false,
}: ImageCarouselProps) => {
  const [images, setImages] = useState<IImage[]>([]);
  const { data } = useImagesRelatedToEntity({
    id: entityID,
    entityPlural: entityPlural,
  });
  const [selectedImage, setSelectedImage] = useState<number>();
  const bigScreen = useMediaQuery({ minWidth: 1200 });

  const renderMiniatures = () => {
    if (bigScreen && handleBigScreen) {
      const halfLength = Math.ceil(images.length / 2);
      const firstHalf = images.slice(0, halfLength);
      const secondHalf = images.slice(halfLength, images.length);

      return (
        <>
          <Miniatures
            images={firstHalf}
            onClick={(id: number) => setSelectedImage(id)}
          />
          <Miniatures
            images={secondHalf}
            onClick={(id: number) => setSelectedImage(id)}
          />
        </>
      );
    } else {
      return (
        <Miniatures
          images={images}
          onClick={(id: number) => setSelectedImage(id)}
        />
      );
    }
  };
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
      {images.length >= 1 && selectedImage && (
        <>
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
          {showMiniatures && images.length > 1 && renderMiniatures()}
        </>
      )}
    </>
  );
};

export default ImageCarousel;
