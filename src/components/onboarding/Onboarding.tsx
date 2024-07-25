'use client';

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNextCustomOnboarding,
} from '@core/ui/Carousel';
import ResponsiveDialog from '@core/ui/ResponsiveDialog';
import { TypographyH3, TypographyP } from '@core/ui/Typography';
import { LucideIcon, Share, User, Wallet } from 'lucide-react';
import { FC, useState } from 'react';

interface OnboardingProps {}

const Onboarding: FC<OnboardingProps> = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);

  const onboardingTitle = 'Welcome to Portalo! 🎉 ';

  const CarouselItems: {
    title: string;
    description: string;
    buttonLabel: string;
    icon: LucideIcon;
  }[] = [
    {
      title: 'Create a Profile',
      description: 'Begin your journey by creating a personalized profile',
      buttonLabel: 'Next',
      icon: User,
    },
    {
      title: 'Organize your data',
      description: 'Keep your information organized and easily accessible.',
      buttonLabel: 'Next',
      icon: Wallet,
    },
    {
      title: 'Share with anyone',
      description: 'Easily share your data with anyone, anytime.',
      buttonLabel: 'Get Started!',
      icon: Share,
    },
  ];

  const isOnboardingInLocalStorage = localStorage.getItem('onboarding');

  if (!isOnboardingInLocalStorage) {
    setShowOnboarding(true);
    localStorage.setItem('onboarding', 'false');
  }

  return (
    <div>
      {showOnboarding && (
        <ResponsiveDialog title={onboardingTitle} isOnboarding={showOnboarding}>
          <Carousel>
            <CarouselContent className="lg:w-[480px]">
              {CarouselItems.map(
                ({ title, description, icon, buttonLabel }, index) => (
                  <CarouselItem key={index}>
                    <Slide
                      title={title}
                      description={description}
                      icon={icon}
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
    </div>
  );
};

interface SlideProps {
  title: string;
  description: string;
  icon: any;
  buttonLabel: string;
}

const Slide: FC<SlideProps> = ({
  title,
  description,
  icon: Icon,
  buttonLabel,
}) => {
  return (
    <div className="flex flex-col space-y-6 items-center w-full mb-4 p-2">
      <Icon size={80} />
      <TypographyH3>{title}</TypographyH3>

      <TypographyP>{description}</TypographyP>
      <CarouselNextCustomOnboarding className="w-full">
        {buttonLabel}
      </CarouselNextCustomOnboarding>
    </div>
  );
};

export default Onboarding;
