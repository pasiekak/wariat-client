import { IPersonalData } from "../../../../../api/types/IPersonalData";
import usePersonalData from "../../../../../api/hooks/personal-data/usePersonalData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

type axiosResponse = {
  data: null | {
    success: boolean;
    message: string;
    personalData: IPersonalData;
  };
  error: string;
  loading: boolean;
};
const emptyValues = [null, undefined, ""];

const UserPersonalData = ({ id }: { id: number }) => {
  const { data, loading }: axiosResponse = usePersonalData({
    userID: id,
  });

  return (
    <>
      <div className="property first-name animated-underline">
        <span>
          {loading
            ? "..."
            : data && !emptyValues.includes(data?.personalData?.firstName)
              ? data?.personalData?.firstName
              : "Brak imienia."}
        </span>
      </div>
      <div className="property last-name animated-underline">
        <span>
          {loading
            ? "..."
            : data && !emptyValues.includes(data?.personalData?.lastName)
              ? data?.personalData?.lastName
              : "Brak nazwiska."}
        </span>
      </div>
      <div className="property phone animated-underline">
        <FontAwesomeIcon icon={faPhone} />
        <span>
          {loading
            ? "..."
            : data && !emptyValues.includes(data?.personalData?.phone)
              ? data.personalData.phone
              : "Brak numeru telefonu."}
        </span>
      </div>
    </>
  );
};

export default UserPersonalData;
