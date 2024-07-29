'use client';

import FileVariantEntityIcon from '@components/entities/FileVariantEntityIcon';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@core/ui/Accordion';
import { Button } from '@core/ui/Button';
import { Separator } from '@core/ui/Separator';
import {
  TypographyH4,
  TypographyMuted,
  TypographyMutedXS,
} from '@core/ui/Typography';
import { FileType } from '@models/business/file/fileType';
import { FileDTO } from '@models/dto/file.dto';
import { isValidUrl } from '@utils/utils';
import { Check, Copy, FilePen, Globe, Share } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useMemo, useState } from 'react';

interface FileDetailProps {
  file: FileDTO;
  fileType: FileType;
  navigateToEdit: () => void;
}

const FileDetail: React.FC<FileDetailProps> = ({
  file,
  fileType,
  navigateToEdit,
}) => {
  const [isCopying, setIsCopying] = useState(false);

  const { title, entity, qrInfo, link, extraDatapoints } = useMemo(() => {
    return fileType.getDetailData(file.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file.data]);

  if (!entity) return;

  const navigateToExternalLink = (link: string) => {
    window.open(link, '_blank');
  };

  const handleShare = () => {
    navigator?.share({
      text: qrInfo,
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(qrInfo);

    setIsCopying(true);

    setTimeout(() => {
      setIsCopying(false);
    }, 2000);
  };

  return (
    <div className="space-y-2 pb-2">
      {/* TOOLBAR */}
      <div className="flex space-between items-center p-2 rounded">
        <div className="flex items-center gap-2">
          <FileVariantEntityIcon entity={entity} size={42} />

          <div className="text-left">
            <TypographyH4>{entity?.label || ''}</TypographyH4>

            <TypographyMuted>{title || ''}</TypographyMuted>
          </div>
        </div>

        <Button className="gap-2" variant="link" onClick={navigateToEdit}>
          <FilePen size={16} />
          Edit
        </Button>
      </div>

      <Separator />

      {/* QR CODE */}
      <div className="py-6 space-y-2 w-full">
        <QRCodeSVG
          includeMargin
          value={qrInfo}
          size={256}
          className="rounded-md mx-auto border-2"
        />

        <TypographyMutedXS className="text-center break-words">
          {qrInfo}
        </TypographyMutedXS>
      </div>

      {/* MORE INFO */}
      {extraDatapoints && extraDatapoints.length > 0 && (
        <Accordion type="single" collapsible className="w-full pb-4">
          <AccordionItem value="item-1">
            <AccordionTrigger className="py-1">
              <TypographyMuted>See more info</TypographyMuted>
            </AccordionTrigger>

            <AccordionContent className="flex justify-start flex-col py-1">
              {extraDatapoints.map((datapoint) => (
                <div key={datapoint.label} className="flex gap-2 my-1">
                  <TypographyMuted className="font-bold">
                    {datapoint.label}:
                  </TypographyMuted>
                  <TypographyMuted className="break-words text-left">
                    {datapoint.value}
                  </TypographyMuted>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      {/* ACTIONS */}
      <div className="w-full flex flex-col gap-2">
        <div className="flex gap-2 items-center *:w-full *:flex-1">
          <Button onClick={handleCopy} variant="outline">
            {isCopying ? (
              <>
                <Check size={16} className="mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy size={16} className="mr-2" />
                Copy
              </>
            )}
          </Button>

          {link && isValidUrl(link) && (
            <Button
              onClick={() => navigateToExternalLink(link)}
              variant="outline"
            >
              <Globe size={16} className="mr-2" />
              Open in {entity?.label}
            </Button>
          )}
        </div>

        <Button onClick={handleShare}>
          <Share size={16} className="mr-2" />
          Share
        </Button>
      </div>
    </div>
  );
};

export default FileDetail;
