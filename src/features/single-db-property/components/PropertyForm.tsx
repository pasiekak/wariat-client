import { useForm } from "react-hook-form";
import { singleAttribute } from "../../../api/types/singleAttribute";
import Button from "react-bootstrap/Button";
import axios from "axios";
import CustomInput from "./CustomInput";

type propertyFormProps = {
  input: string;
  attributeName: string;
  value: singleAttribute | undefined;
  hideForm: () => void;
  putURL: string;
  updateValue: (value: string) => void;
};

const PropertyForm = ({
  input,
  attributeName,
  value,
  hideForm,
  putURL,
  updateValue,
}: propertyFormProps) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      [attributeName]: value,
    },
  });

  const onSubmit = (data: any) => {
    axios.put(putURL, data).then((res) => {
      if (res.status === 200 && res.data[0] === 1) {
        updateValue(data[attributeName]);
        hideForm();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Button variant="dark" onClick={() => hideForm()}>
        Wróć
      </Button>
      <CustomInput
        type={input}
        register={register}
        attributeName={attributeName}
      />
      <Button variant="dark" type="submit">
        Zatwierdź
      </Button>
    </form>
  );
};

export default PropertyForm;
