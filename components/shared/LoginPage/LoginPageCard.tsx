import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"


const LoginPageCard = () => {

  return (
    <Card className="flex-1 flex items-center justify-center flex-col gap-6">
      <CardHeader className="flex flex-col items-center pb-0">
        <CardTitle className="font-bold text-3xl tracking-[-1px] mb-[-5px]">
          Login
        </CardTitle>
        <CardDescription className="text-slate-500 font-normal text-base">
          Login with your Google account to proceed
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 pt-0">
        <Button className="w-96 h-10 font-medium text-sm" variant="outline">Login with Google</Button>
        <div className="text-sm text-center">Don’t have an Organization Platform?</div>
        <Link href="/create-org" >
          <Button className="w-96 h-10 font-medium text-sm" variant="default">
            Sign Up
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

export default LoginPageCard