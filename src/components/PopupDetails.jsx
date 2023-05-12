import React from 'react'

function PopupDetails({selectedMarker}) {
  return (
    <div id="defaultModal" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div className="relative w-full max-w-2xl max-h-full">

        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h6 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {selectedMarker.properties.description}
                </h6>
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                    <svg aria-hidden="true" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                    </svg>

                    <span className="sr-only">Directions</span>
                </button>
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
    </div>
</div>
  )
}

export default PopupDetails