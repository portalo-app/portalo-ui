'use client';

import { APP_TITLE, CONTACT_MAIL } from '@constants/constants.const';
import { EXTERNAL_LINKS } from '@constants/externalLinks.const';
import { Button } from '@core/ui/Button';
import { TypographyP } from '@core/ui/Typography';
import { useToast } from '@core/ui/use-toast';
import useAnalytics from '@hooks/googleAnalytics/useAnalytics';
import { Mail, Share2, Twitter } from 'lucide-react';

const SocialList = () => {
  const { trackShareAppClicked, trackTwitterClicked } = useAnalytics();
  const { toast } = useToast();

  const handleShare = () => {
    trackShareAppClicked();

    if (navigator?.share) {
      navigator?.share({
        text: APP_TITLE,
        url: EXTERNAL_LINKS.PORTALO_URL,
      });
      return;
    }

    navigator.clipboard.writeText(EXTERNAL_LINKS.PORTALO_URL);
    toast({
      title: 'Link copied!',
      description: 'Share the app with your friends!',
    });
  };

  const handleTwitter = () => {
    trackTwitterClicked();
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
          className="bg-default flex w-full items-center justify-start gap-2 text-foreground hover:bg-primary/5 focus:outline-none active:bg-transparent  rounded-none"
        >
          <Icon />
          <TypographyP className="!mt-0 text-base font-light">
            {label}
          </TypographyP>
        </Button>
      ))}
    </div>
  );
};

export default SocialList;
