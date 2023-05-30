import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import eventBus from '@/lib/eventBus'
import fetchInterceptor from '@/lib/fetchInterceptor'
import { signOut } from "next-auth/react"
import { AppAuthProps } from '../../types/authenticated'
import Auth from '@/components/Auth'
import LoadingModal from "@/components/LoadingModal"
import ErrorModal from '@/components/ErrorModal'
import Script from 'next/script'
import dynamic from 'next/dynamic'

const ScrollButton = dynamic(() => import("@/components/ScrollButton"), { ssr: false })

export default function App({ Component, pageProps }: AppAuthProps) {
  const [pageLoading, setPageLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const router = useRouter()

  async function logOut(redirect: boolean = false) {
    if (redirect) {
      await signOut({ redirect: false })
      router.push("/auth/login")
    }
  }
  function closeErrorModal() {
    setErrorMessage(null)
  }

  useEffect(() => {
    fetchInterceptor()
    eventBus.on("openErrorModal", (e: string) => setErrorMessage(e))
    eventBus.on("openLoadingPage", (e: boolean) => setPageLoading(e))
    eventBus.on("logOut", () => logOut(true))
    return () => {
      eventBus.remove("openErrorModal", () => setErrorMessage(null))
      eventBus.remove("openLoadingPage", () => setPageLoading(false))
      eventBus.remove("logOut", () => logOut())
    }
  }, []) // eslint-disable-line
  useEffect(() => {
    router.events.on('routeChangeStart', () => setPageLoading(true))
    router.events.on('routeChangeComplete', () => setPageLoading(false))
    router.events.on('routeChangeError', () => setPageLoading(false))
    return () => {
      router.events.off('routeChangeStart', () => setPageLoading(false))
      router.events.off('routeChangeComplete', () => setPageLoading(false))
      router.events.off('routeChangeError', () => setPageLoading(false))
    }
  }, [router])

  return (
    <>
      <Script id="hotslab-script" strategy="beforeInteractive" onError={(e: Error) => {
        console.error('Script failed to load', e);
      }}>
        {`
        if (${process.env.NODE_ENV === "production"}) window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function () { }
      `}
      </Script>
      <SessionProvider session={pageProps.session}>
        {Component.auth === true
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
        {
          !pageLoading &&
          <ScrollButton />
        }
      </SessionProvider>
    </>
  )
}

