import SingleDBProperty from "../../../../../../single-db-property/SingleDBProperty";
import { useParams } from "react-router-dom";
import DiscountGroup from "../features/manage-discount-group/DiscountGroup";

const AccountData = () => {
  const { userID } = useParams();
  if (userID) {
    return (
      <>
        <h2>Dane konta</h2>
        <SingleDBProperty
          getURL={`/api/users/${parseInt(userID)}?attribute=id`}
          attributeName={"id"}
          labelText={"Identyfikator użytkownika:"}
        />
        <SingleDBProperty
          getURL={`/api/users/${parseInt(userID)}/role`}
          attributeName={"role"}
          labelText={"Rola użytkownika w systemie:"}
        />

        <SingleDBProperty
          getURL={`/api/users/${parseInt(userID)}?attribute=username`}
          putURL={`/api/users/${parseInt(userID)}`}
          labelText={"Nazwa użytkownika:"}
          modifiable={true}
          attributeName={"username"}
          input={"text"}
        />
        <SingleDBProperty
          getURL={`/api/users/${parseInt(userID)}?attribute=email`}
          putURL={`/api/users/${parseInt(userID)}`}
          labelText={"Email:"}
          modifiable={true}
          attributeName={"email"}
          input={"text"}
        />
        <DiscountGroup userID={parseInt(userID)} />
      </>
    );
  }
  return null;
};

export default AccountData;
