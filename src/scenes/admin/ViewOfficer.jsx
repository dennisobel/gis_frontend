import React, { useState } from "react";
import { Backdrop, Box, useTheme, Button, Modal, TextField, Typography, Tab, Tabs, Select, MenuItem, InputLabel } from "@mui/material";
import { useDispatch } from "react-redux";
import { setRevenueOfficer } from "state";
import validator from "validator";
import Daily from "scenes/daily";
import Monthly from "scenes/monthly";
import { Close } from "@mui/icons-material";
import { useEffect } from "react";

const ViewOfficer = ({ isOpen, onClose }) => {
    const theme = useTheme();
    const dispatch = useDispatch()
    const options = [
        { value: "block_a", label: "Block A" },
        { value: "block_b", label: "Block B" },
    ];

    const [formValues, setFormValues] = useState({
        name: "",
        phoneNumber: "",
        email: "",
        workId: "",
        password: "",
        block: ""
    });

    const [formErrors, setFormErrors] = useState({
        name: false,
        phoneNumber: false,
        email: false,
        workId: false,
        password: false,
        block: false,
    });

    const [value, setValue] = React.useState(0);
    // useEffect(()=>{
    //     if(value == 3) {
    //         onClose()
    //     }
    // },[value])
    const handleTabChange = (event, newValue) => {
        console.log("new value:",newValue)
        setValue(newValue);
    };

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = {
            name: validator.isEmpty(formValues.name),
            phoneNumber: !validator.isMobilePhone(formValues.phoneNumber),
            email: !validator.isEmail(formValues.email),
            workId: !validator.isNumeric(formValues.workId),
            password: validator.isEmpty(formValues.password),
            role: validator.isEmpty(formValues.role),
        };

        setFormErrors(errors);

        if (!Object.values(errors).some(Boolean)) {
            dispatch(setRevenueOfficer(formValues))
            console.log("Form submitted successfully:", formValues);
        }

        onClose();
    };

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`tabpanel-${index}`}
                aria-labelledby={`tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        {children}
                    </Box>
                )}
            </div>
        );
    }

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box>
                <Box sx={{
                    display: "block",
                    position: "fixed",
                    height: 780,
                    width: 400, 
                    bgcolor: "background.paper", 
                    p: 2,
                    top: "0",
                    left: "0",
                    right: "0",
                    bottom: "0",
                    margin: "auto",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <Tabs value={value} onChange={handleTabChange} centered textColor="secondary"
                        indicatorColor="secondary">
                        {/* <Tab label="UPDATE" /> */}
                        <Tab label="DAILY" />
                        <Tab label="MONTHLY" />
                        <Tab icon={<Close />} onClick={()=>onClose()} />
                    </Tabs>

                    <TabPanel value={value} index={0}>
                        <Box sx={{
                            display: "block",
                            position: "fixed",
                            width: 800,
                            bgcolor: "background.paper",
                            p: 2,
                            top: "200",
                            left: "0",
                            right: "0",
                            bottom: "0",
                            margin: "auto",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <Daily />
                        </Box>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Box sx={{
                            display: "block",
                            position: "fixed",
                            width: 800,
                            bgcolor: "background.paper",
                            p: 2,
                            top: "200",
                            left: "0",
                            right: "0",
                            bottom: "0",
                            margin: "auto",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <Monthly />
                        </Box>
                    </TabPanel>
                </Box>
            </Box>
        </Modal>
    );
}

export default ViewOfficer