'use client';

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from '@core/ui/Carousel';
import ResponsiveDialog from '@core/ui/ResponsiveDialog';
import { FC, useState } from 'react';
import Slide from './Slide';

interface OnboardingProps {}

const Onboarding: FC<OnboardingProps> = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);

  const onboardingTitle = 'Welcome to Portalo! 🎉 ';

  const CarouselItems: {
    title: string;
    description: string;
    buttonLabel: string;
    image: string;
  }[] = [
    {
      title: 'Create a Profile',
      description: 'Begin your journey by creating a personalized profile',
      buttonLabel: 'Next',
      image: '/assets/images/onboarding/profile.svg',
    },
    {
      title: 'Organize your data',
      description: 'Keep your information organized and easily accessible.',
      buttonLabel: 'Next',
      image: '/assets/images/onboarding/file.svg',
    },
    {
      title: 'Share with anyone',
      description: 'Easily share your data with anyone, anytime.',
      buttonLabel: 'Get Started!',
      image: '/assets/images/onboarding/share.svg',
    },
  ];

  const isOnboardingInLocalStorage = localStorage.getItem('onboarding');

  if (!isOnboardingInLocalStorage) {
    setShowOnboarding(true);
    localStorage.setItem('onboarding', 'false');
  }

  return (
    <>
      {showOnboarding && (
        <ResponsiveDialog title={onboardingTitle} isOnboarding={showOnboarding}>
          <Carousel>
            <CarouselContent className="md:w-[480px]">
              {CarouselItems.map(
                ({ title, description, image, buttonLabel }, index) => (
                  <CarouselItem key={index}>
                    <Slide
                      title={title}
                      description={description}
                      image={image}
                      buttonLabel={buttonLabel}
                    />
                  </CarouselItem>
                )
              )}
            </CarouselContent>
            <CarouselDots />
          </Carousel>
        </ResponsiveDialog>
      )}
    </>
  );
};

export default Onboarding;
