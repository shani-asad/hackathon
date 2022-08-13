import {NextPage} from "next";
import Head from "next/head";
import Link from "next/link";
import {
    Button, FormControl,
    InputAdornment, MenuItem,
    Paper, Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import {Add, Search} from "@mui/icons-material";
import {Shipment} from "../../types/shipper";
import {ShipperMockData} from "../../const/shipper-mock-data";
import dayjs from "dayjs";
import {ChangeEvent, useCallback, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {Truck} from "../../types/truck";
import {Driver} from "../../types/drivers";

interface Response<T> {
    success: boolean,
    data: T[]
}

interface ShipmentProps {
    shipments: Shipment[]
}

const Shipments: NextPage<ShipmentProps> = ({shipments}: ShipmentProps) => {
    const [dropdownValue, setDropdownValue] = useState<string>('');
    const [dataSource, setDataSource] = useState<Shipment[]>(shipments)
    const filterDataSource = useCallback((input: string) => {
        setDataSource(() => {
            return shipments.filter((data: Shipment) => data.shipment_number.toLowerCase().includes(input.toLowerCase()));
        });
    }, []);

    return (
        <>
            <Head>
                <title>Shipper Page</title>
            </Head>
            <header className={'container py-8'}>
                <div className={'flex items-center'}>
                    <h1>LMS</h1>
                    <nav>
                        <ul>
                            <li>
                                <Link href={'/shipments'}>
                                    <a className={''}>Shipments</a>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="ml-auto border rounded border-gray-700 p-4">
                        Shipper
                    </div>
                </div>
            </header>
            <main className="container py-12">
                <div className="flex justify-end items-center">
                    <Link href={'/shipments/add-shipment'}>
                        <Button className={'mr-6'} variant={"outlined"} size={"large"} endIcon={<Add/>}>
                            Add Shipments
                        </Button>
                    </Link>
                    <TextField label="Search Shipment"
                               variant={"outlined"}
                               onChange={(e: ChangeEvent<HTMLInputElement>) => filterDataSource(e.target.value)}
                               InputProps={{
                                   endAdornment: (
                                       <InputAdornment position="end">
                                           <Search/>
                                       </InputAdornment>
                                   )
                               }}
                    />
                </div>
                <TableContainer component={Paper} className={'mt-12'}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Shipment
                                </TableCell>
                                <TableCell>
                                    License
                                </TableCell>
                                <TableCell>
                                    Drivers Name
                                </TableCell>
                                <TableCell>
                                    Origin
                                </TableCell>
                                <TableCell>
                                    Destination
                                </TableCell>
                                <TableCell>
                                    Loading Date
                                </TableCell>
                                <TableCell>
                                    Status
                                </TableCell>
                                <TableCell align={"right"}>
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                dataSource.map((data: Shipment, index: number) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>{data.shipment_number}</TableCell>
                                            <TableCell>{data.license}</TableCell>
                                            <TableCell>{data.driverName}</TableCell>
                                            <TableCell>{data.origin}</TableCell>
                                            <TableCell>{data.destination}</TableCell>
                                            <TableCell>{dayjs.unix(data.loadingDate).format('D MMMM YYYY')}</TableCell>
                                            <TableCell>{data.status}</TableCell>
                                            <TableCell align={"right"}>
                                                <FormControl sx={{minWidth: 175}}>
                                                    <Select
                                                        value={dropdownValue}
                                                        id="shipment-dropdown-table-row"
                                                        displayEmpty
                                                        renderValue={() => {
                                                            return <em>Action</em>;
                                                        }}
                                                    >
                                                        <MenuItem key={"Allocate Shipment"} value={"Allocate Shipment"}>
                                                            <Link href={`/shipments/allocate/${data.shipment_number}`}>
                                                                Allocate Shipment
                                                            </Link>
                                                        </MenuItem>
                                                        <MenuItem key={"Update Status"} value={"Update Status"}>
                                                            <Link href={`/update-status/${data.shipment_number}`}>
                                                                Update Status
                                                            </Link>
                                                        </MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </main>
        </>
    )
}

// http://localhost:3000/api/shipment/

export async function getServerSideProps() {
    const response = await axios.get<AxiosResponse<Response<Shipment>>>('http://localhost:3000/api/shipment/')
    const shipmentData = response.data

    return {
        props: {
            shipments: shipmentData.data
        },
    }
}

export default Shipments
