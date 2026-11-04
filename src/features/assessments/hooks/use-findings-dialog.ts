import { useSearchParams } from 'react-router';

const PARAM = 'view';
const VALUE = 'findings';

/** Keeps the findings dialog in the URL so it can be linked to and closed with Back. */
export function useFindingsDialog() {
  const [searchParams, setSearchParams] = useSearchParams();

  const openSearch = new URLSearchParams(searchParams);
  openSearch.set(PARAM, VALUE);

  return {
    isOpen: searchParams.get(PARAM) === VALUE,
    openTo: { search: `?${openSearch.toString()}` },
    close: () => {
      setSearchParams(
        (current) => {
          current.delete(PARAM);
          return current;
        },
        { replace: true },
      );
    },
  };
}
