export interface Shipment {
    _id: string,
    id: string,
    shipment_number: string,
    license?: string,
    driverName?: string,
    origin: string,
    destination: string,
    loadingDate: number,
    status: ShipperStatus,
    __v: number,
}

export enum ShipperStatus {
    'ALLOCATED' = 'Allocated',
    'ONGOING_TO_ORIGIN' = 'Ongoing to Origin',
    'AT_ORIGIN' = 'At Origin',
    'ONGOING_TO_DESTINATION' = 'Ongoing to Destination',
    'AT_DESTINATION' = 'At Destination',
    'COMPLETED' = 'Completed'
}
