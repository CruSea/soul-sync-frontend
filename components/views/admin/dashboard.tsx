"use client"

import { GrowthChart } from "@/components/shared/admin/dashboard/GrowthChart";
import { MentorsChart } from "@/components/shared/admin/dashboard/MentorsChart";
import { StatsCards } from "@/components/shared/admin/dashboard/StatCard";
import { UsersTable } from "@/components/shared/admin/dashboard/UserTable";
import { useRouter } from 'next/navigation';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
const ACCOUNT_URL= process.env.NEXT_PUBLIC_API_ACCOUNT_URL

export default function AdminView() {
  // const router = useRouter();
  // const user = localStorage.getItem("user");
  // if (!user) {
  //   console.error("can't find user data")
  //   return <div>Can't find user Data</div>
  // }
  // const userData = JSON.parse(user);

  // if (!userData?.domain) {
  //   console.log("new user")
  //   router.push("/admin/create-org")
  // }

  return (
      <div className="flex-1 p-4 bg-secondary dark:bg-gray-900">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 basis-[40%] bg-white dark:bg-black p-10 rounded-lg ">
            <StatsCards />
          </div>
          <div className="flex-1 basis-[60%]">
            <GrowthChart />
          </div>
        </div>
        <div className="flex flex-wrap lg:flex-nowrap gap-6 mt-8">
          <div className="flex-1 basis-[70%]">
            <UsersTable />
          </div>
          <div className="flex-1 basis-[30%]">
            <MentorsChart />
          </div>
        </div>
      </div>

  );
}

// Server-side function to check for domain key and redirect if necessary
export async function getServerSideProps() {
  try {
    // Fetch data from the endpoint
    const response = await fetch(`${BASE_URL}/${ACCOUNT_URL}`);
    const data = await response.json();

    if (!data.domain) {
      // Redirect to another page if domain key doesn't exist
      console.log("new user")
      return {
        redirect: {
          destination: "/admin/create-org", // Replace with your desired route
          permanent: false, // Set to true if this should be a permanent redirect (301)
        },
      };
    }

    // Pass props to the component if domain exists
    return {
      props: {}, // Add props as needed
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    // Optionally redirect to an error page if the fetch fails
    return {
      redirect: {
        destination: "/log-in", // Replace with your error page
        permanent: false,
      },
    };
  }
}