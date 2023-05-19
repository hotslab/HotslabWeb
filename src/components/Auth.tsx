import eventBus from "@/lib/eventBus"
import { useSession } from "next-auth/react"
import { useEffect } from "react"


type props = { children: any }

export default function Auth({ children }: props) {
    const { status } = useSession()
    useEffect(() => {
        status === "loading" ? eventBus.dispatch("openLoadingPage", true) : eventBus.dispatch("openLoadingPage", false)
        if (status === "unauthenticated") eventBus.dispatch("logOut")
    }, [status])

    if (status === "authenticated") return children
}