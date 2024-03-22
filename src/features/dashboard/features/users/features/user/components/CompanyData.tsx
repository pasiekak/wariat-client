import { useParams } from "react-router-dom";
import SingleDBProperty from "../../../../../../single-db-property/SingleDBProperty";

const CompanyData = () => {
  const { userID } = useParams();
  if (userID) {
    return (
      <>
        <h2>Dane firmy</h2>
        <SingleDBProperty
          getURL={`/api/companyData/users/${parseInt(userID)}?attribute=nip`}
          putURL={`/api/companyData/users/${parseInt(userID)}`}
          labelText={"NIP firmy:"}
          modifiable={true}
          attributeName={"nip"}
          input={"text"}
        />
        <SingleDBProperty
          getURL={`/api/companyData/users/${parseInt(userID)}?attribute=companyName`}
          putURL={`/api/companyData/users/${parseInt(userID)}`}
          labelText={"Nazwa firmy:"}
          modifiable={true}
          attributeName={"companyName"}
          input={"text"}
        />
        <SingleDBProperty
          getURL={`/api/companyData/users/${parseInt(userID)}?attribute=city`}
          putURL={`/api/companyData/users/${parseInt(userID)}`}
          labelText={"Miasto siedziby firmy:"}
          modifiable={true}
          attributeName={"city"}
          input={"text"}
        />
        <SingleDBProperty
          getURL={`/api/companyData/users/${parseInt(userID)}?attribute=street`}
          putURL={`/api/companyData/users/${parseInt(userID)}`}
          labelText={"Ulica:"}
          modifiable={true}
          attributeName={"street"}
          input={"text"}
        />
        <SingleDBProperty
          getURL={`/api/companyData/users/${parseInt(userID)}?attribute=buildingNumber`}
          putURL={`/api/companyData/users/${parseInt(userID)}`}
          labelText={"Numer budynku:"}
          modifiable={true}
          attributeName={"buildingNumber"}
          input={"number"}
        />
        <SingleDBProperty
          getURL={`/api/companyData/users/${parseInt(userID)}?attribute=postalCode`}
          putURL={`/api/companyData/users/${parseInt(userID)}`}
          labelText={"Kod pocztowy:"}
          modifiable={true}
          attributeName={"postalCode"}
          input={"text"}
        />
        <SingleDBProperty
          getURL={`/api/companyData/users/${parseInt(userID)}?attribute=country`}
          putURL={`/api/companyData/users/${parseInt(userID)}`}
          labelText={"Kraj:"}
          modifiable={true}
          attributeName={"country"}
          input={"text"}
        />
      </>
    );
  }
  return null;
};

export default CompanyData;
