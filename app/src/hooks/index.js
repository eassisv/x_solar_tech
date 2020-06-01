import { useLocation } from "react-router-dom";

export default function useCurrentPageAndSearch() {
  const urlParams = new URLSearchParams(useLocation().search);
  const currentPage = Number(urlParams.get("page"));
  const search = urlParams.get("search") || "";
  return {
    currentPage:
      Number.isInteger(currentPage) && currentPage > 0 ? currentPage : 1,
    search,
  };
}
