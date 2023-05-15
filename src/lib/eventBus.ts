const eventBus = {
    on(event: string, callback: Function) {
        document.addEventListener(event, (e: CustomEventInit) => callback(e.detail))
    },
    dispatch(event: string, data: any) {
        document.dispatchEvent(new CustomEvent(event, { detail: data }))
    },
    remove(event: string, callback: Function) {
        document.removeEventListener(event, callback())
    },
}

export default eventBus