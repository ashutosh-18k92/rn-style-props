import { createContext, useState } from "react";
/**
 * Passing values avoiding prop chaining
 * Context lets components pass information deep down without explicitly passing props.
 * Now the Page component and any components inside it, no matter how deep, will “see” the passed context values.
 * If the passed context values change, React will re-render the components reading the context as well.
 *
 */
export const PaletteContext = createContext();
export const PreviewContext = createContext();
export const CartContext = createContext();



