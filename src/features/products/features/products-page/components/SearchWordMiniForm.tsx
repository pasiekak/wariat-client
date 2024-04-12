import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";

type searchWordMiniFormProps = {
  searchWord: string;
  changeFn: (searchWord: string) => void;
  disabled: boolean;
  withTitle: boolean;
};
const SearchWordMiniForm = (props: searchWordMiniFormProps) => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.products.search",
  });
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: { searchWord: props.searchWord },
  });

  useEffect(() => {
    setValue("searchWord", props.searchWord);
  }, [props.searchWord, setValue]);

  const onSubmit = (data: { searchWord: string }) => {
    props.changeFn(data.searchWord);
  };

  return (
    <form className="search-word-mini-form" onSubmit={handleSubmit(onSubmit)}>
      {props.withTitle && (
        <label htmlFor="searchWord">{t("search-word-mini-form-title")}</label>
      )}
      <input
        type="text"
        id="searchWord"
        placeholder={t("search-word-mini-form-placeholder") || ""}
        {...register("searchWord")}
      />
      <Button variant="dark" type="submit" disabled={props.disabled}>
        {t("search-button")}
      </Button>
    </form>
  );
};

export default SearchWordMiniForm;
