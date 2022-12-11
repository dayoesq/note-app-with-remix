import type { ErrorBoundaryComponent, MetaFunction } from '@remix-run/node';
import {
    Link,
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useCatch
} from '@remix-run/react';
import type { CatchBoundaryComponent } from '@remix-run/react/dist/routeModules';

import styles from '~/styles/main.css';
import MainNavigation from './components/MainNavigation';

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'Remix Test App',
    viewport: 'width=device-width,initial-scale=1'
});

export default function App() {
    return (
        <html lang='en'>
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <header>
                    <MainNavigation />
                </header>
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}

export const CatchBoundary: CatchBoundaryComponent = () => {
    const caughtResponse = useCatch();
    return (
        <html lang='en'>
            <head>
                <Meta />
                <Links />
                <title>An error occurred!</title>
            </head>
            <body>
                <header>
                    <MainNavigation />
                </header>
                <main className='error'>
                    <h1>An error occurred!</h1>
                    <p>{caughtResponse?.data.message}</p>
                    <Link to='/'>Back to home</Link>
                </main>
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
};

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
    const errorMessage = error.message.split(':')[1].split(',')[0];
    return (
        <html lang='en'>
            <head>
                <Meta />
                <Links />
                <title>An error occurred!</title>
            </head>
            <body>
                <header>
                    <MainNavigation />
                </header>
                <main className='error'>
                    <h1>An error occurred!</h1>
                    <p>{errorMessage && errorMessage}</p>
                    <Link to='/'>Back to home</Link>
                </main>
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
};

export function links() {
    return [{ rel: 'stylesheet', href: styles }];
}
