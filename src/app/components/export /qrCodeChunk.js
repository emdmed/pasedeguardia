import React from 'react';
import QRCode from 'react-qr-code';

const QRCodeChunk = ({ data, index, totalChunks }) => {
    return (
        <div>
            <p>Codigo Qr {index + 1} de {totalChunks}</p>
            <div style={{padding: 20}}>
                <QRCode  value={data} size={256} />
            </div>
        </div>
    );
}

export default QRCodeChunk;
