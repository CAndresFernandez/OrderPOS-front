import { useAppSelector } from "../../hooks/redux";
import LoggedAs from "../LoggedAs/LoggedAs";
import Table from "../Table/Table";
import "./Tables.scss";

function Tables() {
  const tables = useAppSelector((state) => state.tables.list);
  //console.log(tables);

  return (
    <>
      <header>
        <LoggedAs />
        <h2>Tables</h2>
      </header>
      <ul>
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
