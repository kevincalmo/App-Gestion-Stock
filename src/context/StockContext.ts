import { createContext, useContext } from "react";

interface StockContextData {
    activeStockId: string | null;
    setActiveStockId: (stockId: string) => void;
}

export const StockContext = createContext<StockContextData>({
    activeStockId: null,
    setActiveStockId: () => {},
});

export const useStock = () => useContext(StockContext);
