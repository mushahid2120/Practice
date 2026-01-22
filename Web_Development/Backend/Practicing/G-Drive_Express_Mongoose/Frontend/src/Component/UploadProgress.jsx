import React from 'react'
import UploadProgressBar from './UploadProgressBar';

function UploadProgress({progress}) {
  return (
              <div className="mb-8 space-y-3">
                <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">
                  Uploading Files
                </h2>
                {Object.entries(progress).map(
                  ([filename, { controller, dataTransfer }], i) => {
                    console.log(filename, controller, dataTransfer);
                    return (
                      <UploadProgressBar
                        filename={filename}
                        controller={controller}
                        dataTransfer={dataTransfer}
                        key={i}
                      />
                    );
                  }
                )}
              </div>
  )
}

export default UploadProgress