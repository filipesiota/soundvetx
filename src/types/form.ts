export enum FormState {
    Create = "create",
    Update = "update"
}

export type FormUpdateProps<T> = {
    originalData: T
    hasChanged: (data: T, originalData: T) => boolean
}
