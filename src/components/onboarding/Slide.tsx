import { CarouselNextCustomOnboarding } from '@core/ui/Carousel';
import { Separator } from '@core/ui/Separator';
import { TypographyH2, TypographyP } from '@core/ui/Typography';
import Image from 'next/image';
import { FC } from 'react';

interface SlideProps {
  title: string;
  description: string;
  image: string;
  buttonLabel: string;
}

const Slide: FC<SlideProps> = ({ title, description, image, buttonLabel }) => {
  return (
    <div className="flex flex-col items-center w-full mb-4 p-2 h-96">
      <div className="flex h-64 w-96 justify-center">
        <Image src={image} alt="title" width={300} height={400} />
      </div>

      <TypographyH2 className="mt-4">{title}</TypographyH2>
      <Separator />

      <TypographyP className="text-center my-6">{description}</TypographyP>
      <CarouselNextCustomOnboarding className="w-full">
        {buttonLabel}
      </CarouselNextCustomOnboarding>
    </div>
  );
};

export default Slide;
