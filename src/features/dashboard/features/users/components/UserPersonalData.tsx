import { IPersonalData } from "../../../../../api/types/IPersonalData";
import usePersonalData from "../../../../../api/hooks/usePersonalData";

type axiosResponse = {
  data: null | {
    success: boolean;
    message: string;
    personalData: IPersonalData;
  };
  error: string;
  loading: boolean;
};
const UserPersonalData = ({ id }: { id: number }) => {
  const { data, error, loading }: axiosResponse = usePersonalData({
    userID: id,
  });

  if (!loading && data) {
    return <div>{data.personalData.firstName}</div>;
  }
  return null;
};

export default UserPersonalData;
