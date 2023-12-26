import { Badge } from '@core/ui/Badge';
import { TypographyP } from '@core/ui/Typography';
import { Entity } from '@models/entities';
import { FC } from 'react';
import EntityIcon from './EntityIcon';

const EntityChip: FC<{ entity: Entity }> = ({ entity }) => (
  <Badge className="space-x-2">
    <EntityIcon entity={entity.value} width={50} height={50} />
    <TypographyP className="text-base text-foreground">{entity.label}</TypographyP>
  </Badge>
);

export default EntityChip;
