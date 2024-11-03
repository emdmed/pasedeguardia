import { useState } from 'react';
import QRCodeChunk from './qrCodeChunk';
import { chunkData } from './chunkData';
import { Button } from '@/components/ui/button';

const QRCodeDisplay = ({ encryptedData }) => {
  console.log("encryptedData", encryptedData)
  const chunkedData = chunkData(encryptedData);
  const [currentChunk, setCurrentChunk] = useState(0);

  return (
    <div>
      <QRCodeChunk
        data={chunkedData[currentChunk]}
        index={currentChunk}
        totalChunks={chunkedData.length}
      />
      <div className='flex justify-between'>
        <Button
          onClick={() => setCurrentChunk((prev) => Math.max(prev - 1, 0))}
          disabled={currentChunk === 0}
        >
          Previous
        </Button>
        <Button
          onClick={() => setCurrentChunk((prev) => Math.min(prev + 1, chunkedData.length - 1))}
          disabled={currentChunk === chunkedData.length - 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default QRCodeDisplay