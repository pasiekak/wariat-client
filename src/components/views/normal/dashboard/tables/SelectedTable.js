import { useCallback, useEffect, useMemo, useState } from 'react';

import ModelActions from "../../../../../api/ModelActions";

import UserTable from './model-tables/UserTable';

const SelectedTable = ({tableName}) => {
  const [data, setData] = useState(null);
  const modelActioner = useMemo(() => new ModelActions(tableName),[tableName]);

  const fetchTableData = useCallback(async () => {
      let res = await modelActioner.getAll();
      if (res.success) {
        setData(res.body);
      }
    }, [modelActioner]);

  useEffect(() => {
    fetchTableData();
  }, [fetchTableData]);

  let componentToRender;

  if (tableName === 'users') {
    componentToRender = <UserTable data={data} />;
  }
  
  return (
      <div className="SelectedTable">
          {(tableName && data) && componentToRender}
      </div>
  )
}

export default SelectedTable;