import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ITable } from "../../@types/order";
import { fetchTablesThunk } from "../../store/middlewares/tables";
import LoggedAs from "../LoggedAs/LoggedAs";
import Table from "../Table/Table";
import "./Tables.scss";

function Tables() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const tables: ITable[] = useAppSelector((state) => state.tables.list);
  useEffect(() => {
    dispatch(fetchTablesThunk());
  }, []);

  return (
    <>
      <header>
        <LoggedAs />
        <button
          type="button"
          className="NavBtnBack kitchenVue"
          onClick={() => navigate("/kitchen")}
        >
          kitchen vue
        </button>
        <button
          type="button"
          className="NavBtnBack carte"
          onClick={() => navigate("/carte")}
        >
          La Carte
        </button>
        <h2>Tables</h2>
      </header>
      <ul className="tables-list">
        {tables.map((table) => (
          <li key={table.id}>
            <Table table={table} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default Tables;
