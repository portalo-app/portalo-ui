import Icon, { IconType } from '@core/ui/Icon';
import { TypographyMutedXS, TypographyXS } from '@core/ui/Typography';
import { CircleHelp, Notebook } from 'lucide-react';
import { FC } from 'react';

interface NewProfileInformationProps {}

const NewProfileInformation: FC<NewProfileInformationProps> = () => {
  const questionText = "What's in a new profile?";

  const profileIncludesText =
    'Your new profile will include the following folders by default:';

  const DefaultTemplateFolders: {
    name: string;
    files: number;
    icon: IconType;
  }[] = [
    {
      name: 'Social',
      files: 0,
      icon: 'MessagesSquare',
    },
    {
      name: 'Address',
      files: 0,
      icon: 'Wallet',
    },
  ];

  return (
    <div>
      <div className="flex items-center gap-1 mb-2">
        <CircleHelp size={18} className="text-muted-foreground" />
        <TypographyMutedXS>{questionText}</TypographyMutedXS>
      </div>

      <div className="border p-4 rounded-2xl">
        <div className="flex items-center mb-4 gap-2">
          <Notebook size={34} className="" />
          <div>
            <TypographyXS className="">Folders</TypographyXS>
            <TypographyMutedXS className="text-muted-foreground">
              Template
            </TypographyMutedXS>
          </div>
        </div>

        <TypographyMutedXS className="flex items-center gap-1 pl-2">
          {profileIncludesText}
        </TypographyMutedXS>
        <div className="space-y-2 mt-2">
          {DefaultTemplateFolders.map(({ name, files, icon }, index) => (
            <DefaultTemplateFolderCard
              name={name}
              files={files}
              icon={icon}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface DefaultTemplateFolderCardProps {
  name: string;
  files: number;
  icon: IconType;
}

const DefaultTemplateFolderCard: React.FC<DefaultTemplateFolderCardProps> = ({
  name,
  files,
  icon,
}) => {
  return (
    <div className="border p-2  rounded-2xl">
      <div className="flex gap-2 items-center">
        <Icon name={icon} size={26} />
        <div className="flex flex-col">
          <TypographyXS>{name}</TypographyXS>
          <TypographyMutedXS>{files} files</TypographyMutedXS>
        </div>
      </div>
    </div>
  );
};

export default NewProfileInformation;
