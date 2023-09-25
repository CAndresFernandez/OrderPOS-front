import { useAppSelector } from "../../hooks/redux";
import LoggedAs from "../LoggedAs/LoggedAs";
import Table from "../Table/Table";
import { ITable } from "../../@types/order";
import "./Tables.scss";

function Tables() {
  const tables: ITable[] = useAppSelector((state) => state.tables.list);
  console.log(tables);

  return (
    <>
      <header>
        <LoggedAs />
        <h2>Tables</h2>
      </header>
      <ul>
        {tables.map((table, number) => (
          <li key={number}>
            <Table table={table} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default Tables;
