import { Badge } from '@/core/ui/Badge';
import { Entity } from '@/lib/model/entities';
import { FC } from 'react';
import EntityIcon from './EntityIcon';

const EntityChip: FC<{ entity: Entity }> = ({ entity }) => (
  <Badge className="space-x-2">
    <EntityIcon entity={entity.value} width={50} height={50} />
    <p className="text-base text-foreground">{entity.label}</p>
  </Badge>
);

export default EntityChip;
