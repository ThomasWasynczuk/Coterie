import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Button from "../../components/Button";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context";
import ProtectedRoute from "../../utils/protectedRoute";
import InfoBox from "../../components/InfoBox";
import ChatBox from "../../components/ChatBox";

export default function Home() {
  const { signOut, currentUser } = useAuth();
  const router = useRouter();
  const { chatId, channelId } = router.query;

  return (
    <ProtectedRoute>
      <Head>
        <title>Coterie</title>
        <meta name="description" content="Chat with you NFT communities" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="bg-black flex grow">
          <Sidebar />
          <div className="flex bg-white grow p-4 flex-col lg:flex-row space-y-4 space-x-0 lg:space-x-4 lg:space-y-0 lg:justify-evenly">
            <InfoBox />
            <ChatBox channelTitle={channelId} chatId={chatId} />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
