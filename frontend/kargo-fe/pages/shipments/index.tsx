import {NextPage} from "next";
import Head from "next/head";
import Link from "next/link";
import {
    Button,
    InputAdornment,
    Paper,
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

const Shipments: NextPage = () => {
    const [dataSource, setDataSource] = useState<Shipment[]>(ShipperMockData)
    const filterDataSource = useCallback((input: string) => {
        console.log(input);
        setDataSource(() => {
            return ShipperMockData.filter((data: Shipment) => data.id.toLowerCase().includes(input.toLowerCase()));
        });
    }, [])

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
                    <Button className={'mr-6'} variant={"outlined"} size={"large"} endIcon={<Add />}>
                        Add Shipment
                    </Button>
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
                                {
                                    Object.keys(dataSource[0]).map((attribute: string, index: number) => {
                                        return (
                                            <TableCell key={index}>
                                                {attribute.slice(0,1).toUpperCase()}{attribute.slice(1)}
                                            </TableCell>
                                        )
                                    })
                                }
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
                                            <TableCell>{data.id}</TableCell>
                                            <TableCell>{data.license}</TableCell>
                                            <TableCell>{data.driverName}</TableCell>
                                            <TableCell>{data.origin}</TableCell>
                                            <TableCell>{data.destination}</TableCell>
                                            <TableCell>{dayjs.unix(Number(data.loadingDate)).format('D MMMM YYYY')}</TableCell>
                                            <TableCell>{data.status}</TableCell>
                                            <TableCell align={"right"}>{data.status}</TableCell>
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

export default Shipments
