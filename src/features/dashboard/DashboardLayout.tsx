import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import NavigationPanel from "./components/navigation-panel/NavigationPanel";
import HeadPanel from "./components/head-panel/HeadPanel";
import Pagination from "./types/pagination";
import PaginationPanel from "./components/pagination-panel/PaginationPanel";
import Items from "./types/items";

import "./styles/dashboard-layout.css";
import "./styles/inputs.css";

const DashboardLayout = () => {
  const [tableName, setTableName] = useState<string | undefined>();
  const [items, setItems] = useState<Items>({ count: 0, rows: [] });
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    maxPage: 1,
    perPage: 10,
  });
  const [loading, setLoading] = useState<boolean>(true);

  const incPage = () => {
    setPagination((prevState) => {
      if (prevState.page < prevState.maxPage) {
        return {
          ...prevState,
          page: prevState.page + 1,
        };
      } else {
        return prevState;
      }
    });
  };
  const decPage = () => {
    setPagination((prevState) => {
      if (prevState.page > 1) {
        return {
          ...prevState,
          page: prevState.page - 1,
        };
      } else {
        return prevState;
      }
    });
  };

  const setNumberOfItemsDisplayed = (numberOfItemsDisplayed: number) => {
    setPagination((prevState) => {
      return {
        ...prevState,
        perPage: numberOfItemsDisplayed,
      };
    });
  };

  useEffect(() => {
    if (tableName && items.count > 0) {
      setPagination((prevState) => {
        return {
          ...prevState,
          maxPage: Math.ceil(items.count / prevState.perPage),
        };
      });
    }
  }, [tableName, items.count, pagination.perPage]);

  useEffect(() => {
    if (tableName) {
      setLoading(true);
      axios
        .get(
          `/api/${tableName}?page=${pagination.page}&perPage=${pagination.perPage}`,
        )
        .then((res) => {
          if (res.data.success) {
            setItems(res.data.items);
            setLoading(false);
          }
        });
    }
  }, [tableName, pagination.page, pagination.perPage]);

  return (
    <div className="dashboard-layout">
      <HeadPanel />
      <NavigationPanel />
      <section className="dashboard-content">
        <Outlet
          context={{
            tableName,
            setTableName,
            items,
            loading,
          }}
        />

        <PaginationPanel
          itemsCount={items.count}
          page={pagination.page}
          perPage={pagination.perPage}
          maxPage={pagination.maxPage}
          incPage={incPage}
          decPage={decPage}
          setNumberOfItemsDisplayed={setNumberOfItemsDisplayed}
        />
      </section>
    </div>
  );
};

export default DashboardLayout;
