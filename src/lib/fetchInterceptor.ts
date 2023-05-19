import eventBus from "./eventBus"

export default function fetchInterceptor() {
    if (window !== undefined) {
        const { fetch: originalFetch } = window
        window.fetch = async (...args) => {

            let [resource, config] = args

            /********************************* 
            Request interceptor
            
            Example: modify request url 

            resource = 'https://jsonplaceholder.typicode.com/todos/2';

            Add code below
            **********************************/

            console.log("RESOURCE", resource, config, process.env.NODE_ENV, process.env.NEXT_PUBLIC_HOST)

            /*********************************
            response interceptor
            
            Example: modify response body 

            const json = () =>
                response
                .clone()
                .json()
                .then((data) => ({ ...data, title: `Intercepted: ${data.title}` }));
                
            Add code below
            **********************************/
            let response = await originalFetch(resource, config)

            const status = response.ok
            const responseData = await response.clone().json()
            if (!status && responseData.data === "Unauthorized") eventBus.dispatch("logOut")

            /*********************************/

            return response
        }
    }
}

