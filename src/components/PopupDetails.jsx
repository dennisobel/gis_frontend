import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {
    List, ListItem, ListItemText, TextareaAutosize, Grid, Card
} from "@mui/material";
import { Padding } from '@mui/icons-material';
import { getOfficers,sendMail,getUsername } from 'helper/helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PopupDetails({ selectedMarker }) {
    const countyBuildings = useSelector(state => state.global.buildings)
    const searchQuery = useSelector(state => state.global.searchQuery)
    const [paymentdistribution, setPaymentDistribution] = useState()
    const [message, setMessage] = useState();
    const [toggleChatArray, setToggleChatArray] = useState([]);
    const [selectedindex, setSelectedIndex] = useState(-1)
    const [currentstore, setCurrentStore] = useState()
    const [ward,setWard] = useState()
    const [county,setCounty] = useState()
    const [officer,setOfficer] = useState()
    const [user,setUser] = useState()

    useEffect(() => {
        console.log(countyBuildings)
        const selected = countyBuildings?.filter(el => {
            return el.properties._id === selectedMarker.properties._id
        })

        setWard(selected[0]?.properties.ward)
        setCounty(selected[0]?.properties.county)

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

        getUsername().then(user => {
            setUser(user)
        })



        if (selectedMarker) {
            const paymentDistribution = getPaymentStatusDistribution(selectedMarker?.properties.singleBusinessPermits || []);
            setPaymentDistribution(paymentDistribution);
        }
    }, [selectedMarker])

    useEffect(()=>{
        let wardOfficer
        county !== undefined && getOfficers({county,role:"revenueOfficer"}).then(({data}) => {            
            wardOfficer = data?.filter(officer => {
                return officer.ward === ward
            })

            console.log("officer:",wardOfficer)
        })
    },[ward,county])

    const handleToggleChat = (index, store) => {
        const newToggleChatArray = [...toggleChatArray];
        newToggleChatArray[index] = !newToggleChatArray[index];
        setToggleChatArray(newToggleChatArray);
        setSelectedIndex(index === selectedindex ? -1 : index);
        setCurrentStore(store)
    };

    const handleMessage = useCallback((event) => {
        setMessage(event.target.value);
    }, []);

    const handleKeyDown = useCallback((event) => {
        const notify = () => toast("Email sent");
        console.log(user)
        if (event.key === 'Enter') {
            event.preventDefault();
            console.log('Message entered:', message);
            sendMail({to:"ogembodenis2016@gmail.com", from:user.email, name: user.name, email_body:message})
            .then((res) => {
                console.log("RES",res)
            })
            .then(notify)
            setMessage(''); // Clear the message after pressing Enter
        }
    }, [message]);
    return (
        <Grid width={700} height={500} container spacing={1} sx={{ maxWidth: "700px", maxHeight: "700px" }}>
            <ToastContainer />
            <Grid item xs={6}>
                <List>
                    <ListItem sx={{ marginBottom: '-20px', }}>
                        <ListItemText sx={{
                            fontSize: '8px',

                        }} primary={`NP-${paymentdistribution?.notPaid} : PP-${paymentdistribution?.partiallyPaid} : P-${paymentdistribution?.paid}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{
                            fontSize: '8px',
                        }} secondary={`Building # - ${selectedMarker.properties.buildingNumber} : Structure - ${selectedMarker.properties.typeofstructure} : Floors - ${selectedMarker.properties.floors || 0}`} />
                    </ListItem>

                    {selectedMarker?.properties?.singleBusinessPermits
                        .filter((store) => {
                            const { business_category, is_building_open, store_no } = store;
                            const permitObj = { business_category, is_building_open, store_no };

                            for (const key in permitObj) {
                                if (permitObj[key].toString().toLowerCase().includes(searchQuery.toLowerCase())) {
                                    return true;
                                }
                            }

                            return false;
                        })
                        .map((store, index) => {
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
                                    key={index}
                                    sx={{
                                        marginBottom: '10px',
                                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                                        border: `2px solid ${borderColor}`,
                                        borderRadius: '2px',
                                        cursor: "pointer"
                                    }}
                                    onClick={() => handleToggleChat(index, store)}
                                >
                                    <div>
                                        <ListItemText
                                            secondary={`Store # - ${store.store_no} - ${store.payment_status}`}
                                            primary={`${store.business_name}->${store.business_category}`}
                                            sx={{
                                                fontSize: '12px',
                                            }}
                                        />
                                    </div>
                                </ListItem>
                            );
                        })
                    }

                    {selectedMarker?.properties?.singleBusinessPermits
                        .filter((store) => {
                            const { business_category, is_building_open, store_no } = store;
                            const permitObj = { business_category, is_building_open, store_no };

                            for (const key in permitObj) {
                                if (permitObj[key].toString().toLowerCase().includes(searchQuery.toLowerCase())) {
                                    return true;
                                }
                            }

                            return false;
                        })
                        .length === 0 && (
                            selectedMarker?.properties?.singleBusinessPermits.map((store, index) => {
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
                                        key={index}
                                        sx={{
                                            marginBottom: '10px',
                                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                                            border: `2px solid ${borderColor}`,
                                            borderRadius: '2px',
                                        }}
                                        onClick={() => handleToggleChat(index, store)}
                                    >
                                        <div>
                                            <ListItemText
                                                secondary={`Store # - ${store.store_no} - ${store.payment_status}`}
                                                primary={`${store.business_name}->${store.business_category}`}
                                                sx={{
                                                    fontSize: '12px',
                                                }}
                                            />
                                        </div>
                                    </ListItem>
                                )
                            })
                        )}
                </List>
            </Grid>
            <Grid item xs={6} sx={{ position: "fixed", top: 3, right: 9 }} width={320}>
                <Card sx={{ marginBottom: '-16px', }}>
                    <ListItem sx={{ marginBottom: '-5px', }}>
                        <ListItemText sx={{
                            fontSize: '6px',
                            fontStyle: 'bold'

                        }} primary={`STORE INFO`} />
                    </ListItem>
                    {/* <ListItem sx={{ marginBottom: '-20px', }}>
                        <ListItemText sx={{
                            fontSize: '8px',

                        }} primary={`NP-${paymentdistribution?.notPaid} : PP-${paymentdistribution?.partiallyPaid} : P-${paymentdistribution?.paid}`} />
                    </ListItem> */}
                    {/* <ListItem>
                        <ListItemText sx={{
                            fontSize: '8px',
                        }} secondary={`Building # - ${selectedMarker.properties.buildingNumber} : Structure - ${selectedMarker.properties.typeofstructure} : Floors - ${selectedMarker.properties.floors || 0}`} />
                    </ListItem> */}
                </Card>
                <br />

                {currentstore && (
                    <>
                        <Card>
                            {/* <ListItem sx={{  }}>
                                <ListItemText sx={{
                                    fontSize: '6px',
                                    fontStyle: 'bold'

                                }} primary={`STORE INFO`} />
                            </ListItem> */}
                            <ListItem sx={{}}>
                                <ListItemText sx={{
                                    fontSize: '6px',
                                    fontStyle: 'bold'

                                }} secondary={`APPLICATION TYPE: ${currentstore.application_type}`} />
                            </ListItem>
                            <ListItem sx={{}}>
                                <ListItemText sx={{
                                    fontSize: '6px',
                                    fontStyle: 'bold'

                                }} secondary={`BRANCH NAME: ${currentstore.branch_name}`} />
                            </ListItem>
                            <ListItem sx={{}}>
                                <ListItemText sx={{
                                    fontSize: '6px',
                                    fontStyle: 'bold'

                                }} secondary={`DESCRIPTION: ${currentstore.business_description}`} />
                            </ListItem>
                        </Card>
                        <br />
                        <Card>
                            <ListItem sx={{}}>
                                <ListItemText sx={{
                                    fontSize: '6px',
                                    fontStyle: 'bold'

                                }} secondary={`Message Officer`} />
                            </ListItem>
                            <TextareaAutosize
                                rows={4}
                                placeholder="..."
                                style={{
                                    maxWidth: '800px',
                                    resize: 'vertical',
                                    borderRadius: '2px',
                                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                                    border: `1px solid teal`,
                                    margin: '8px',
                                    padding: '8px'
                                }}
                                value={message}
                                onKeyDown={handleKeyDown}
                                onChange={handleMessage}
                            />
                        </Card>
                    </>
                )
                }

            </Grid>
        </Grid>
    )
}

export default PopupDetails