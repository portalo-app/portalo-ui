import { Entity } from '@/lib/model/entities';
import styled from '@emotion/styled';
import Chip from '@mui/material/Chip/Chip';
import { FC } from 'react';
import EntityIcon from './EntityIcon';

const EntityIconContainer = styled.div`
  &&,
  img {
    &&,
    svg {
      margin-left: 0;
    }
    width: 1.5em;
    height: 1.5em;
  }
`;

const EntityChip: FC<{ entity: Entity; onDelete: () => void }> = ({
  entity,
  onDelete,
}) => (
  <Chip
    icon={
      <EntityIconContainer>
        <EntityIcon entity={entity.value} />
      </EntityIconContainer>
    }
    label={entity.label}
    variant="outlined"
    size="medium"
    onDelete={onDelete}
    sx={{
      borderColor: entity.color,
      marginY: '1.25em',
      fontSize: '1em',
      padding: '0.25em',
      width: 'fit-content',
    }}
  />
);

export default EntityChip;
