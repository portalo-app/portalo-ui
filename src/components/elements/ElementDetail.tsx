import EntityIcon from '@components/entities/EntityIcon';
import { Button } from '@core/ui/Button';
import { TypographyH5, TypographyMuted } from '@core/ui/Typography';
import { Entity } from '@models/space';
import { Pencil } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import React from 'react';

interface ElementDetailProps {
  mainData: string;
  secondaryData: string;
  entity: Entity;
  navigateToEdit: () => void;
}

const ElementDetail: React.FC<ElementDetailProps> = ({
  mainData,
  secondaryData,
  entity,
  navigateToEdit,
}) => {
  return (
    <div className="text-center space-y-4 grid place-items-center">
      <div className="flex items-center gap-2">
        <EntityIcon entity={entity?.value || ''} width={24} height={24} />
        <TypographyH5>{entity?.label || ''}</TypographyH5>
      </div>

      <div className="bg-muted rounded-md p-4 px-8 space-y-2">
        <TypographyH5>{mainData}</TypographyH5>

        <QRCodeSVG
          includeMargin
          value={secondaryData}
          size={256}
          className="rounded-3xl"
        />

        <TypographyMuted>{secondaryData}</TypographyMuted>
      </div>

      <Button
        variant="outline"
        className="w-full gap-2"
        onClick={navigateToEdit}
      >
        <Pencil size={16} />
        Edit
      </Button>
    </div>
  );
};

export default ElementDetail;
