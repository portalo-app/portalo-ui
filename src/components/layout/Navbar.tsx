'use client';

import { ROUTES, ROUTES_LAYOUT } from '@constants/routes.const';
import DeleteModal from '@core/components/DeleteModal';
import {
  MEDIAQUERY_DESKTOP,
  useMediaQuery,
} from '@hooks/general/useMediaQuery';
import { spacesState } from '@states/spaces.atom';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useResetRecoilState } from 'recoil';
import AppLogo from './AppLogo';
import FeatureHeader from './FeatureHeader';
import Sidebar from './Sidebar';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const resetSpaces = useResetRecoilState(spacesState);
  const [resetAccountModalOpen, setResetAccountModalOpen] = useState(false);
  const router = useRouter();

  const isDesktop = useMediaQuery(MEDIAQUERY_DESKTOP);
  const pathname = usePathname();
  const currentRoute = ROUTES_LAYOUT.find((route) => route.url === pathname);

  const resetAccountLabel = 'Reset Account';
  const resetAccountMessage =
    'Are you sure you want to clear the account data? This will remove every Space and all the data associated with them. This action cannot be undone.';

  const resetAccount = () => {
    router.push(ROUTES.APP);
    resetSpaces();

    setResetAccountModalOpen(false);
  };

  const handleResetAccountModal = () => {
    setResetAccountModalOpen(!resetAccountModalOpen);
  };

  return (
    <>
      <div className="sticky top-0 z-50 flex w-full items-center justify-between bg-muted p-1 pl-2">
        {currentRoute?.url === ROUTES.APP ? (
          <Link href={ROUTES.APP}>
            <AppLogo />
          </Link>
        ) : (
          <FeatureHeader title={currentRoute?.title ?? ''} />
        )}

        {isDesktop ? (
          <Sidebar
            handleResetAccountModal={handleResetAccountModal}
            resetAccountLabel={resetAccountLabel}
          />
        ) : null}

        <DeleteModal
          title={resetAccountLabel}
          message={resetAccountMessage}
          open={resetAccountModalOpen}
          onClose={handleResetAccountModal}
          onDelete={resetAccount}
        />
      </div>
    </>
  );
};

export default Navbar;
