import { createContext, useCallback, useEffect, useState } from "react";
import ModuleService from "../services/ModuleService";
import TestService from "../services/TestService";

export const EducationContext = createContext();

export const EducationContextProvider = ({ children }) => {
  const [quiz, setQuiz] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [modules, setModules] = useState([]);
  const [isEducationLoading, setIsEducationLoading] = useState(false);
  const [educationError, setEducationError] = useState(null);

  const refreshModules = useCallback(async () => {
    try {
      setIsEducationLoading(true);
      const { data } = await ModuleService.fetchModules();
      setModules(data);
      return data;
    } catch (err) {
      setEducationError(err.message);
      console.error(err);
    } finally {
      setIsEducationLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshModules();
  }, [refreshModules]);

  const fetchTest = useCallback(async (moduleId = "") => {
    try {
      setIsEducationLoading(true);
      setQuiz(null);
      const { data } = await TestService.fetchTest(moduleId);
      if (!data || !data?.questions?.length) return setQuiz(null);
      setQuiz(data);
    } catch (err) {
      setEducationError(err.message);
      console.error(err);
    } finally {
      setIsEducationLoading(false);
    }
  }, []);

  const updateSearchValue = useCallback((newVal = "") => {
    setSearchValue(newVal);
  }, []);

  return (
    <EducationContext.Provider
      value={{
        searchValue,
        updateSearchValue,
        quiz,
        fetchTest,
        modules,
        setModules,
        isEducationLoading,
        educationError,
        refreshModules,
      }}
    >
      {children}
    </EducationContext.Provider>
  );
};
