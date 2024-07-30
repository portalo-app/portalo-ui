'use client';

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNextCustomOnboarding,
} from '@core/ui/Carousel';
import ResponsiveDialog from '@core/ui/ResponsiveDialog';
import { FC, ReactNode, useEffect, useState } from 'react';
import Slide from './Slide';

interface OnboardingProps {
  trigger?: ReactNode;
}

const Onboarding: FC<OnboardingProps> = ({ trigger }) => {
  const [showOnboarding, setShowOnboarding] = useState(false);

  const CarouselItems: {
    title: string;
    description: string;
    buttonLabel: string;
    image: string;
  }[] = [
    {
      title: 'Create a Profile',
      description:
        'With profiles you can easily organize your information and keep everything where it belongs.',
      buttonLabel: 'Next',
      image: '/assets/images/onboarding/profile.svg',
    },
    {
      title: 'Organize your data',
      description:
        'Use your profile folders to store your files. They will be organized by type like socials, addresses and more!',
      buttonLabel: 'Next',
      image: '/assets/images/onboarding/file.svg',
    },
    {
      title: 'Share with anyone',
      description:
        'When you are ready you can securely share your data with anyone you want. Choose between QRs & links.',
      buttonLabel: 'Next',
      image: '/assets/images/onboarding/share.svg',
    },
    {
      title: 'Start your journey!',
      description: 'Setup your first profile and get started using Portalo',
      buttonLabel: 'Get Started!',
      image: '/assets/images/onboarding/get-started.svg',
    },
  ];

  const isOnboardingInLocalStorage = localStorage.getItem('portalo.onboarding');

  if (!isOnboardingInLocalStorage) {
    setShowOnboarding(true);
    localStorage.setItem('portalo.onboarding', 'false');
  }

  useEffect(() => {
    if (trigger) {
      setShowOnboarding(true);
    }
  }, [trigger]);

  return (
    <>
      {showOnboarding && (
        <ResponsiveDialog
          title=""
          isOnboarding={showOnboarding}
          trigger={trigger}
        >
          <Carousel>
            <CarouselContent className="md:w-[480px]">
              {CarouselItems.map(({ title, description, image }, index) => (
                <CarouselItem key={index}>
                  <Slide
                    title={title}
                    description={description}
                    image={image}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselDots />
            <CarouselNextCustomOnboarding className="w-full mt-4">
              Next
            </CarouselNextCustomOnboarding>
          </Carousel>
        </ResponsiveDialog>
      )}
    </>
  );
};

export default Onboarding;
