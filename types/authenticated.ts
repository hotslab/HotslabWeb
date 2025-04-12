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
export type ComponentWithAuth<PropsType = any> = React.FC<PropsType> &
    AuthEnabledComponentConfig;

/**
 * Main app component configuration
 */
export type AppAuthProps = AppProps & {
    Component: NextComponentType<NextPageContext, any, {}> & Partial<AuthEnabledComponentConfig>;
}