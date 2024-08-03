/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import DeleteModal from '@core/components/DeleteModal';
import { Button } from '@core/ui/Button';
import { Input } from '@core/ui/Input';
import {
  TypographyH3,
  TypographyH5,
  TypographyMuted,
} from '@core/ui/Typography';
import useProfile from '@hooks/profiles/useProfile';
import { Info, KeyRound, Trash2, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ProfileHeader from './ProfileHeader';

interface ManageAccessProps {
  profileId: string;
}

const ManageAccess: React.FC<ManageAccessProps> = ({ profileId }) => {
  const { getProfileById } = useProfile();
  const profile = getProfileById(profileId);

  const [walletAddress, setWalletAddress] = useState('');
  const [isRevokeModalOpen, setIsRevokeModalOpen] = useState(false);
  const [sharedWallets, setSharedWallets] = useState<string[]>([]);

  useEffect(() => {
    // TODO: Implement fetch of shared wallets
    // setSharedWallets(profile?.sharedWallets || []);
    setSharedWallets(['0x1234567890', '0x0987654321']);
  }, []);

  const handleRevokeModalOpen = (address: string) => {
    // TODO: Implement the logic to remove a wallet address from the sharedWallets state
    setIsRevokeModalOpen(true);
  };

  const handleGrantAccess = () => {
    // TODO: Implement the logic to add a wallet address to the sharedWallets state
    const address = walletAddress;
  };

  const handleRevokeAccess = (address: string) => {
    // TODO: Implement the logic to delete a file
    setIsRevokeModalOpen(false);
  };

  // TODO: Implement loading state while signing transaction and fetching shared wallets
  return (
    <div className="space-y-4">
      <ProfileHeader profile={profile!} />

      <div className="flex items-center gap-2">
        <Users />
        <TypographyH3>Manage Access</TypographyH3>
      </div>

      <div className="flex items-center gap-2">
        <Input
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          placeholder="Enter wallet address"
        />

        <Button className="gap-2" onClick={handleGrantAccess}>
          <KeyRound />
          Grant Access
        </Button>
      </div>

      <div>
        <TypographyH5>Users with access</TypographyH5>
      </div>

      {sharedWallets.length === 0 && (
        <div className="flex items-center gap-2">
          <Info className="text-muted-foreground" />
          <TypographyMuted>
            No users have access to this profile
          </TypographyMuted>
        </div>
      )}

      {sharedWallets.length > 0 && (
        <div className="divide-y-2">
          {sharedWallets.map((address) => (
            <div
              key={address}
              className="flex gap-2 w-full py-2 space-between items-center"
            >
              <TypographyMuted>{address}</TypographyMuted>

              <Button
                variant="ghost"
                className="text-destructive"
                onClick={() => handleRevokeModalOpen(address)}
              >
                <Trash2 />
              </Button>

              <DeleteModal
                message={`Are you sure you want to revoke access to this wallet ${address}?`}
                onDelete={() => (
                  handleRevokeAccess(address), setIsRevokeModalOpen(false)
                )}
                onClose={() => setIsRevokeModalOpen(false)}
                open={isRevokeModalOpen}
                title="Revoke Access"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageAccess;
