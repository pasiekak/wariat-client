import { Outlet } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
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
import TableInfo from "./components/table-info/TableInfo";
import BannerPortal from "../message-banner/BannerPortal";
import { IBannerPortalForwardedFunctions } from "../message-banner/types/IBannerPortalForwardedFunctions";
import { IBanner } from "../message-banner/types/IBanner";

const fetchableTables = ["products", "users", "events"];
const DashboardLayout = () => {
  const portalRef = useRef<IBannerPortalForwardedFunctions>(null);
  const [tableName, setTableName] = useState<string | undefined>();
  const [items, setItems] = useState<IItems>({
    count: 0,
    rows: [],
  });
  const [pagination, setPagination] = useState<Pagination>({
    use: true,
    page: 1,
    maxPage: 1,
    perPage: 20,
  });
  const [order, setOrder] = useState<IOrder>({ by: "id", direction: "DESC" });
  const [loading, setLoading] = useState<boolean>(false);

  const addBanner = (banner: IBanner) => {
    if (portalRef.current) portalRef.current.addBanner(banner);
  };

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

  const setUsePagination = (use: boolean) => {
    setPagination((p) => {
      return { ...p, use: use };
    });
  };

  const fetchData = useCallback(() => {
    if (tableName) {
      setLoading(true);
      const URL = pagination.use
        ? `/api/${tableName}?page=${pagination.page}&perPage=${pagination.perPage}&by=${order.by}&direction=${order.direction}`
        : `/api/${tableName}`;
      axios
        .get(URL)
        .then((res) => {
          if (res?.data?.success) {
            setItems(res.data.items);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [
    tableName,
    pagination.page,
    pagination.perPage,
    pagination.use,
    order.by,
    order.direction,
  ]);

  useEffect(() => {
    if (tableName && items.count > 0) {
      setPagination((prevState) => {
        return {
          ...prevState,
          maxPage: Math.ceil(items.count / prevState.perPage),
        };
      });
    }
  }, [tableName, items.count, pagination.perPage, fetchData]);

  useEffect(() => {
    if (tableName && fetchableTables.includes(tableName)) {
      fetchData();
    }
  }, [fetchData, tableName]);

  return (
    <div className="dashboard-layout">
      <HeadPanel />
      <NavigationPanel
        setUsePagination={setUsePagination}
        setItems={setItems}
        loading={loading}
        tableName={tableName}
      />
      <section className="dashboard-content">
        {tableName && <TableInfo tableName={tableName} count={items.count} />}
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
            addBanner,
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
        <BannerPortal ref={portalRef} autoClose={true} autoCloseTime={5000} />
      </section>
    </div>
  );
};

export default DashboardLayout;
