import "./styles/add-product.css";
import { useForm } from "react-hook-form";
import Product from "./types/product";
import Button from "react-bootstrap/Button";
import { ChangeEvent, useRef } from "react";

const defaultProduct = {
  name: "",
  description: "",
  priceBrutto: 0.01,
  priceNetto: 0.01,
  maxQuantity: 1,
  published: false,
  images: undefined,
};

const AddProduct = () => {
  const { register, handleSubmit, watch, setValue } = useForm<Product>({
    defaultValues: defaultProduct,
  });
  const imagesContainerRef = useRef<HTMLDivElement>(null);

  const handleBruttoChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const brutto = parseFloat(e.target.value);
    const netto = Number((brutto / 1.23).toFixed(2));
    setValue("priceNetto", netto);
  };

  const handleNettoChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const netto = parseFloat(e.target.value);
    const brutto = netto + Number((netto * 0.23).toFixed(2));
    setValue("priceBrutto", brutto);
  };

  const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const images = e.target.files;
    if (images && images.length > 0) {
      const imagesWrapper = imagesContainerRef.current;
      if (imagesWrapper) {
        for (let i = 0; i < images.length; i++) {
          const image = images[i];
          const newImageElement = document.createElement("img");

          // Tworzenie adresu URL dla każdego obrazu
          const imageURL = URL.createObjectURL(image);
          newImageElement.src = imageURL;

          // Dodawanie obrazu do kontenera
          imagesWrapper.appendChild(newImageElement);
        }
      }
    }
  };

  const onSubmit = (data: Product) => {
    console.log(data);
  };

  return (
    <form className="add-product" onSubmit={handleSubmit(onSubmit)}>
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
            onChange: handleBruttoChange,
          })}
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
          min={1}
          {...register("maxQuantity", { required: true })}
        />
      </div>

      <div className="field">
        <label
          htmlFor="images"
          title="Jeśli chcesz, dodaj od razu zdjęcia produktu. Prerefowane formaty zdjęcia to jpg, png. Najlepiej gdyby zdjęcie było w skali 1:1."
        >
          Zdjęcia produktu
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

      <div className="field">
        <input type="checkbox" {...register("published")} />
        <label
          htmlFor="published"
          title="Zaznacz, jeśli chcesz żeby ten produkt został od rozu opublikowany."
        >
          Publikacja
        </label>
      </div>
      <Button type="submit" variant="dark">
        Dodaj produkt
      </Button>
      <p>* - Pole jest wymagane.</p>
    </form>
  );
};

export default AddProduct;
