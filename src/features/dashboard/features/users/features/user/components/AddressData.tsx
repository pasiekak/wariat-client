import SingleDBProperty from "../../../../../../single-db-property/SingleDBProperty";
import { useParams } from "react-router-dom";

const AddressData = () => {
  const { userID } = useParams();
  if (userID) {
    return (
      <>
        <h2>Dane dotyczące adresu użytkownika</h2>
        <SingleDBProperty
          getURL={`/api/addresses/users/${parseInt(userID)}?attribute=country`}
          putURL={`/api/addresses/users/${parseInt(userID)}`}
          labelText={"Kraj:"}
          modifiable={true}
          attributeName={"country"}
          input={"text"}
        />
        <SingleDBProperty
          getURL={`/api/addresses/users/${parseInt(userID)}?attribute=city`}
          putURL={`/api/addresses/users/${parseInt(userID)}`}
          labelText={"Miasto:"}
          modifiable={true}
          attributeName={"city"}
          input={"text"}
        />
        <SingleDBProperty
          getURL={`/api/addresses/users/${parseInt(userID)}?attribute=street`}
          putURL={`/api/addresses/users/${parseInt(userID)}`}
          labelText={"Ulica:"}
          modifiable={true}
          attributeName={"street"}
          input={"text"}
        />
        <SingleDBProperty
          getURL={`/api/addresses/users/${parseInt(userID)}?attribute=homeNumber`}
          putURL={`/api/addresses/users/${parseInt(userID)}`}
          labelText={"Numer domu:"}
          modifiable={true}
          attributeName={"homeNumber"}
          input={"number"}
        />
        <SingleDBProperty
          getURL={`/api/addresses/users/${parseInt(userID)}?attribute=postalCode`}
          putURL={`/api/addresses/users/${parseInt(userID)}`}
          labelText={"Kod pocztowy:"}
          modifiable={true}
          attributeName={"postalCode"}
          input={"text"}
        />
      </>
    );
  }
  return null;
};

export default AddressData;
