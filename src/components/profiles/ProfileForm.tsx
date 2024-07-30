import AnimatedButton from '@core/ui/AnimatedButton';
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
import { TypographyH3, TypographyMuted } from '@core/ui/Typography';
import { zodResolver } from '@hookform/resolvers/zod';
import useProfile from '@hooks/profiles/useProfile';
import { ProfileDTO } from '@models/dto/profile.dto';
import { UserRound } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import NewProfileInformation from './NewProfileInformation';

interface ProfileFormProps {
  action: 'CREATE' | 'EDIT';
  onComplete?: () => void;
  profile?: ProfileDTO;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  action,
  profile,
  onComplete,
}) => {
  const { createProfile, editProfile } = useProfile();

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
    <div className="space-y-2">
      <div>
        <div className="flex gap-2 items-center">
          <UserRound size={22} />
          <TypographyH3 className="!p-0">Create Profile</TypographyH3>
        </div>
        <TypographyMuted className="mt-2">{description}</TypographyMuted>
      </div>

      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mt-6">
                <FormLabel className="flex items-center gap-1">
                  <UserRound size={16} />
                  {nameLabel}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="profile..."
                    className="rounded-xl"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <NewProfileInformation />

          <AnimatedButton type="submit" className="!mt-6 w-full">
            {actionLabel}
          </AnimatedButton>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
