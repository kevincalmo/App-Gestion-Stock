import {StockContext} from "@/context/StockContext";
import {useState} from "react";

export const StockActiveProvider: React.FC = ({children}: any) => {
    const [activeStockId, setActiveStockId] = useState<string>("");
    return (
        <StockContext.Provider value={{activeStockId, setActiveStockId}}>
            {children}
        </StockContext.Provider>
    );
};