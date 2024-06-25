'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@core/ui/Accordion';
import { TypographySmall } from '@core/ui/Typography';
import { NextPage } from 'next';

interface HelpPageProps {}

const HelpPage: NextPage<HelpPageProps> = () => {
  const faqs = [
    {
      id: '1',
      question: 'How do I create a profile?',
      answer: 'Click on the "Create Profile" button on the Profile page.',
    },
    {
      id: '2',
      question: 'How do I edit a profile?',
      answer: 'Click on the "Edit" button on the Profile page.',
    },
    {
      id: '3',
      question: 'How do I delete a profile?',
      answer: 'Click on the "Delete" button on the Profile page.',
    },
  ];

  return (
    <>
      {faqs.map(({ question, answer, id }, index) => (
        <Accordion key={index} type="single" collapsible>
          <AccordionItem value={id}>
            <AccordionTrigger>{question}</AccordionTrigger>

            <AccordionContent>
              <TypographySmall>{answer}</TypographySmall>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </>
  );
};

export default HelpPage;
