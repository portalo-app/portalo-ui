'use client';

import { ROUTES } from '@constants/routes.const';
import { Button } from '@core/ui/Button';
import { TypographyP } from '@core/ui/Typography';
import { profilesState } from '@states/profiles.atom';
import { shortcutsState } from '@states/shortcuts.atom';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useResetRecoilState } from 'recoil';
import DeleteModal from './DeleteModal';

const ResetAccountButton = () => {
  const [resetAccountModalOpen, setResetAccountModalOpen] = useState(false);
  const resetProfiles = useResetRecoilState(profilesState);
  const resetShortcuts = useResetRecoilState(shortcutsState);
  const router = useRouter();

  const resetAccountLabel = 'Reset Account';
  const resetAccountMessage =
    'Are you sure you want to clear the account data? This will remove every Profile and all the data associated with them. This action cannot be undone.';

  const resetAccount = () => {
    router.push(ROUTES.APP);
    resetProfiles();
    resetShortcuts();

    setResetAccountModalOpen(false);
  };

  const handleResetAccountModal = () => {
    setResetAccountModalOpen(!resetAccountModalOpen);
  };

  return (
    <div>
      <Button
        variant="ghost"
        className="hover:text-destructive  hover:border-none hover:bg-destructive/5 hover:brightness-200 w-full rounded-none flex justify-start"
        onClick={handleResetAccountModal}
      >
        <Trash2 className="mr-2" />

        <TypographyP className="!m-0 text-base font-light">
          {resetAccountLabel}
        </TypographyP>
      </Button>

      <DeleteModal
        title={resetAccountLabel}
        message={resetAccountMessage}
        open={resetAccountModalOpen}
        onClose={handleResetAccountModal}
        onDelete={resetAccount}
      />
    </div>
  );
};

export default ResetAccountButton;
