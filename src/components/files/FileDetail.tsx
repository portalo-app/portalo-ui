import { QRCodeSVG } from 'qrcode.react';

import FileVariantEntityIcon from '@components/entities/FileVariantEntityIcon';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@core/ui/Accordion';
import { Button } from '@core/ui/Button';
import {
  TypographyH5,
  TypographyMuted,
  TypographyP,
} from '@core/ui/Typography';
import { FileType } from '@models/business/file/fileType';
import { FileDTO } from '@models/dto/file.dto';
import { isValidUrl, removeProtocolFromUrl } from '@utils/utils';
import { Pencil, Share2 } from 'lucide-react';
import Link from 'next/link';

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
  const { title, entity, qrInfo, extraDatapoints } = fileType.getDetailData(
    file.data
  );

  if (!entity) return;

  return (
    <div className="text-center space-y-2 grid place-items-center">
      <div className="px-4 border-2 border-primary p-2 rounded-xl">
        <TypographyH5>{title}</TypographyH5>
      </div>

      <div className="px-4 space-y-2">
        <div className="relative top-7">
          <div className="flex items-center justify-center gap-2 bg-secondary w-40 mx-auto rounded-full p-1">
            <FileVariantEntityIcon entity={entity} />
            <TypographyH5 className="text-primary">
              {entity?.label || ''}
            </TypographyH5>
          </div>
        </div>

        <QRCodeSVG
          includeMargin
          value={qrInfo}
          size={256}
          className="rounded-3xl"
        />

        <div className="flex w-full justify-center py-1">
          {isValidUrl(qrInfo) ? (
            <Link href={qrInfo} target="_blank">
              <TypographyP className="text-blue-500 underline hover:text-blue-700 truncate w-64">
                {removeProtocolFromUrl(qrInfo)}
              </TypographyP>
            </Link>
          ) : (
            <TypographyP className="break-words w-64">{qrInfo}</TypographyP>
          )}
        </div>
      </div>

      {extraDatapoints && extraDatapoints.length > 0 && (
        <Accordion type="single" collapsible className="w-full px-4 pt-4">
          <AccordionItem value="item-1">
            <AccordionTrigger className="py-1">
              <TypographyMuted>More info</TypographyMuted>
            </AccordionTrigger>
            <AccordionContent className="flex justify-start flex-col py-1">
              {extraDatapoints.map((datapoint) => (
                <div key={datapoint.label} className="flex gap-2 my-1">
                  <TypographyMuted className="font-bold">
                    {datapoint.label}:
                  </TypographyMuted>
                  <TypographyMuted className="grow truncate text-left">
                    {datapoint.value}
                  </TypographyMuted>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      <div className="flex gap-2 w-full justify-center pb-3 pt-5">
        <Button
          className="gap-2 w-full"
          variant="outline"
          onClick={navigateToEdit}
        >
          <Pencil size={16} />
          Edit
        </Button>
        <Button className="gap-2 w-full">
          <Share2 size={16} />
          Share
        </Button>
      </div>
    </div>
  );
};

export default FileDetail;
