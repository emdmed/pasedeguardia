import React from 'react';
import QRCode from 'react-qr-code';

const QRCodeChunk = ({ data, index, totalChunks }) => {
    return (
        <div>
            <p>QR Code {index + 1} of {totalChunks}</p>
            <div className='p-3'>
                <QRCode value={data} size={256} />
            </div>
        </div>
    );
}

export default QRCodeChunk;
