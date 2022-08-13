import {Shipment, ShipperStatus} from "../types/shipper";

export const ShipperMockData: Shipment[] = [
    {
        id: 'DO-722947',
        license: 'B 123 BE',
        driverName: 'Budi',
        origin: 'Bandung',
        destination: 'Jakarta',
        loadingDate: '1660362734',
        status: ShipperStatus.ALLOCATED
    },
    {
        id: 'AC-7229123',
        license: 'L 8652 UIP',
        driverName: 'Bayu',
        origin: 'Surabaya',
        destination: 'Papua',
        loadingDate: '1660362734',
        status: ShipperStatus.ONGOING_TO_DESTINATION
    },
    {
        id: 'DA-722456',
        license: 'D 0912 OSP',
        driverName: 'Budi',
        origin: 'Bandung',
        destination: 'Jakarta',
        loadingDate: '1660362734',
        status: ShipperStatus.COMPLETED
    },
    {
        id: 'DB-123789',
        license: 'AB 1239 CAC',
        driverName: 'Budi',
        origin: 'Semarang',
        destination: 'Makassar',
        loadingDate: '1660362734',
        status: ShipperStatus.AT_ORIGIN
    }
]
