import Icon, { IconType } from '@core/ui/Icon';
import { Separator } from '@core/ui/Separator';
import { TypographyMutedXS, TypographyXS } from '@core/ui/Typography';
import { CircleHelp, Notebook } from 'lucide-react';
import { FC } from 'react';

interface NewProfileInformationProps {}

const NewProfileInformation: FC<NewProfileInformationProps> = () => {
  const questionText = "What's in a new profile?";

  const profileIncludesText =
    'Your new profile will include the following folders by default:';

  const socialDescription = 'Store your social networks';
  const addressDescription = 'Store your bank and crypto addresses';

  const DefaultTemplateFolders: {
    name: string;
    description: string;
    icon: IconType;
  }[] = [
    {
      name: 'Social',
      description: socialDescription,
      icon: 'MessagesSquare',
    },
    {
      name: 'Address',
      description: addressDescription,
      icon: 'Wallet',
    },
  ];

  return (
    <div>
      <div className="flex items-center gap-1 mb-2">
        <CircleHelp size={18} className="text-muted-foreground" />
        <TypographyMutedXS>{questionText}</TypographyMutedXS>
      </div>

      <Separator />

      <div className="mt-2">
        <div className="flex items-center mb-4 gap-2">
          <Notebook size={30} className="text-muted-foreground" />
          <div>
            <TypographyMutedXS>Folders</TypographyMutedXS>
            <TypographyMutedXS>Template</TypographyMutedXS>
          </div>
        </div>

        <TypographyMutedXS className="flex items-center gap-1">
          {profileIncludesText}
        </TypographyMutedXS>
        <div className="mt-2">
          {DefaultTemplateFolders.map(({ name, icon, description }, index) => (
            <>
              <DefaultTemplateFolderCard
                name={name}
                description={description}
                icon={icon}
                key={index}
              />
              {DefaultTemplateFolders.length - 1 !== index && <Separator />}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

interface DefaultTemplateFolderCardProps {
  name: string;
  description: string;
  icon: IconType;
}

const DefaultTemplateFolderCard: React.FC<DefaultTemplateFolderCardProps> = ({
  name,
  description,
  icon,
}) => {
  return (
    <div className="py-2 rounded-2xl">
      <div className="flex gap-2 items-center">
        <Icon name={icon} size={26} />
        <div className="flex flex-col">
          <TypographyXS>{name}</TypographyXS>
          <TypographyMutedXS>{description}</TypographyMutedXS>
        </div>
      </div>
    </div>
  );
};

export default NewProfileInformation;
