import { LoadingPage } from "@/components/LoadingPage";
import { createContext, useContext, useState } from "react";

export type LoadingContextType = {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
};

export const LoadingContext = createContext({} as LoadingContextType);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {children}

            {isLoading && <LoadingPage />}
        </LoadingContext.Provider>
    );
}

export function useLoading() {
    return useContext(LoadingContext);
}