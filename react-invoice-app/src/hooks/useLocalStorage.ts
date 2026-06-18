import { useEffect, useState } from "react";
import { loadObject, saveObject } from "../persistence/storage";

export function useLocalStorage<T>(
    key: string,
    initial: T,
): [T, (next: T) => void] {
    const [value, setValue] = useState<T>(() => loadObject<T>(key, initial));

    useEffect(() => {
        saveObject(key, value);
    }, [key, value])

    return [value, setValue]
}