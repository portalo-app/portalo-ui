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
import { zodResolver } from '@hookform/resolvers/zod';
import useCreateProfile from '@hooks/profiles/useCreateProfile';
import useEditProfile from '@hooks/profiles/useEditProfile';
import { Profile } from '@models/business/profile';
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

  const actionLabel = action === 'CREATE' ? 'Create' : 'Edit';
  const nameLabel = 'Name';

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
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{nameLabel}</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-4">
            {actionLabel}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
