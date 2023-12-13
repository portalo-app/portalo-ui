import FormInputText from '@core/components/FormInputText';
import styled from '@emotion/styled';
import { ADDRESS_TYPE } from '@models/address';
import { Entity } from '@models/entities';
import NavigateNext from '@mui/icons-material/NavigateNext';
import { Button, Divider, ListItem, ListItemIcon, Stack } from '@mui/material';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import EntityIcon from './EntityIcon';

interface CustomEntityForm {
  entityName: string;
}

const CustomEntityInput: FC<{
  addressType: ADDRESS_TYPE;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSumbitEntity: (entity: Entity) => void;
}> = ({ addressType, onSumbitEntity }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CustomEntityForm>({
    mode: 'all',
  });

  const [entityValue, entityType] =
    addressType === ADDRESS_TYPE.FIAT
      ? ['DEFAULT_BANK' as Entity['value'], 'Bank']
      : ['DEFAULT_CHAIN' as Entity['value'], 'Chain'];

  const requiredEntityMessage = `${entityType} name is required`;
  const minLengthEntityMessage = `${entityType} name is too short`;
  const maxLengthEntityMessage = `${entityType} name is too long`;

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
        <Stack direction="row" alignItems="center" gap={1}>
          <StyledListItemIcon>
            <EntityIcon entity={entityValue} width="2em" svgWidth="2em" />
          </StyledListItemIcon>
          <Stack paddingTop={3}>
            <FormInputText
              control={control}
              name="entityName"
              error={errors.entityName}
              label={`Other ${entityType}`}
              rules={{
                required: {
                  value: true,
                  message: requiredEntityMessage,
                },
                minLength: { value: 3, message: minLengthEntityMessage },
                maxLength: { value: 20, message: maxLengthEntityMessage },
              }}
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

export default CustomEntityInput;

const StyledListItemIcon = styled(ListItemIcon)`
  display: flex;
  justify-content: center;
  width: 2em;
  height: 2em;
`;
