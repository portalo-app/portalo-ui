import { Button } from '@/core/ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/core/ui/Form';
import { Input } from '@/core/ui/Input';
import useCreateProfile from '@/lib/hooks/profiles/useCreateProfile';
import useEditProfile from '@/lib/hooks/profiles/useEditProfile';
import { Profile } from '@/lib/model/profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface ProfileFormProps {
  action: 'CREATE' | 'EDIT';
  onComplete?: () => void;
  profile?: Profile;
}

type FormData = {
  name: string;
  password: string;
};

const ProfileForm: React.FC<ProfileFormProps> = ({
  action,
  profile,
  onComplete,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const createProfile = useCreateProfile();
  const editProfile = useEditProfile();

  const actionLabel = action === 'CREATE' ? 'Create' : 'Edit';
  const nameLabel = 'Name';
  const passwordLabel = 'Password';

  const formSchema = z
    .object({
      name: z.string().min(4).max(30),
      password: z.string().min(4).max(30),
    })
    .required();

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    event.currentTarget.focus();
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: profile ? profile.name : '',
      password: profile ? profile.password : '',
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const { name, password } = data;
    console.log(data);
    // TODO: Add password as param
    if (action === 'CREATE') {
      createProfile(name, password);
    } else {
      if (!profile?.id) return;

      editProfile(profile?.id || '', name, password);
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{passwordLabel}</FormLabel>
                <FormControl>
                  <Input
                    placeholder="password"
                    {...field}
                    className="focus:border-primary ring-primary"
                    type="password"
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
