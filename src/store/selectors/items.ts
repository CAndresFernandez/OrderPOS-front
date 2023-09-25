import { IItem } from "../../@types/order";

/**
 * prend en parmaètre le tableau des recettes, le slug cherché
 * renvoie la recette correspondante au slug
 */
export default function findItem(items: IItem[], itemId = 1) {
  const item = items.find((testedItem) => {
    return testedItem.id === itemId;
  });
  return item;
}
