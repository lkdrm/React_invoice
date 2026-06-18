export interface Repository<T extends { id: string }> {
    list(): T[];
    get(id: string): T | undefined;
    save(item: T): void;
    delete(id: string): void
}