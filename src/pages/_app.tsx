import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Loading from '@/components/Loading'
import { MdOutlineCancel } from "react-icons/md"
import eventBus from '@/lib/eventBus'

export default function App({ Component, pageProps }: AppProps) {
  const [pageLoading, setPageLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const router = useRouter()
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
      {
        pageLoading
          ? <Loading />
          : <Component {...pageProps} />
      }
      {
        errorMessage !== null &&
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-black bg-opacity-80 transition-opacity"></div>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden bg-white text-left shadow-xl transition-all sm:my-8 w-[98%] sm:w-[80%] p-3 sm:p-8">
                {/* Content */}
                <div className="flex flex-col justify-between items-start flex-wrap gap-5">
                  <h2 className="text-error font-md text-xl">Error</h2>
                  <span className="text-gray-600 text-md">{errorMessage}</span>
                  <div className='w-full flex justify-end items-center'>
                    <button
                      className="btn btn-sm btn-error text-white"
                      onClick={() => setErrorMessage(null)}
                    >
                      Close
                    </button>
                  </div>
                </div>
                {/* End of Content */}
              </div>
            </div>
          </div>
        </div>
      }
    </SessionProvider>
  )
}

