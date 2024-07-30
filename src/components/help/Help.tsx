import Onboarding from '@components/onboarding/Onboarding';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@core/ui/Accordion';
import { Button } from '@core/ui/Button';
import { TypographySmall } from '@core/ui/Typography';
import { cn } from '@utils/utils';

const Help = () => {
  const faqs: {
    question: string;
    answer: string;
    ctaAnswer?: boolean;
  }[] = [
    {
      question: 'How do I start?',
      answer: 'Click here to get started!',
      ctaAnswer: true,
    },
    {
      question: 'How do I create a profile?',
      answer: 'Click on the "Create Profile" button on the Profile page.',
    },
    {
      question: 'How do I edit a profile?',
      answer: 'Click on the "Edit" button on the Profile page.',
    },
    {
      question: 'How do I delete a profile?',
      answer: 'Click on the "Delete" button on the Profile page.',
    },
  ];

  return (
    <>
      {faqs.map(({ question, answer, ctaAnswer }, index) => (
        <Accordion key={index} type="single" collapsible>
          <AccordionItem value={index.toString()}>
            <AccordionTrigger>{question}</AccordionTrigger>

            <AccordionContent className={cn(ctaAnswer && 'pb-0')}>
              {ctaAnswer ? (
                <Onboarding
                  trigger={
                    <Button
                      variant={'link'}
                      size={'sm'}
                      className="p-0 flex items-start"
                    >
                      {answer}
                    </Button>
                  }
                />
              ) : (
                <TypographySmall>{answer}</TypographySmall>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </>
  );
};

export default Help;
