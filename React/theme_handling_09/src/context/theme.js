import { createContext , useContext } from "react";

export const Themecontext = createContext({
    thememode: "dark",
    darkmode: () => {},
    lightmode: () => {},
})

export const Themeprovider = Themecontext.Provider

export default function useTheme() {
    return useContext(Themecontext)
}
