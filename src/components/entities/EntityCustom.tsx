import FormInputText from '@/core/components/FormInputText';
import { ADDRESS_TYPE } from '@/lib/model/address';
import { Entity } from '@/lib/model/entities';
import styled from '@emotion/styled';
import NavigateNext from '@mui/icons-material/NavigateNext';
import { Button, Divider, ListItem, ListItemIcon, Stack } from '@mui/material';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import EntityIcon from './EntityIcon';

const StyledListItemIcon = styled(ListItemIcon)`
  display: flex;
  justify-content: center;
  width: 2em;
  height: 2em;
`;

interface CustomEntityForm {
  entityName: string;
}

const EntityCustom: FC<{
  addressType: ADDRESS_TYPE;
  onSumbitEntity: (entity: Entity) => void;
}> = ({ addressType, onSumbitEntity }) => {
  const { handleSubmit, control } = useForm<CustomEntityForm>({
    mode: 'all',
  });

  const entityValue =
    addressType === ADDRESS_TYPE.FIAT ? 'DEFAULT_BANK' : 'DEFAULT_CHAIN';

  const onSubmit = ({ entityName }: CustomEntityForm) => {
    onSumbitEntity({
      label: entityName,
      value: entityValue,
      color: 'gray',
      icon: entityValue,
    });
  };

  return (
    <>
      <ListItem>
        <Stack direction="row" alignItems="center" paddingY={1.65}>
          <StyledListItemIcon>
            <EntityIcon entity={entityValue} width="2em" svgWidth="2em" />
          </StyledListItemIcon>
          <Stack marginLeft={1}>
            <FormInputText
              control={control}
              name="entityName"
              label={`Other ${
                addressType === ADDRESS_TYPE.FIAT ? 'bank' : 'chain'
              }`}
              rules={{
                required: { value: true, message: '' },
                maxLength: { value: 50, message: '' },
              }}
              withHelperText={false}
            />
          </Stack>
          <Button
            variant="text"
            color="inherit"
            onClick={handleSubmit(onSubmit)}
          >
            <NavigateNext />
          </Button>
        </Stack>
      </ListItem>
      <Divider />
    </>
  );
};

export default EntityCustom;
