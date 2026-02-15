import { createContext } from "react";
import { Viewer } from "./viewer";

export const ViewerContext = createContext<{ viewer: Viewer }>(null!);
