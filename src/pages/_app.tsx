import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import LoadingModal from "@/components/LoadingModal"
import eventBus from '@/lib/eventBus'
import ErrorModal from '@/components/ErrorModal'
import Auth from '@/components/Auth'
import fetchInterceptor from '@/lib/fetchInterceptor'
import { signOut } from "next-auth/react"
import { AppAuthProps } from '../../types/authenticated'

// export function reportWebVitals(metric: any) {
//   console.log(metric)
// }


export default function App({ Component, pageProps }: AppAuthProps) {
  const [pageLoading, setPageLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const router = useRouter()

  async function logOut() {
    await signOut({ redirect: false })
    router.push({ pathname: "/auth/login" })
  }
  function closeErrorModal() {
    setErrorMessage(null)
  }

  useEffect(() => {
    const handleStart = () => setPageLoading(true)
    const handleComplete = () => setPageLoading(false)
    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)
  }, [router])
  useEffect(() => {
    fetchInterceptor()
    eventBus.on("openErrorModal", (e: string) => setErrorMessage(e))
    eventBus.on("openLoadingPage", (e: boolean) => setPageLoading(e))
    eventBus.on("logOut", () => logOut())
    return () => {
      eventBus.remove("openErrorModal", () => setErrorMessage(null))
      eventBus.remove("openLoadingPage", () => setPageLoading(false))
      eventBus.remove("logOut", () => logOut())
    }
  }, [])

  return (
    <SessionProvider session={pageProps.session}>
      {Component.auth
        ? <Auth><Component {...pageProps} /></Auth>
        : <Component {...pageProps} />
      }
      {
        pageLoading &&
        <LoadingModal />
      }
      {
        errorMessage !== null &&
        <ErrorModal errorMessage={errorMessage} close={closeErrorModal} />
      }
    </SessionProvider>
  )
}

