'use client';

import { APP_TITLE, CONTACT_MAIL } from '@constants/constants.const';
import { EXTERNAL_LINKS } from '@constants/externalLinks.const';
import { Button } from '@core/ui/Button';
import { TypographyP } from '@core/ui/Typography';
import { Mail, Share2, Twitter } from 'lucide-react';

const SocialList = () => {
  const handleShare = () => {
    navigator?.share({
      text: APP_TITLE,
      url: EXTERNAL_LINKS.PORTALO_URL,
    });
  };

  const handleTwitter = () => {
    window.open(EXTERNAL_LINKS.TWITTER, '_blank');
  };

  const handleMail = () => {
    window.open('mailto:' + CONTACT_MAIL, '_blank');
  };

  const shareIcons = [
    {
      icon: Share2,
      label: 'Share the app!',
      action: handleShare,
    },
    {
      icon: Twitter,
      label: 'Follow us in X!',
      action: handleTwitter,
    },
    {
      icon: Mail,
      label: 'Contact us!',
      action: handleMail,
    },
  ];
  return (
    <div className="space-y-1  py-4">
      {shareIcons.map(({ label, icon: Icon, action }) => (
        <Button
          key={label}
          onClick={action}
          className="bg-default flex w-full items-center justify-start gap-2 text-foreground hover:bg-transparent focus:outline-none active:bg-transparent"
        >
          <Icon />
          <TypographyP className="!mt-0">{label}</TypographyP>
        </Button>
      ))}
    </div>
  );
};

export default SocialList;
