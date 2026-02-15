import { useRef } from "react";
import { Viewer } from "./viewer";
import { ViewerContext } from "./viewerContext";

export function ViewerProvider({ children }: { children: React.ReactNode }) {
  const viewerRef = useRef<Viewer | null>(null);
  if (!viewerRef.current) {
    viewerRef.current = new Viewer();
  }

  return (
    <ViewerContext.Provider value={{ viewer: viewerRef.current }}>
      {children}
    </ViewerContext.Provider>
  );
}
