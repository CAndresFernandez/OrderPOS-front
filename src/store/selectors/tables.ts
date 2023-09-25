import { ITable } from "../../@types/order";

/**
 * prend en parmaètre le tableau des recettes, le slug cherché
 * renvoie la recette correspondante au slug
 */
export default function findTable(tables: ITable[], tableId = 1) {
  const table = tables.find((testedTable) => {
    return testedTable.id === tableId;
  });
  return table;
}
