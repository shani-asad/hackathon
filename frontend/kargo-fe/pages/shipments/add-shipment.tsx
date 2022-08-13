import {NextPage} from "next";
import Head from "next/head";
import {Add} from "@mui/icons-material";
import {FormEvent, useEffect, useState} from "react";
import {Autocomplete, TextField} from "@mui/material";
import {DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Link from "next/link";

const AddShipment: NextPage = () => {
    const [date, setDate] = useState<Date | null>(null);
    const [cities, setCities] = useState<string[]>(['Jakarta', 'Bandung', 'Surabaya', 'Yogyakarta', 'Makassar', 'Bandar Lampung']);
    const [origin, setOrigin] = useState<string | null>(null);
    const [destination, setDestination] = useState<string | null>(null);

    useEffect(() => {
        const unix = dayjs(date).unix();
    }, [date]);

    const submitForm = () => {
        console.log(origin);
        console.log(destination);
        console.log(dayjs(date).unix());
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

export default AddShipment;
