import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import NavigationPanel from "./components/navigation-panel/NavigationPanel";
import HeadPanel from "./components/head-panel/HeadPanel";
import Pagination from "./types/pagination";
import PaginationPanel from "./components/pagination-panel/PaginationPanel";
import { IItems } from "./types/items";

import "./styles/dashboard-layout.css";
import "./styles/inputs.css";
import IProductForm from "./features/products/features/manage/features/modifying/types/productForm";
import { IOrder } from "./types/IOrder";

const DashboardLayout = () => {
  const [tableName, setTableName] = useState<string | undefined>();
  const [items, setItems] = useState<IItems>({
    count: 0,
    rows: [],
  });
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    maxPage: 1,
    perPage: 10,
  });
  const [order, setOrder] = useState<IOrder>({ by: "id", direction: "DESC" });
  const [loading, setLoading] = useState<boolean>(true);

  const updateOrder = (by: string, direction: string) => {
    setOrder({
      by: by,
      direction: direction,
    });
  };

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

  const updateItem = (id: number, data: IProductForm) => {
    setItems((prevState) => {
      return {
        ...prevState,
        rows: prevState.rows.map((item) => {
          if (item.id === id) {
            return { ...item, ...data };
          }
          return item;
        }),
      };
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

  const fetchData = () => {
    if (tableName) {
      setLoading(true);
      axios
        .get(
          `/api/${tableName}?page=${pagination.page}&perPage=${pagination.perPage}&by=${order.by}&direction=${order.direction}`,
        )
        .then((res) => {
          if (res?.data?.success) {
            setItems(res.data.items);
          }
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    tableName,
    pagination.page,
    pagination.perPage,
    order.by,
    order.direction,
  ]);

  return (
    <div className="dashboard-layout">
      <HeadPanel />
      <NavigationPanel
        setItems={setItems}
        loading={loading}
        tableName={tableName}
      />
      <section className="dashboard-content">
        <Outlet
          context={{
            tableName,
            items,
            loading,
            order,
            setTableName,
            fetchData,
            updateItem,
            updateOrder,
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
