export interface Driver {
    id: string,
    name: string,
    phoneNumber: string,
    createdAt: Date,
    status: DriverStatus,
    document: DriverDocument,
}

export interface DriverTable {
    name: string,
    phoneNumber: string,
    createdAt: string,
    status: string,
    dropdown: string,
}

export enum DriverStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}

export interface DriverDocument {
    idCard: string | Blob,
    license: string | Blob,
}