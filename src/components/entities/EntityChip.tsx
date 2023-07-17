import { Entity } from '@/lib/model/entities';
import styled from '@emotion/styled';
import Chip from '@mui/material/Chip';
import { FC } from 'react';
import EntityIcon from './EntityIcon';

const EntityIconContainer = styled.div`
  &&,
  img {
    width: 1.5em;
    height: 1.5em;
  }
`;

const EntityChip: FC<{ entity: Entity; onClick: () => void }> = ({
  entity,
  onClick,
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
