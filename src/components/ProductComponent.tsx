import React from "react";
import { ProductInterface } from "@/interfaces/productInterface";

export default function ProductComponent({
  id,
  label,
  stockID,
  categoriesproductID,
  sizes,
  picture,
}: ProductInterface) {
  return <div>{label}</div>;
}
