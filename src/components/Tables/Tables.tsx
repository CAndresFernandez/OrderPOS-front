import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ITable } from "../../@types/order";
import { fetchTablesThunk } from "../../store/middlewares/tables";
import LoggedAs from "../LoggedAs/LoggedAs";
import Table from "../Table/Table";
import "./Tables.scss";

function Tables() {
  const dispatch = useAppDispatch();
  const tables: ITable[] = useAppSelector((state) => state.tables.list);
  useEffect(() => {
    // APRES le premier chargement de l'app on veut aller chercher les tables
    // App va dispatcher une action vers le thunk middleware qui s'occupe de l'appel API
    dispatch(fetchTablesThunk());
  }, [dispatch]);

  return (
    <>
      <header>
        <LoggedAs />
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
