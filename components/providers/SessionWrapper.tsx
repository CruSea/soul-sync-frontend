"use client"
import { SessionProvider } from "next-auth/react"

const SessionWrapper = ({ children }: { children: React.React.Node }) => {
  return <SessionProvider>{ children }</SessionProvider>
}

export default SessionWrapper