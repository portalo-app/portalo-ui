import useAnalytics from '@hooks/googleAnalytics/useAnalytics';
import { Profile } from '@models/business/profile';
import { User } from '@models/business/user';
import { ProfileDTO } from '@models/dto/profile.dto';
import { ShortcutDTO } from '@models/dto/shortcut.dto';
import { mapperProfileToProfileDTO } from '@models/mappers/profileMapper';
import { profilesState } from '@states/profiles.atom';
import { shortcutsState } from '@states/shortcuts.atom';
import { useRecoilState, useSetRecoilState } from 'recoil';

type CreateProfile = (name: string) => void;
type DeleteProfile = (id: string) => void;
type EditProfile = (id: string, name: string) => void;
type GetProfileById = (id: string) => ProfileDTO | undefined;
type GetProfilesByUser = (user: User) => ProfileDTO[] | undefined;

/**
 * Custom hook to manage profiles.
 * Provides functions to create, delete, edit, and get profiles.
 */
const useProfile = () => {
  const { trackCreateProfile, trackDeleteProfile, trackEditProfile } =
    useAnalytics();
  const [profiles, setProfiles] = useRecoilState(profilesState);

  const setShortcuts = useSetRecoilState(shortcutsState);

  /**
   * Creates a new profile.
   * @param name - The name of the new profile.
   */
  const createProfile: CreateProfile = (name: string) => {
    const profile = new Profile(name);

    setProfiles((profiles) => [
      ...profiles,
      mapperProfileToProfileDTO(profile),
    ]);
    trackCreateProfile(profile.id);
  };

  /**
   * Deletes a profile by ID and the shortcuts associated with that profile
   * @param id - The ID of the profile to delete.
   */
  const deleteProfile: DeleteProfile = (id: string) => {
    setProfiles((profiles) => profiles.filter((profile) => profile.id !== id));

    setShortcuts((shortcuts: ShortcutDTO[]) =>
      shortcuts.filter((shortcut) => shortcut.profileId !== id)
    );

    trackDeleteProfile(id);
  };

  /**
   * Edits a profile by ID.
   * @param id - The ID of the profile to edit.
   * @param name - The new name of the profile.
   */
  const editProfile: EditProfile = (id: string, name: string) => {
    const newProfiles = profiles.map((profile) => {
      if (profile.id === id) {
        return {
          ...profile,
          name,
        };
      }
      return profile;
    });

    trackEditProfile(id);
    setProfiles(newProfiles);
  };

  /**
   * Retrieves a profile by ID.
   * @param id - The ID of the profile to retrieve.
   * @returns The profile with the specified ID, or undefined if not found.
   */
  const getProfileById: GetProfileById = (id: string) =>
    profiles.find((profile) => profile.id === id);

  const getProfilesByUser: GetProfilesByUser = (user: User): ProfileDTO[] => {
    return profiles.filter((profile) => profile.id === user.id);
  };

  return {
    createProfile,
    deleteProfile,
    editProfile,
    getProfileById,
    getProfilesByUser,
  };
};

export default useProfile;
