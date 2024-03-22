import SingleDBProperty from "../../../../../../single-db-property/SingleDBProperty";
import { useParams } from "react-router-dom";

const PersonalData = () => {
  const { userID } = useParams();
  if (userID) {
    return (
      <>
        <h2>Dane personalne</h2>
        <SingleDBProperty
          getURL={`/api/personalData/users/${parseInt(userID)}?attribute=firstName`}
          putURL={`/api/personalData/users/${parseInt(userID)}`}
          labelText={"Imię użytkownika:"}
          modifiable={true}
          attributeName={"firstName"}
          input={"text"}
        />
        <SingleDBProperty
          getURL={`/api/personalData/users/${parseInt(userID)}?attribute=lastName`}
          putURL={`/api/personalData/users/${parseInt(userID)}`}
          labelText={"Nazwisko użytkownika:"}
          modifiable={true}
          attributeName={"lastName"}
          input={"text"}
        />
        <SingleDBProperty
          getURL={`/api/personalData/users/${parseInt(userID)}?attribute=phone`}
          putURL={`/api/personalData/users/${parseInt(userID)}`}
          labelText={"Numer telefonu:"}
          modifiable={true}
          attributeName={"phone"}
          input={"text"}
        />
      </>
    );
  }
  return null;
};

export default PersonalData;
