import React from 'react'
import DirectionsIcon from '@mui/icons-material/Directions';
import ContactMailIcon from '@mui/icons-material/ContactMail';




function PopupDetails({ selectedMarker }) {
    return (
        <div id="defaultModal" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative w-full max-w-2xl max-h-full">

                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h6 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {selectedMarker.properties.description}
                        </h6>

                    </div>
                    <div className="p-6 space-y-6">
                        <h5 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Sub County
                        </h5>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            {selectedMarker.properties.subcounty}
                        </p>
                        <h5 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Ward
                        </h5>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            {selectedMarker.properties.ward}
                        </p>
                        <h5 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Street
                        </h5>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            {selectedMarker.properties.streetname}
                        </p>
                        <h5 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Building
                        </h5>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            {selectedMarker.properties.buildingnumber}
                        </p>
                        <h5 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Structure
                        </h5>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            {selectedMarker.properties.typeofstructure}
                        </p>
                        <h5 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Payment Status
                        </h5>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            {selectedMarker.properties.paymentstatus}
                        </p>
                    </div>
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                    <DirectionsIcon sx={{ fontSize: 32, marginRight: 16, cursor: 'pointer' }} />
                    <ContactMailIcon sx={{ fontSize: 32, cursor: 'pointer' }} />
                </div>
            </div>
        </div>
    )
}

export default PopupDetails