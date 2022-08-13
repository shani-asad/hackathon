export interface Shipment {
    id: string,
    license: string,
    driverName: string,
    origin: string,
    destination: string,
    loadingDate: string,
    status: ShipperStatus
}

export enum ShipperStatus {
    'ALLOCATED' = 'Allocated',
    'ONGOING_TO_ORIGIN' = 'Ongoing to Origin',
    'AT_ORIGIN' = 'At Origin',
    'ONGOING_TO_DESTINATION' = 'Ongoing to Destination',
    'AT_DESTINATION' = 'At Destination',
    'COMPLETED' = 'Completed'
}
