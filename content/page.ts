import { SidebarPage } from '@/types/create-org';
import { title } from 'process';

export const landingPage = {
  name: 'Soul Sync',
  description:
    'A platform for mentors and mentees to connect, learn, and grow together',
  hero: {
    title: 'Connect with Mentors',
    description: 'Discover the best mentors in your area',
    cta: 'Search Mentors',
  },
};

export const loginPage = {
  title: 'TURUMBA',
  line1: 'Connect with ',
  line2: ' your audience Today.',
  description: 'Connect Mentors and Peoples anytime anywhere',
};

export const MentorGetStarted = {
  title: 'TURUMBA',
  text: 'Get started and get the chance to carve the generation',
  quote:
    "Young pupil are the world's most valuable resource and its best hope for the future.",
  speaker: '— John F. Kennedy',
};

export const SignInPage = {
  name: 'Soul Sync',
  description:
    'A platform for mentors and mentees to connect, learn, and grow together',
};

// Defining the SidebarPages object with two pages: first and second
export const CreateOrgPage: { [key: string]: SidebarPage } = {
  first: {
    heading: 'We need some of your Organization’s Information',
    description:
      "This data is needed so that we can easily provide solutions according to your company's capacity",
    button1Text: 'Cancel',
    button2Text: 'Continue',
    step: 1,
  },
  second: {
    heading: 'We can now create an Automation for your company.',
    description:
      "This data is needed so that we can easily provide solutions according to your company's capacity",
    button1Text: 'Go Back',
    button2Text: 'Sign up',
    step: 2,
  },
};
