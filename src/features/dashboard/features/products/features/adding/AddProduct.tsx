import "./styles/add-product.css";
import { useForm } from "react-hook-form";
import IProductForm from "./types/productForm";
import Button from "react-bootstrap/Button";
import { ChangeEvent, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  calculateBrutto,
  calculateNetto,
} from "../../../../../../utils/priceFunctions";
import { IBanner } from "../../../../../message-banner/types/IBanner";

const defaultProduct = {
  name: "",
  description: "",
  priceBrutto: 0.01,
  priceNetto: 0.01,
  maxQuantity: 1,
  youtubeURL: null,
  published: false,
  images: undefined,
};

interface IOutletContext {
  fetchData: () => void;
  addBanner: (banner: IBanner) => void;
}

const AddProduct = () => {
  const { register, reset, handleSubmit, setValue } = useForm<IProductForm>({
    defaultValues: defaultProduct,
  });
  const imagesContainerRef = useRef<HTMLDivElement>(null);
  const [productUpload, setProductUpload] = useState({ msg: "", done: false });
  const [imagesUpload, setImagesUpload] = useState({ msg: "", done: false });
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { fetchData, addBanner }: IOutletContext = useOutletContext();

  const handleBruttoChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue("priceNetto", calculateNetto(parseFloat(e.target.value)));
  };

  const handleNettoChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue("priceBrutto", calculateBrutto(parseFloat(e.target.value)));
  };

  const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const images = e.target.files;
    clearImagesWrapper();
    if (images) addImagesToWrapper(images);
  };

  const clearImagesWrapper = () => {
    const imagesWrapper = imagesContainerRef.current;
    if (imagesWrapper) {
      if (imagesWrapper.children.length > 0) {
        imagesWrapper.innerHTML = "";
      }
    }
  };

  const addImagesToWrapper = (images: FileList) => {
    const imagesWrapper = imagesContainerRef.current;
    if (imagesWrapper) {
      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          const image = images[i];
          const newImageElement = document.createElement("img");

          // Tworzenie adresu URL dla każdego obrazu
          const imageURL = URL.createObjectURL(image);
          newImageElement.src = imageURL;
          newImageElement.alt = "";

          // Dodawanie obrazu do kontenera
          imagesWrapper.appendChild(newImageElement);
        }
      }
    }
  };

  const clearForm = () => {
    reset();
    clearImagesWrapper();
  };

  const clearApiMessages = () => {
    setProductUpload({ msg: "", done: false });
    setImagesUpload({ msg: "", done: false });
  };

  const onSubmit = async (data: IProductForm) => {
    setLoading(true);
    const {
      name,
      description,
      published,
      priceNetto,
      priceBrutto,
      maxQuantity,
      youtubeURL,
      images,
    } = data;

    const product = {
      name,
      description,
      published,
      priceBrutto,
      priceNetto,
      maxQuantity,
      youtubeURL,
    };

    if (product.youtubeURL === "") product.youtubeURL = null;

    const formData = new FormData();

    for (let i = 0; i < images.length; i++) {
      formData.append("images[]", images[i]);
    }

    const resProduct = await axios.post("/api/products", product);
    if (resProduct.status === 201) {
      addBanner({
        message: `Dodano produkt.`,
        type: "success",
      });
      setProductUpload({ msg: resProduct.data.message, done: true });
      const productId = resProduct.data.product.id;
      const resImages = await axios.post(
        `/api/images/products/${productId}`,
        formData,
      );
      if (resImages.status === 201) {
        addBanner({
          message: `Dodano zdjęcia do produktu.`,
          type: "success",
        });
        setImagesUpload({ msg: resImages.data.message, done: true });
        fetchData();
      }
    }
    setLoading(false);
    clearForm();
  };

  return (
    <form
      className="add-product"
      onSubmit={handleSubmit(onSubmit)}
      onChange={() => clearApiMessages()}
    >
      <h1>Dodawanie produktu</h1>

      <div className="field">
        <label
          htmlFor="name"
          title="Nazwa produktu wyświetlana na jego miniaturce podczas przeglądania produktów."
        >
          Nazwa produktu*
        </label>
        <input type="text" {...register("name", { required: true })} />
      </div>

      <div className="field">
        <label
          htmlFor="description"
          title="Opis produktu widoczny w szczegółach produktu."
        >
          Opis produktu*
        </label>
        <textarea {...register("description", { required: true })} />
      </div>

      <div className="field">
        <label
          htmlFor="priceBrutto"
          title="Cena produktu z uwzględnieniem VAT. Wpisz to pole, a cena netto obliczy się sama."
        >
          Cena Brutto*
        </label>
        <input
          type="number"
          min={0.01}
          step={0.01}
          {...register("priceBrutto", {
            required: true,
            valueAsNumber: true,
            onChange: handleBruttoChange,
          })}
        />
      </div>

      <div className="field">
        <label
          htmlFor="youtubeURL-id"
          title="Adres URL filmiku z youtube. Wskazówki: https://www.youtube.com/embed/6R9L0Z-NsJ8 (Musi zawierać 'embed/' zamiast 'watch?v=')"
        >
          Adres youtube
        </label>
        <input
          type="text"
          id="youtubeURL-id"
          placeholder="https://www.youtube.com/embed/6R9L0Z-NsJ8 (Musi zawierać 'embed/' zamiast 'watch?v=')"
          {...register("youtubeURL")}
        />
      </div>

      <div className="field">
        <label
          htmlFor="priceNetto"
          title="Cena produktu nie uwzględniająca podatku VAT. Wpisz to pole, a cena brutto obliczy się sama."
        >
          Cena Netto*
        </label>
        <input
          type="number"
          min={0.01}
          step={0.01}
          {...register("priceNetto", {
            required: true,
            valueAsNumber: true,
            onChange: handleNettoChange,
          })}
        />
      </div>

      <div className="field">
        <label
          htmlFor="maxQuantity"
          title="Ilość produktów przeznaczona do sprzedaży. Minimalna wartość to 1."
        >
          Ilość*
        </label>
        <input
          type="number"
          min={0}
          {...register("maxQuantity", {
            required: true,
            valueAsNumber: true,
          })}
        />
      </div>

      <div className="field">
        <label
          htmlFor="images"
          title="Dodaj od razu zdjęcia produktu.
          Prerefowane formaty zdjęcia to jpg, png. 
          Najlepiej gdyby zdjęcie było w skali 1:1.
          Protip: Pierwsze wybrane zdjęcie będzie zdjęciem głównym produktu, możesz to potem zmienić."
        >
          Zdjęcia produktu*
        </label>
        <input
          type="file"
          multiple
          accept=".jpg, .png"
          {...register("images", {
            onChange: handleImagesChange,
            required: true,
          })}
        />
      </div>

      <div className="images" ref={imagesContainerRef}></div>

      <div className="field publication">
        <input type="checkbox" {...register("published")} />
        <label
          htmlFor="published"
          title="Zaznacz, jeśli chcesz żeby ten produkt został od rozu opublikowany."
        >
          Publikacja
        </label>
      </div>

      <div className="actions">
        <Button variant="dark" onClick={() => navigate("/dashboard/products")}>
          Wróć do produktów
        </Button>
        <Button type="submit" variant="dark" disabled={loading}>
          Dodaj produkt
        </Button>
      </div>
      {productUpload.done && (
        <span className="api_message">{productUpload.msg}</span>
      )}
      {imagesUpload.done && (
        <span className="api_message">{imagesUpload.msg}</span>
      )}
      <span>
        ? - Najedź na kategorię nad polem aby wyświetlić dodatkowe informacje.
      </span>
      <span>* - Pole jest wymagane.</span>
    </form>
  );
};

export default AddProduct;
