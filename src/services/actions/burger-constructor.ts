import { TConstructorIngredient, TIngredient } from "../types/data";
export const BURGER_CONSTRUCTOR_ADD_BUN: "ADD_BUN" = "ADD_BUN";
export const BURGER_CONSTRUCTOR_ADD_ITEM: "ADD_ITEM" = "ADD_ITEM";
export const BURGER_CONSTRUCTOR_DELETE_ITEM: "DELETE_ITEM" = "DELETE_ITEM";
export const BURGER_CONSTRUCTOR_RESET_ITEM: "RESET_ITEM" = "RESET_ITEM";
export const BURGER_CONSTRUCTOR_MOVE_ITEM: "MOVE_ITEM" = "MOVE_ITEM";

export interface IConstructorDeleteItem {
  readonly type: typeof BURGER_CONSTRUCTOR_DELETE_ITEM;
  readonly id: string;
}

export interface IConstructorAddBun {
  readonly type: typeof BURGER_CONSTRUCTOR_ADD_BUN;
  readonly data: TIngredient;
}

export interface IConstructorAddItem {
  readonly type: typeof BURGER_CONSTRUCTOR_ADD_ITEM;
  readonly data: TConstructorIngredient;
}

export interface IConstructorResetItem {
  readonly type: typeof BURGER_CONSTRUCTOR_RESET_ITEM;
}

export interface IConstructorMoveItem {
  readonly type: typeof BURGER_CONSTRUCTOR_MOVE_ITEM;
  readonly data: {
    dragIndex: number;
    hoverIndex: number;
  }
}

export type TConstructorActions =
  | IConstructorDeleteItem
  | IConstructorAddBun
  | IConstructorAddItem
  | IConstructorResetItem
  | IConstructorMoveItem

export function resetConstructor(): IConstructorResetItem {
  return {
    type: BURGER_CONSTRUCTOR_RESET_ITEM,
  };
}
