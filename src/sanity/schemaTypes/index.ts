import { type SchemaTypeDefinition } from "sanity";

import { categorySchema } from "./categories";
import productData from "./product";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productData, categorySchema],
};
