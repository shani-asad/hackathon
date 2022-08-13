export interface Driver {
  id: string;
  name: string;
  phoneNumber: string;
  createdAt: Date;
  status: DriverStatus;
  document: DriverDocument;
}

export interface DriverResponse {
  id: string;
  name: string;
  phone: string;
  createdAt: number;
  status: string;
}

export interface DriverTable {
  id: string;
  name: string;
  phoneNumber: string;
  createdAt: string;
  status: string;
  dropdown: string;
}

export enum DriverStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export interface DriverDocument {
  idCard: string | Blob;
  license: string | Blob;
}
export type Order = "asc" | "desc";
export interface TableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof DriverTable
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}
export enum Action {
  EDIT = "EDIT",
  DEACTIVATE = "DEACTIVATE",
}
