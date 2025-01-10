import { createContext, useCallback, useEffect, useState } from "react";
import ModuleService from "../services/ModuleService";
import TestService from "../services/TestService";

export const EducationContext = createContext();

export const EducationContextProvider = ({ children }) => {
    const [test, setTest] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const [modules, setModules] = useState([
        {
            "title": "Основы SQL",
            "description": "Изучение баз данных.",
            "createdAt": "01.01.25",
            "previewImg": "/lessons_preview/icon1.png",
        },
        {
            "title": "Продвинутый SQL",
            "description": "Углубленное изучение запросов.",
            "createdAt": "01.01.25",
            "previewImg": "/lessons_preview/icon2.png",
        },
        {
            "title": "Оптимизация запросов",
            "description": "Методы повышения производительности SQL.",
            "createdAt": "01.01.25",
            "previewImg": "/lessons_preview/icon3.png",
        },
        {
            "title": "Работа с транзакциями",
            "description": "Управление транзакциями и их свойствами.",
            "createdAt": "01.01.25",
            "previewImg": "/lessons_preview/icon4.png",
        },
        {
            "title": "Безопасность баз данных",
            "description": "Методы защиты данных и доступа.",
            "createdAt": "01.01.25",
            "previewImg": "/lessons_preview/icon5.png",
        },
        {
            "title": "SQL для аналитиков",
            "description": "Анализ данных с помощью SQL-запросов.",
            "createdAt": "01.01.25",
            "previewImg": "/lessons_preview/iconwhite1.png",
        },
        {
            "title": "Интеграция SQL",
            "description": "Связывание SQL с другими языками.",
            "createdAt": "01.01.25",
            "previewImg": "/lessons_preview/iconwhite2.png",
        },
    ]);
    const [isEducationLoading, setIsEducationLoading] = useState(false);
    const [educationError, setEducationError] = useState(null);

    useEffect(() => {
        const fetchModules = async () => {
            try {
                setIsEducationLoading(true);
                const { data } = await ModuleService.fetchModules();
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