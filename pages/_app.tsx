import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';

import Layout from '@/components/Layout';
import RegisterModal from '@/components/modals/RegisterModal';
import LoginModal from '@/components/modals/LoginModal';
import EditModal from '@/components/modals/EditModal';
import TweetModal from '@/components/modals/TweetModal';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster />
      <EditModal />
      <RegisterModal />
      <LoginModal />
      <TweetModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
