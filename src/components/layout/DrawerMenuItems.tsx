import { NextLinkComposed } from '@/core/components/Link';
import { ROUTES } from '@/lib/constants/routes.const';
import { profilesState } from '@/lib/store/profiles.atom';
import PortaloLogo from '@images/portalo_logo.svg';
import GroupIcon from '@mui/icons-material/Group';
import FAQIcon from '@mui/icons-material/Help';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  Divider,
  ListItemIcon,
  MenuItem,
  MenuList,
  Stack,
  Typography,
} from '@mui/material';
import Avvvatars from 'avvvatars-react';
import { useRecoilValue } from 'recoil';

interface DrawerMenuItemsProps {
  onClick: () => void;
}

const menuItems = [
  {
    label: 'Home',
    href: ROUTES.HOME,
    icon: <HomeIcon />,
  },
  {
    label: 'Profiles',
    href: ROUTES.APP,
    icon: <GroupIcon />,
  },
  {
    label: 'Help',
    href: ROUTES.APP_HELP,
    icon: <FAQIcon />,
  },
  {
    label: 'Settings',
    href: ROUTES.APP,
    icon: <SettingsIcon />,
  },
];

const DrawerMenuItems: React.FC<DrawerMenuItemsProps> = ({ onClick }) => {
  const profiles = useRecoilValue(profilesState);

  const welcomeMessage = 'Hi anon! 👋🏻';
  const profilesCount = profiles?.length || 0;
  const profilesCountMessage = `${profilesCount} profile${
    profilesCount > 1 ? 's' : ''
  }`;
  const noProfilesMessage = 'No profiles yet';

  return (
    <>
      <Stack px={1}>
        <PortaloLogo width="50%" />
      </Stack>

      <Divider />

      <Stack p={2} my={2}>
        <Stack direction="row" alignItems="center" gap={2}>
          <Avvvatars value={profiles.toString()} size={48} style="shape" />

          <Stack>
            <Typography variant="h6">{welcomeMessage}</Typography>

            <Typography variant="caption" color="text.secondary">
              {profilesCount ? profilesCountMessage : noProfilesMessage}
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Divider />

      <MenuList>
        {menuItems.map(({ label, href, icon }) => (
          <MenuItem
            key={label}
            component={NextLinkComposed}
            to={{ pathname: href }}
            onClick={onClick}
          >
            <ListItemIcon>{icon}</ListItemIcon>

            {label}
          </MenuItem>
        ))}
      </MenuList>
    </>
  );
};

export default DrawerMenuItems;
