import EntityIcon from '@components/entities/EntityIcon';
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
import { Entity } from '@models/profile';
import { Pencil, Share2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import React from 'react';

interface FileDetailProps {
  mainData: string;
  secondaryData: string;
  entity: Entity;
  navigateToEdit: () => void;
  alias?: string;
  notes?: string;
}

const FileDetail: React.FC<FileDetailProps> = ({
  mainData,
  secondaryData,
  entity,
  navigateToEdit,
  alias,
  notes,
}) => {
  return (
    <div className="text-center space-y-2 grid place-items-center">
      <div className="px-4 border-2 border-primary p-2 rounded-xl">
        <TypographyH5>{mainData}</TypographyH5>
      </div>

      <div className="px-4 space-y-2">
        <div className="relative top-7">
          <div className="flex items-center justify-center gap-2 bg-secondary w-40 mx-auto rounded-full p-1">
            <EntityIcon entity={entity?.value || ''} width={30} height={30} />
            <TypographyH5 className="text-primary">
              {entity?.label || ''}
            </TypographyH5>
          </div>
        </div>

        <QRCodeSVG
          includeMargin
          value={secondaryData}
          size={256}
          className="rounded-3xl"
        />

        <TypographyMuted className="break-words w-64">
          {secondaryData}
        </TypographyMuted>
      </div>

      <Accordion type="single" collapsible className="w-full px-4 pt-4">
        <AccordionItem value="item-1">
          <AccordionTrigger className="py-1">
            <TypographyMuted>More info</TypographyMuted>
          </AccordionTrigger>
          <AccordionContent className="flex justify-start flex-col">
            {alias && (
              <div className="flex items-center gap-2">
                <TypographyP>Alias:</TypographyP>
                <TypographyMuted className="w-60 break-words text-left">
                  {alias}
                </TypographyMuted>
              </div>
            )}
            {notes && (
              <div className="flex gap-2">
                <TypographyP>Notes:</TypographyP>
                <TypographyMuted className="w-60 break-words text-left pt-1">
                  {notes}
                </TypographyMuted>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

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
