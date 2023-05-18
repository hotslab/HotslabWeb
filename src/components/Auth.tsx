import eventBus from "@/lib/eventBus"
import { useSession } from "next-auth/react"
import { useEffect } from "react"


type props = { children: any }

export default function Auth({ children }: props) {
    const { data: session, status } = useSession()
    const isUser = !!session?.user
    useEffect(() => {
        if (status === "loading") eventBus.dispatch("openLoadingPage", true)
        else eventBus.dispatch("openLoadingPage", false)
        if (!isUser) {
            eventBus.dispatch("openErrorModal", "Unauthorized")
            eventBus.dispatch("logOut")
        }
    }, [isUser, status])

    if (isUser) return children
}