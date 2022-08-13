import { useRouter } from 'next/router'
import {NextPage} from "next";
import Head from "next/head";
import {Alert, Autocomplete, TextField} from "@mui/material";
import {Add} from "@mui/icons-material";
import {FormEvent, useState} from "react";
import Link from "next/link";
import axios, {AxiosResponse} from "axios";
import {Truck} from "../../../types/truck";
import {Driver} from "../../../types/drivers";

interface AllocateProps {
    trucks: Truck[],
    drivers: Driver[]
}

interface Response<T> {
    success: boolean,
    data: T[]
}

const Allocate: NextPage<AllocateProps> = ({trucks, drivers}: AllocateProps) => {
    const truckList: Truck[] = trucks;
    const driverList: Driver[] = drivers;
    const [truckSelected, setTruckSelected] = useState<string | null>(null);
    const [driverSelected, setDriverSelected] = useState<string | null>(null);
    const [alertError, setAlertError] = useState<boolean>(false);
    const [alertSuccess, setAlertSucess] = useState<boolean>(false);
    const router = useRouter()
    const { id } = router.query;

    const submitForm = () => {
        if (truckSelected === null || driverSelected === null) {
            setAlertSucess(false);
            setAlertError(true);
            return;
        }

        axios.put(`http://localhost:3000/api/shipment/allocate/${id}`, {
            "license": truckList.find(x => x.id === truckSelected)?.licenceNumber,
            "driver": driverList.find(x => x.id === driverSelected)?.name
        }).then(() => {
            setAlertError(false)
            setAlertSucess(true);
            setTimeout(() => {
                router.push('/shipments').then();
            }, 3000);
        }).catch(console.log);
    }

    return (
        <>
            <Head>
                <title>Allocate</title>
            </Head>
            <main>
                <section className="container flex flex-col items-center h-screen justify-center">
                    <div className="border border-transparent rounded-md p-6 bg-white shadow-lg w-[400px]">
                        <div className="mb-4 border-b pb-4">
                            {
                                alertError && <Alert severity="error" className={'mb-4'}>Please Input All Mandatory Fields!</Alert>
                            }
                            {
                                alertSuccess && <Alert severity="success" className={'mb-4'}>Allocate Success! You will be redirected into Shipments Page</Alert>
                            }
                            <div className="flex mb-1 items-center">
                                <h1 className="text-xl text-gray-700 capitalize mr-3">Allocate for {id}</h1>
                                <div className="rounded-full w-8 p-1 bg-green-100 aspect-square flex justify-center items-center">
                                    <Add />
                                </div>
                            </div>
                        </div>
                        <form className={'space-y-3'} onSubmit={(e: FormEvent<HTMLFormElement>) => {
                            e.preventDefault();
                            submitForm();
                        }}>
                            <div className="flex flex-col space-y-6">
                                <div className={'flex flex-col'}>
                                    <Autocomplete
                                        onChange={(event: any, newValue) => {
                                            if (newValue === null) {
                                                return;
                                            }
                                            setTruckSelected(newValue.id)
                                        }}
                                        id="combo-box-origin"
                                        options={truckList}
                                        getOptionLabel={option => option.licenceNumber}
                                        renderInput={(params) => <TextField {...params} label="Trucks"/>}
                                    />
                                </div>
                                <div className={'flex flex-col'}>
                                    <Autocomplete
                                        id="combo-box-destination"
                                        onChange={(event: any, newValue) => {
                                            if (newValue === null) {
                                                return;
                                            }
                                            setDriverSelected(newValue.id)
                                        }}
                                        options={driverList}
                                        getOptionLabel={option => option.name}
                                        renderInput={(params) => <TextField {...params} label="Drivers"/>}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <Link href={'/shipments'} >
                                        <button className={'mb-6 text-gray-500 capitalize border border-gray-300 text-center p-2 rounded-xl'}
                                                type="button">Cancel
                                        </button>
                                    </Link>
                                    <button className={'text-gray-100 capitalize bg-blue-500 text-center p-2 rounded-xl'}
                                            type="submit">Add Shipment
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        </>

    )
}

export async function getServerSideProps() {
    const response = await axios.get<AxiosResponse<Response<Truck>>>('http://localhost:3000/api/transporter/trucks/get')
    const driverResponse = await axios.get<AxiosResponse<Response<Driver>>>('http://localhost:3000/api/transporter/drivers/get')
    const truckData = response.data
    const driverData = driverResponse.data

    return {
        props: {
            trucks: truckData.data,
            drivers: driverData.data
        },
    }
}

export default Allocate;
