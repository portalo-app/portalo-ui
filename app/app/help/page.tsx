'use client';

import PageLayout from '@components/layout/PageLayout';
import { ROUTES } from '@constants/routes.const';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@core/ui/Accordion';
import { TypographySmall } from '@core/ui/Typography';
import { NextPage } from 'next';

interface HelpPageProps { }

const HelpPage: NextPage<HelpPageProps> = () => {
  const helpTitle = 'Help';

  const faqs = [
    {
      id: '1',
      question: 'How do I create a profile?',
      answer: 'Click on the "Create Profile" button on the Profiles page.',
    },
    {
      id: '2',
      question: 'How do I edit a profile?',
      answer: 'Click on the "Edit" button on the Profiles page.',
    },
    {
      id: '3',
      question: 'How do I delete a profile?',
      answer: 'Click on the "Delete" button on the Profiles page.',
    },
  ];

  return (
    <PageLayout title={helpTitle} backPath={ROUTES.APP}>
      <div>
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
      </div>
    </PageLayout>
  );
};

export default HelpPage;
