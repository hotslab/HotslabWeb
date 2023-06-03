import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import eventBus from '@/lib/eventBus'
import fetchInterceptor from '@/lib/fetchInterceptor'
import { signOut } from "next-auth/react"
import { AppAuthProps } from '../../types/authenticated'
import Script from 'next/script'
import Auth from '@/components/Auth'
import LoadingPage from "@/components/LoadingPage"
import dynamic from 'next/dynamic'

const ErrorModal = dynamic(() => import('@/components/ErrorModal'))
const ScrollButton = dynamic(() => import("@/components/ScrollButton"), { ssr: false })

export default function App({ Component, pageProps }: AppAuthProps) {
  const [pageLoading, setPageLoading] = useState<boolean>(false)
  const [isPageLoad, setIsPageLoad] = useState<boolean>(true)
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
  function showLoadingPage(loadingValue: boolean, isPageLoadValue: boolean = true) {
    setPageLoading(loadingValue)
    setIsPageLoad(isPageLoadValue)
  }

  useEffect(() => {
    fetchInterceptor()
    eventBus.on("openErrorModal", (e: string) => setErrorMessage(e))
    eventBus.on("openLoadingPage", (e: boolean) => showLoadingPage(e, false))
    eventBus.on("logOut", () => logOut(true))
    return () => {
      eventBus.remove("openErrorModal", () => setErrorMessage(null))
      eventBus.remove("openLoadingPage", () => showLoadingPage(false))
      eventBus.remove("logOut", () => logOut())
    }
  }, []) // eslint-disable-line
  useEffect(() => {
    router.events.on('routeChangeStart', () => showLoadingPage(true))
    router.events.on('routeChangeComplete', () => showLoadingPage(false))
    router.events.on('routeChangeError', () => showLoadingPage(false))
    return () => {
      router.events.off('routeChangeStart', () => showLoadingPage(false))
      router.events.off('routeChangeComplete', () => showLoadingPage(false))
      router.events.off('routeChangeError', () => showLoadingPage(false))
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
          <LoadingPage isPageLoad={isPageLoad} />
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

