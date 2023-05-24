import React from 'react'
import DirectionsIcon from '@mui/icons-material/Directions';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { useSelector } from 'react-redux';
import {
    TextField,
    Card,
    Button,
    InputLabel,
    Select,
    MenuItem, List, ListItem, ListItemText
} from "@mui/material";
import { useEffect } from 'react';


function PopupDetails({ selectedMarker }) {

    const countyBuildings = useSelector(state => state.global.countyBuildings)
    const selected = countyBuildings.filter(el => {
        return el._id === selectedMarker._id
    })
    console.log(selected)
    useEffect(() => {
        console.log(selectedMarker)
        // function getPaymentStatusDistribution(permits) {
        //     const result = permits?.reduce((acc, permit) => {
        //         const paymentStatus = permit.payment_status;

        //         if (paymentStatus === 'Paid') {
        //             acc.paid++;
        //         } else if (paymentStatus === 'Partially Paid') {
        //             acc.partiallyPaid++;
        //         } else if (paymentStatus === 'Not Paid') {
        //             acc.notPaid++;
        //         }

        //         return acc;
        //     }, { paid: 0, partiallyPaid: 0, notPaid: 0 });

        //     if (permits.length === 0) {
        //         return "No Occupants";
        //     }

        //     const highestPaymentStatus = Object.keys(result).reduce((a, b) =>
        //         result[a] > result[b] ? a : b
        //     );

        //     return highestPaymentStatus;
        // }

        // const paymentDistribution = getPaymentStatusDistribution(selectedMarker?.properties.singleBusinessPermits || [])
        // console.log(paymentDistribution)
    }, [selectedMarker])
    return (
        // <div id="defaultModal" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        //     <div className="relative w-full max-w-2xl max-h-full">

        //         <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        //             <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
        //                 <h6 className="text-xl font-semibold text-gray-900 dark:text-white">
        //                     {selectedMarker.properties.description}
        //                 </h6>

        //             </div>
        //             <div className="p-6 space-y-6">
        //                 <h5 className="text-xl font-semibold text-gray-900 dark:text-white">
        //                     Sub County
        //                 </h5>
        //                 <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        //                     {selectedMarker.properties.subcounty}
        //                 </p>
        //                 <h5 className="text-xl font-semibold text-gray-900 dark:text-white">
        //                     Ward
        //                 </h5>
        //                 <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        //                     {selectedMarker.properties.ward}
        //                 </p>
        //                 <h5 className="text-xl font-semibold text-gray-900 dark:text-white">
        //                     Street
        //                 </h5>
        //                 <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        //                     {selectedMarker.properties.streetname}
        //                 </p>
        //                 <h5 className="text-xl font-semibold text-gray-900 dark:text-white">
        //                     Building
        //                 </h5>
        //                 <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        //                     {selectedMarker.properties.buildingnumber}
        //                 </p>
        //                 <h5 className="text-xl font-semibold text-gray-900 dark:text-white">
        //                     Structure
        //                 </h5>
        //                 <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        //                     {selectedMarker.properties.typeofstructure}
        //                 </p>
        //                 <h5 className="text-xl font-semibold text-gray-900 dark:text-white">
        //                     Payment Status
        //                 </h5>
        //                 <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        //                     {selectedMarker.properties.paymentstatus}
        //                 </p>
        //             </div>
        //         </div>

        //         <Card sx={{ maxWidth: 500, margin: "0 auto", mt: 5, p: 3 }}>
        //             <InputLabel id="select-label">Message</InputLabel>
        //             <TextField
        //                 size="small"
        //                 required
        //                 fullWidth
        //                 margin="normal"
        //                 name="text"
        //                 type="text"
        //             /> <br/>
        //             <ContactMailIcon sx={{ fontSize: 34, cursor: 'pointer' }} />
        //         </Card>
        //     </div>
        // </div>

        <List>
            <ListItem>
                <ListItemText primary={"BUILDING"} />
            </ListItem>
            {selectedMarker?.properties?.singleBusinessPermits.map((store) => (
                <ListItem key={store._id}>
                    <ListItemText primary={"1"} secondary={"Hi"} />
                </ListItem>
            ))}
        </List>
    )
}

export default PopupDetails