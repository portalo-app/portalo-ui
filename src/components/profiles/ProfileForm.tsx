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
import { Profile } from '@models/profile';
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
      name: z.string().min(4).max(30),
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
    <div className="p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-5"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{nameLabel}</FormLabel>
                <FormControl>
                  <Input
                    placeholder="name"
                    {...field}
                    className=" focus:border-primary ring-primary w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center content-center">
            <Button type="submit" className="mt-4 w-[250px]">
              {actionLabel}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
