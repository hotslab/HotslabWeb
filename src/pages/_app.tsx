import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import LoadingModal from "@/components/LoadingModal"
import eventBus from '@/lib/eventBus'
import ErrorModal from '@/components/ErrorModal'

export default function App({ Component, pageProps }: AppProps) {
  const [pageLoading, setPageLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const router = useRouter()

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
    eventBus.on("openErrorModal", (e: string) => setErrorMessage(e))
    eventBus.on("openLoadingPage", (e: boolean) => setPageLoading(e))
    return () => {
      eventBus.remove("openErrorModal", () => setErrorMessage(null))
      eventBus.remove("openLoadingPage", () => setPageLoading(false))
    }
  }, [])

  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
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

