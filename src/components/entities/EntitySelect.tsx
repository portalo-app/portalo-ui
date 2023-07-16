import { ROUTES } from '@/lib/constants/routes.const';
import { AddressType } from '@/lib/model/address';
import { Entity, banks, chains } from '@/lib/model/entities';
import { addressFormState } from '@/lib/store/address-form.atom';
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Stack,
  Typography,
  styled,
} from '@mui/material';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useRecoilState } from 'recoil';
import EntityIcon from './EntityIcon';

interface EntitySelectProps {
  profileId: string;
  entityType: AddressType;
}

const StyledListItemIcon = styled(ListItemIcon)`
  display: flex;
  justify-content: center;

  &&,
  img {
    width: 2em;
    height: 2em;
  }
`;

const EntitySelect: FC<EntitySelectProps> = ({ entityType, profileId }) => {
  const router = useRouter();
  const [_, setAddressFormState] = useRecoilState(addressFormState);
  const handleEntityClick = (entity: Entity) => {
    setAddressFormState((current) => ({ ...current, entity }));

    router.push(`${ROUTES.APP_CREATE_ADDRESS}/${profileId}/${entityType}`);
  };

  return (
    <List sx={{ height: '70vh', overflow: 'auto' }}>
      {(entityType === 'CRYPTO' ? chains : banks).map((entity) => (
        <>
          <ListItem key={entity.value} sx={{ paddingLeft: 0 }}>
            <ListItemButton onClick={() => handleEntityClick(entity)}>
              <StyledListItemIcon>
                <EntityIcon entity={entity?.value} />
              </StyledListItemIcon>
              <Stack marginLeft={1}>
                <Typography variant="h6">{entity.label}</Typography>
                <Typography variant="subtitle2" sx={{ margin: 0 }}>
                  {entity.value}
                </Typography>
              </Stack>
            </ListItemButton>
          </ListItem>
          <Divider />
        </>
      ))}
    </List>
  );
};

export default EntitySelect;
