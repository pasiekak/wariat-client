import useDiscountGroup from "../../../../../../api/hooks/discounts/useDiscountGroup";
import { useEffect, useState } from "react";
import { IDiscountGroup } from "../../../../../../api/types/IDiscountGroup";
import SingleDiscountGroup from "./components/SingleDiscountGroup";
import Columns from "./components/Columns";

import "./styles/group-discounts.css";
import axios from "axios";
import AddDiscountGroupForm from "./features/add/AddDiscountGroupForm";
import { useOutletContext } from "react-router-dom";
import { IBanner } from "../../../../../message-banner/types/IBanner";

const GroupDiscounts = () => {
  const { data, loading, error } = useDiscountGroup();
  const { addBanner } = useOutletContext<{
    addBanner: (banner: IBanner) => void;
  }>();
  const [groups, setGroups] = useState<IDiscountGroup[] | null>(null);
  const [lastGroup, setLastGroup] = useState<IDiscountGroup | null>(null);

  useEffect(() => {
    if (data?.discountGroups !== undefined) {
      setGroups(data.discountGroups);
      setLastGroup(data.discountGroups[data.discountGroups.length - 1]);
    }
  }, [data]);

  const updateGroupPercentage = (newGroup: IDiscountGroup) => {
    setGroups((prev) => {
      if (prev) {
        const newGroups = prev.map((group) => {
          if (group.id === newGroup.id)
            return {
              ...group,
              percentage: newGroup.percentage,
              limit: newGroup.limit,
            };
          return group;
        });
        setLastGroup(newGroups[newGroups.length - 1]);

        return newGroups;
      }
      return prev;
    });
    addBanner({
      message: "Pomyślnie zmodyfikowano grupę zniżkową.",
      type: "success",
    });
  };

  const deleteGroup = (discountGroupID: number) => {
    axios.delete(`/api/discountGroups/${discountGroupID}`).then((res) => {
      if (res.status === 204) {
        setGroups((prevState) => {
          if (prevState) {
            const newGroups = prevState.filter(
              (group) => group.id !== discountGroupID,
            );
            setLastGroup(newGroups[newGroups.length - 1]);
            return newGroups;
          }
          return prevState;
        });
        addBanner({
          message: "Pomyślnie usunięto grupę zniżkową.",
          type: "success",
        });
      }
    });
  };

  const addGroup = (newGroup: IDiscountGroup): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      axios
        .post("/api/discountGroups", newGroup)
        .then((res) => {
          if (res.status === 201) {
            setGroups((prevState) => {
              if (prevState) return [...prevState, newGroup];
              return prevState;
            });
            setLastGroup(newGroup);
            addBanner({
              message: "Pomyślnie dodano grupę zniżkową.",
              type: "success",
            });
          }
          resolve(true);
        })
        .catch((error) => {
          resolve(false);
        });
    });
  };

  return (
    <div className="group-discounts discounts-content">
      <h1>Grupy zniżkowe</h1>

      {loading && <h2>Ładowanie</h2>}
      {error && <h2>Wystąpił błąd.</h2>}
      {!loading && groups && (
        <>
          <Columns />
          {groups.map((group, index) => (
            <SingleDiscountGroup
              key={group.id}
              group={group}
              previousGroup={index > 0 ? groups[index - 1] : null}
              nextGroup={index < groups.length - 1 ? groups[index + 1] : null}
              updateGroupPercentage={updateGroupPercentage}
              deleteGroup={deleteGroup}
            />
          ))}
          {lastGroup && (
            <AddDiscountGroupForm
              lastDiscountGroup={lastGroup}
              addGroup={addGroup}
            />
          )}

          <ul>
            <li>
              Ostrożnie zarządzaj zniżkami. Usuwanie zniżek grupowych wiąże się
              ze zmianami z ustawień tych zniżek dla kont użytkowników.
            </li>
            <li>
              Usuwając zniżkę, którą już posiada użytkownik ustawia jego nową
              zniżkę grupową na 0%. Ostrożnie zarządzaj zniżkami
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default GroupDiscounts;
