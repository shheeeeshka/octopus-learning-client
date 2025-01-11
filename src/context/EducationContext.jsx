import { createContext, useCallback, useEffect, useState } from "react";
import ModuleService from "../services/ModuleService";
import TestService from "../services/TestService";

export const EducationContext = createContext();

export const EducationContextProvider = ({ children }) => {
    const [test, setTest] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const [modules, setModules] = useState();
    const [isEducationLoading, setIsEducationLoading] = useState(false);
    const [educationError, setEducationError] = useState(null);

    useEffect(() => {
        const fetchModules = async () => {
            try {
                setIsEducationLoading(true);
                const { data } = await ModuleService.fetchModules();
                console.log(data);
                setModules(data);
            } catch (err) {
                setEducationError(err.message);
                console.error(err);
            } finally {
                setIsEducationLoading(false);
            }
        };

        fetchModules();
    }, []);

    const fetchTest = useCallback(async (moduleId = "") => {
        try {
            setIsEducationLoading(true);
            const { data } = await TestService.fetchTest(moduleId);
            setTest(data);
            console.log(data);
        } catch (err) {
            setEducationError(err.message);
            console.error(err);
        } finally {
            setIsEducationLoading(false);
        }
    }, []);

    // const updateTest = useCallback(() => {
    //     setTest();
    // }, []);

    const updateSearchValue = useCallback((newVal = "") => {
        setSearchValue(newVal);
    }, []);

    return <EducationContext.Provider
        value={{
            searchValue,
            updateSearchValue,
            test,
            fetchTest,
            modules,
            isEducationLoading,
            educationError,
        }}
    >
        {children}
    </EducationContext.Provider>
}