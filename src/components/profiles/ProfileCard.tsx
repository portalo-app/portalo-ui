import AnimatedModal from '@/core/components/AnimatedModal';
import { ROUTES } from '@/lib/constants/routes.const';
import { Profile } from '@/lib/model/profile';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Card,
  CardActionArea,
  CardContent,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import PageLayout from '../layout/PageLayout';
import DeleteProfileModal from './DeleteProfileModal';
import ProfileForm from './ProfileForm';

interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const margin = 2;
  const cryptoLabel = 'CRYPTO';
  const fiatLabel = 'FIAT';

  const { id, name, cryptoAddresses, fiatAddresses } = profile;
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const router = useRouter();

  const handleMenuClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();

    setAnchorEl(event.currentTarget);
  };

  const handleEdit = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    setAnchorEl(null);
    setIsEditing(true);
  };

  const handleDelete = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    setAnchorEl(null);
    setIsDeleting(true);
  };

  return (
    <>
      <Card elevation={2}>
        <CardActionArea
          disableRipple
          component="div"
          onClick={() => router.push(`${ROUTES.APP_PROFILE}/${id}`)}
        >
          <CardContent>
            <Stack
              direction="row"
              mb={margin}
              alignItems="center"
              justifyContent="space-between"
              gap={margin}
            >
              <Stack direction="row" alignItems="center" gap={1}>
                <Typography variant="h6" fontWeight="bold">
                  {name}
                </Typography>
              </Stack>

              <IconButton onClick={(event) => handleMenuClick(event)}>
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </Stack>

            <Divider sx={{ mx: -margin }} />

            <Stack direction="row" mt={margin} gap={margin}>
              <Stack flex="1" direction="row" alignItems="center" gap={1}>
                <MonetizationOnIcon color="disabled" fontSize="large" />

                <Stack>
                  <Typography variant="mono" fontWeight="bold">
                    {cryptoAddresses.length}
                  </Typography>

                  <Typography variant="caption">{cryptoLabel}</Typography>
                </Stack>
              </Stack>

              <Stack flex="1" direction="row" alignItems="center" gap={1}>
                <AccountBalanceIcon color="disabled" fontSize="large" />

                <Stack>
                  <Typography variant="mono" fontWeight="bold">
                    {fiatAddresses.length}
                  </Typography>

                  <Typography variant="caption">{fiatLabel}</Typography>
                </Stack>
              </Stack>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>

      <DeleteProfileModal
        profile={profile}
        open={isDeleting}
        onClose={() => setIsDeleting(false)}
      />

      <AnimatedModal open={isEditing} onClose={() => setIsEditing(false)}>
        <Paper sx={{ p: 2 }}>
          <PageLayout title="Edit Profile">
            <ProfileForm
              profile={profile}
              action="EDIT"
              onComplete={() => setIsEditing(false)}
            />
          </PageLayout>
        </Paper>
      </AnimatedModal>

      <MenuItems
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default ProfileCard;

const MenuItems: React.FC<any> = ({
  anchorEl,
  setAnchorEl,
  handleEdit,
  handleDelete,
}) => {
  const editLabel = 'Edit';
  const deleteLabel = 'Delete';

  return (
    <Menu
      id="profile-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={() => setAnchorEl(null)}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <MenuList>
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>

          <ListItemText>{editLabel}</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon color="error" fontSize="small" />
          </ListItemIcon>

          <ListItemText primaryTypographyProps={{ color: 'error' }}>
            {deleteLabel}
          </ListItemText>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
