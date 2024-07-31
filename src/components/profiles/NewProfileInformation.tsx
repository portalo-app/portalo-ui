import HomeCard from '@core/components/HomeCard';
import Icon, { IconType } from '@core/ui/Icon';
import { TypographyMutedXS } from '@core/ui/Typography';
import { DEFAULT_FOLDERS_INFORMATION } from '@states/app/app.data';
import { Folder } from 'lucide-react';
import { FC } from 'react';

interface NewProfileInformationProps {}

const NewProfileInformation: FC<NewProfileInformationProps> = () => {
  const description = 'Your profile will include the following folders';

  return (
    <div>
      <HomeCard
        title="Your Folders"
        href=""
        icon={<Folder />}
        hasData={true}
        listToShow={
          <div className="divide-y-2">
            {DEFAULT_FOLDERS_INFORMATION.map(
              ({ name, icon, description }, index) => (
                <DefaultTemplateFolderCard
                  name={name}
                  description={description}
                  icon={icon}
                  key={index}
                />
              )
            )}
          </div>
        }
        stateComponent={
          <TypographyMutedXS className="flex items-center gap-1 mb-2">
            {description}
          </TypographyMutedXS>
        }
      />
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
    <div className="py-2 flex gap-2 items-center">
      <Icon name={icon} className="text-muted-foreground" />

      <div className="flex flex-col">
        <TypographyMutedXS>{name}</TypographyMutedXS>
        <TypographyMutedXS>{description}</TypographyMutedXS>
      </div>
    </div>
  );
};

export default NewProfileInformation;
