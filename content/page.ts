import { SidebarPage } from "@/types/create-org"

export const landingPage={
    name: "Soul Sync",
    description: "A platform for mentors and mentees to connect, learn, and grow together",
    hero: {
        title: "Connect with Mentors",
        description: "Discover the best mentors in your area",
        cta: "Search Mentors"
    }
}

 export const loginPage={
    name: "Soul Sync",
    description: "A platform for mentors and mentees to connect, learn, and grow together",
}
export const SignInPage={
    name: "Soul Sync",
    description: "A platform for mentors and mentees to connect, learn, and grow together",
}

// Defining the SidebarPages object with two pages: first and second
export const CreateOrgPage: {[key: string]: SidebarPage} = {
    first: {
      heading: "We need some of your Organization’s Information",
      description: "This data is needed so that we can easily provide solutions according to your company's capacity",
      button1Text: "Cancel",
      button2Text: "Continue",
      step: 1
    },
    second: {
      heading: "We can now create an Automation for your company.",
      description: "This data is needed so that we can easily provide solutions according to your company's capacity",
      button1Text: "Go Back",
      button2Text: "Sign up",
      step: 2
    }
  } 