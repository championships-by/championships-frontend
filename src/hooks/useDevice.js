import { useMediaQuery } from "react-responsive";

export function useDevice() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isDesktop = useMediaQuery({ minWidth: 991 });
  return { isMobile, isTablet, isDesktop };
}
