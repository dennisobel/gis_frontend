import React from 'react'
import { useSelector } from 'react-redux';
import {
    List, ListItem, ListItemText, TextareaAutosize
} from "@mui/material";
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';


function PopupDetails({ selectedMarker }) {
    const countyBuildings = useSelector(state => state.global.buildings)
    const [paymentdistribution, setPaymentDistribution] = useState()
    const [message,setMessage] = useState();

    useEffect(() => {
        console.log(countyBuildings)
        const selected = countyBuildings.filter(el => {
            return el.properties._id === selectedMarker.properties._id
        })

        console.log(selected)

        function getPaymentStatusDistribution(permits) {
            const result = permits?.reduce((acc, permit) => {
                const paymentStatus = permit.payment_status;

                if (paymentStatus === 'Paid') {
                    acc.paid++;
                } else if (paymentStatus === 'Partially Paid') {
                    acc.partiallyPaid++;
                } else if (paymentStatus === 'Not Paid') {
                    acc.notPaid++;
                }

                return acc;
            }, { paid: 0, partiallyPaid: 0, notPaid: 0 });

            if (permits.length === 0) {
                return "No Occupants";
            }

            return result
        }

        const paymentDistribution = getPaymentStatusDistribution(selectedMarker?.properties.singleBusinessPermits || [])
        setPaymentDistribution(paymentDistribution)
        console.log(paymentDistribution)
    }, [selectedMarker])

    const handleMessage = event => {
        setMessage(event.target.value);
    };

    const handleKeyDown = (event) => {
        
        if (event.key === 'Enter') {
            event.preventDefault()
          // Handle the data on Enter key press
          console.log('Message entered:', message);
          // You can perform any additional logic or actions with the captured data
        //   Cleanup
        setMessage(' '); // Temporarily change the message to a different value
        // setTimeout(() => setMessage(''), 100);
        }
      };
    return (
        <List>
            <ListItem sx={{marginBottom: '-20px',}}>
                <ListItemText sx={{
                    fontSize: '8px',
                    
                }} primary={`NP-${paymentdistribution?.notPaid} : PP-${paymentdistribution?.partiallyPaid} : P-${paymentdistribution?.paid}`} />
            </ListItem>
            <ListItem>
                <ListItemText sx={{
                    fontSize: '8px',
                }} secondary={`Building # - ${selectedMarker.properties.buildingNumber} : Structure - ${selectedMarker.properties.typeofstructure} : Floors - ${selectedMarker.properties.floors || 0}`} />
            </ListItem>
            {selectedMarker?.properties?.singleBusinessPermits.map((store) => {
                let borderColor;
                if (store.payment_status === 'Paid') {
                    borderColor = 'green';
                } else if (store.payment_status === 'Not Paid') {
                    borderColor = 'red';
                } else if (store.payment_status === 'Partially Paid') {
                    borderColor = 'gold';
                } else {
                    borderColor = 'teal';
                }
                return (

                    <ListItem
                        key={store.store_no}
                        sx={{
                            marginBottom: '10px',
                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                            border: `2px solid ${borderColor}`,
                            borderRadius: '2px',
                        }}
                    >
                        <div>
                        <ListItemText
                            secondary={`Sore # - ${store.store_no} - ${store.payment_status}`}
                            primary={store.business_name}
                            sx={{
                                fontSize: '12px',
                            }}
                        />
                        <TextareaAutosize
                            rows={4} // Specify the number of rows for the textarea
                            placeholder="..."
                            sx={{
                                width: '100%', 
                                resize: 'vertical',
                                borderRadius: '2px',
                                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                                border: `1px solid ${borderColor}`,
                            }}
                            value={message}
                            onKeyDown={handleKeyDown}
                            onChange={handleMessage}
                        />
                        </div>
                    </ListItem>
                )
            })}
        </List>
    )
}

export default PopupDetails