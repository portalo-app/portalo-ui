'use client';

import { Button } from '@core/ui/Button';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

const CopyButton = ({ text }: { text: string }) => {
  const [isCopying, setIsCopying] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);

    setIsCopying(true);

    setTimeout(() => {
      setIsCopying(false);
    }, 2000);
  };

  return (
    <Button
      className="gap-2"
      variant="outline"
      onClick={handleCopy}
      disabled={isCopying}
    >
      {isCopying ? (
        <>
          <Check size={16} />
          Copied!
        </>
      ) : (
        <>
          <Copy size={16} />
          Copy
        </>
      )}
    </Button>
  );
};

export default CopyButton;
