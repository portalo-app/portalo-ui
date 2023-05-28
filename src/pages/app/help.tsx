import PageLayout from '@/components/layout/PageLayout';
import { ROUTES } from '@/lib/constants/routes.const';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from '@mui/material';
import { NextPage } from 'next';

interface HelpPageProps {}

const HelpPage: NextPage<HelpPageProps> = () => {
  const helpTitle = 'Help';

  const faqs = [
    {
      question: 'How do I create a profile?',
      answer: 'Click on the "Create Profile" button on the Profiles page.',
    },
    {
      question: 'How do I edit a profile?',
      answer: 'Click on the "Edit" button on the Profiles page.',
    },
    {
      question: 'How do I delete a profile?',
      answer: 'Click on the "Delete" button on the Profiles page.',
    },
  ];

  return (
    <PageLayout title={helpTitle} backPath={ROUTES.APP}>
      <Stack>
        {faqs.map(({ question, answer }, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`faq-${index}-content`}
            >
              {question}
            </AccordionSummary>

            <AccordionDetails>
              <Typography>{answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    </PageLayout>
  );
};

export default HelpPage;
