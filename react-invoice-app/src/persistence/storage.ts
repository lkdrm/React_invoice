export function loadCollection<T>(key: string): T[] {
    try {
        const raw = localStorage.getItem(key);
        if (raw === null) {
            return [];
        }
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) {
            console.warn(`Storage key "${key}" did not contain an array; resetting`);
            return [];
        }
        return parsed as T[];
    } catch (error) {
        console.warn(`Failed to load collection at "${key}"`, error);
        return [];
    };
}

export function saveCollection<T>(key: string, items: T[]): void {
    try {
        localStorage.setItem(key, JSON.stringify(items));
    } catch (error) {
        console.warn(`Failed to save collection at "${key}"`, error);
    }
}

export function loadObject<T>(key: string, fallback: T): T {
    try {
        const raw = localStorage.getItem(key);
        if (raw === null) {
            return fallback;
        }
        return JSON.parse(raw) as T;
    } catch (error) {
        console.warn(`Failed to save collection at "${key}"`, error);
    }
    return fallback;
}

export function saveObject<T>(key: string, value: T): void {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    }
    catch (error) {
        console.warn(`Failed to save object at "${key}"`, error);
    }
}