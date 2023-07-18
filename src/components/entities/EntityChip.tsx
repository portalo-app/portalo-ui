import { Entity } from '@/lib/model/entities';
import Chip from '@mui/material/Chip';
import { FC } from 'react';
import EntityIcon from './EntityIcon';

const EntityChip: FC<{ entity: Entity; onClick: () => void }> = ({
  entity,
  onClick,
}) => (
  <Chip
    icon={
      <EntityIcon
        entity={entity.value}
        width="1.5rem"
        height="1.5rem"
        svgWidth="1.5rem"
        svgHeight="1.5rem"
      />
    }
    label={entity.label}
    variant="outlined"
    size="medium"
    onClick={onClick}
    sx={{
      borderWidth: 0,
      marginY: '1rem',
      fontSize: '1rem',
      padding: '1rem',
    }}
  />
);

export default EntityChip;
