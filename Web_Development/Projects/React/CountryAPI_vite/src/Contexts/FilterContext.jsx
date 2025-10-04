import { createContext, Provider, useState} from "react";
export const FilterContext = createContext();

export default function FilterProvider({children}) {
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  return (
    <FilterContext.Provider value={[isOpenFilter, setIsOpenFilter]}>
      {children}
    </FilterContext.Provider>
  );
}
