import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

// Define the types for the context
interface AppContextType {
  drawerOpen: boolean;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;

  activeItem: string;
  setActiveItem: Dispatch<SetStateAction<string>>;

  modalState: any;
  setModalState: Dispatch<SetStateAction<any>>;

  listing: any;
  setListings: Dispatch<SetStateAction<any>>;

  loader: boolean;
  setLoader: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeItem, setActiveItem] = useState("Candidates");
  const [modalState, setModalState] = useState({
    status: null,
    data: undefined,
  });
  const [listing, setListings] = useState([]);
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!(token && user));
  }, []);

  return (
    <AppContext.Provider
      value={{
        drawerOpen,
        setDrawerOpen,
        isLoggedIn,
        setIsLoggedIn,
        activeItem,
        setActiveItem,
        modalState,
        setModalState,
        listing,
        setListings,
        loader,
        setLoader,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within AppProvider");
  return context;
};
