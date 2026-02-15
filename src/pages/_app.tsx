import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@charcoal-ui/icons";
import { ViewerProvider } from "@/features/vrmViewer/ViewerProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ViewerProvider>
      <Component {...pageProps} />
    </ViewerProvider>
  );
}
