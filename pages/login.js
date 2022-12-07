import { useEffect, useState } from "react";
import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import { useAuth } from "../context";
import Image from "next/image";
import Button from "../components/Button";
import { useRouter } from "next/router";

const login = () => {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signOut, currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      router.push("/boredape/general");
    }
  }, [currentUser]);

  const fetchNonce = async (address) => {
    const fetchedNonce = await fetch(
      "https://us-central1-coterie-437s.cloudfunctions.net/getNonceToSign",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
        }),
      }
    ).then((res) => res.json());
    return fetchedNonce?.nonce;
  };
  const verifyMessage = async (address, signature) => {
    const result = await fetch(
      "https://us-central1-coterie-437s.cloudfunctions.net/verifySignedMessage",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
          signature,
        }),
      }
    ).then((res) => res.json());
    return result;
  };
  async function login() {
    setLoading(true);
    const provider = await detectEthereumProvider();
    if (provider) {
      console.log("Ethereum successfully detected!");
      provider.send("eth_requestAccounts");
      const ethereumProvider = new ethers.providers.Web3Provider(provider);
      const signer = ethereumProvider.getSigner();
      const walletAddress = await signer.getAddress();
      const nonce = await fetchNonce(walletAddress);
      const signature = await signer.signMessage(nonce);
      const result = await verifyMessage(walletAddress, signature);

      if (result.token) {
        await signIn(result.token)
          .then((r) => {
            if (r?.error) {
              setIsError(r.errorCode);
            } else {
              setIsSuccess(true);
              setLoading(false);
              router.push("/");
            }
          })
          .catch((err) => console.error("Error:", err));
      }

      // const chainId = await provider.request({
      //   method: "eth_chainId",
      // });
    } else {
      // if the provider is not detected, detectEthereumProvider resolves to null
      console.error("Please install MetaMask!", error);
    }
  }
  return (
    <div className="bg-white flex min-h-screen items-center">
      <div className="hidden md:flex relative  w-2/5 lg:w-3/5 h-screen bg-emerald-50">
        <Image
          src="/assets/images/techcity.jpg"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className=" flex flex-col grow space-y-10">
        <h1 className="text-3xl font-bold text-black text-center mb-10">
          Welcome to Coterie
        </h1>
        <div className="flex justify-center">
          <Button
            label={`${loading ? "Loading..." : "Connect Wallet"}`}
            onClick={() => login()}
          />
        </div>
      </div>
    </div>
  );
};

export default login;
