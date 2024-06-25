import { Button } from '@core/ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@core/ui/Form';
import { Input } from '@core/ui/Input';
import { Separator } from '@core/ui/Separator';
import { TypographyH4, TypographyP } from '@core/ui/Typography';
import { zodResolver } from '@hookform/resolvers/zod';
import useCreateProfile from '@hooks/profiles/useCreateProfile';
import useEditProfile from '@hooks/profiles/useEditProfile';
import { Profile } from '@models/profile';
import { UserRound } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface ProfileFormProps {
  action: 'CREATE' | 'EDIT';
  onComplete?: () => void;
  profile?: Profile;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  action,
  profile,
  onComplete,
}) => {
  const createProfile = useCreateProfile();
  const editProfile = useEditProfile();

  const description = 'Create a profile to store folders inside.';
  const actionLabel = action === 'CREATE' ? '+ Create Profile' : 'Edit Profile';
  const nameLabel = 'Profile Name';

  const formSchema = z
    .object({
      name: z
        .string()
        .min(1, { message: 'Name must be at least 1 characters long.' })
        .max(20, { message: 'Name must be at most 20 characters long.' }),
    })
    .required();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: profile?.name || '',
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const { name } = data;
    if (action === 'CREATE') {
      createProfile(name);
    } else {
      if (!profile?.id) return;

      editProfile(profile?.id || '', name);
    }

    onComplete && onComplete();
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <UserRound />
        <TypographyH4>Add Profile</TypographyH4>
      </div>

      <TypographyP>{description}</TypographyP>

      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{nameLabel}</FormLabel>
                <FormControl>
                  <Input placeholder="My Profile" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-4 w-full">
            {actionLabel}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
