import { TypographyH2, TypographyP } from '@core/ui/Typography';
import Image from 'next/image';
import { FC } from 'react';

interface SlideProps {
  title: string;
  description: string;
  image: string;
}

const Slide: FC<SlideProps> = ({ title, description, image }) => {
  return (
    <div className="flex flex-col items-center w-full mb-4 p-2 h-96">
      <div className="flex h-64 w-96 justify-center mb-2">
        <Image src={image} alt="title" width={300} height={400} />
      </div>

      <TypographyH2 className="">{title}</TypographyH2>

      <TypographyP className="text-center !mt-1">{description}</TypographyP>
    </div>
  );
};

export default Slide;
