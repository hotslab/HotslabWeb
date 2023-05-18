import type { AppProps } from 'next/app'
import { NextComponentType, NextPageContext } from 'next'

/**
 * Authentication configuration
 */
export interface AuthEnabledComponentConfig {
    auth: boolean
}


/**
 * A component with authentication configuration
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ComponentWithAuth<PropsType = any> = React.FC<PropsType> &
    AuthEnabledComponentConfig;

/**
 * Main app component configuration
 */
export type AppAuthProps = AppProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Component: NextComponentType<NextPageContext, any, {}> & Partial<AuthEnabledComponentConfig>;
}