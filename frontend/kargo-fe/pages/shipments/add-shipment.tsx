import {NextPage} from "next";
import Head from "next/head";
import {Add} from "@mui/icons-material";
import {FormEvent, useState} from "react";
import {Alert, Autocomplete, TextField} from "@mui/material";
import {DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Link from "next/link";
import axios, {AxiosResponse} from "axios";
import {useRouter} from "next/router";

interface AddShipmentProps {
    districts: string[]
}

type DistrictResponse = {
    message: boolean,
    data: string[]
}

const AddShipment: NextPage<AddShipmentProps> = ({districts}: AddShipmentProps) => {
    const router = useRouter();
    const [alertError, setAlertError] = useState<boolean>(false);
    const [alertSuccess, setAlertSucess] = useState<boolean>(false);
    const [date, setDate] = useState<Date | null>(null);
    const cities = districts;
    const [origin, setOrigin] = useState<string | null>(null);
    const [destination, setDestination] = useState<string | null>(null);

    const submitForm = () => {
        if (date === null || origin === null || destination === null) {
            setAlertSucess(false);
            setAlertError(true);
            return;
        }

        axios.post('http://localhost:3000/api/shipment/add', {
            "origin": origin,
            "destination": destination,
            "loading_date": dayjs(date).unix()
        }).then(() => {
            setAlertError(false)
            setAlertSucess(true);
            setTimeout(() => {
                router.push('/shipments').then();
            }, 3000);
        });
    }

    return (
        <>
            <Head>
                <title>Add Shipment</title>
            </Head>
            <main>
                <section className="container flex flex-col items-center h-screen justify-center">
                    <div className="border border-transparent rounded-md p-6 bg-white shadow-lg w-[400px]">
                        <div className="mb-4 border-b pb-4">
                            {
                                alertError && <Alert severity="error" className={'mb-4'}>Please Input All Mandatory Fields!</Alert>
                            }
                            {
                                alertSuccess && <Alert severity="success" className={'mb-4'}>Add Shipment Success! You will be redirected into Shipments Page</Alert>
                            }
                            <div className="flex mb-1 items-center">
                                <h1 className="text-xl text-gray-700 capitalize mr-3">Add Shipment</h1>
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
                                        value={origin}
                                        onChange={(event: any, newValue: string | null) => {
                                            setOrigin(newValue);
                                        }}
                                        id="combo-box-origin"
                                        options={cities}
                                        renderInput={(params) => <TextField {...params} label="Origin"/>}
                                    />
                                </div>
                                <div className={'flex flex-col'}>
                                    <Autocomplete
                                        value={destination}
                                        id="combo-box-destination"
                                        onChange={(event: any, newValue: string | null) => {
                                            setDestination(newValue);
                                        }}
                                        options={cities}
                                        renderInput={(params) => <TextField {...params} label="Destination"/>}
                                    />
                                </div>
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DesktopDatePicker
                                        label="Loading Date"
                                        value={date}
                                        onChange={(value: Date | null) => setDate(value)}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
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

export async function getStaticProps() {
    const districtResponse = await axios.get<AxiosResponse<DistrictResponse>>('http://localhost:3000/api/shipment/districts');
    const districtData = districtResponse.data;

    return {
        props: {
            districts: districtData.data
        },
    }
}

export default AddShipment;
