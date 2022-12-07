import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsFillChatDotsFill, BsNewspaper, BsChevronDown } from "react-icons/bs";
import { FaRegHandshake, FaMoneyBillAlt } from "react-icons/fa";
import RoundImageButton from "./RoundImageButton";
import ProgressBar from "./ProgressBar";

const ChannelOption = ({ Icon, label, slug, active }) => {
  const router = useRouter();
  const { chatId, channelId } = router.query;
  return (
    <Link href={`/${chatId}/${slug}`}>
      <div
        className={`flex items-center space-x-3 py-3 transition-all text-slate-600 hover:text-black cursor-pointer ${
          channelId === slug && "!text-black"
        }`}
      >
        <span className="text-[24px]">{Icon}</span>
        <span className="text-lg">{label}</span>
      </div>
    </Link>
  );
};
const InfoBox = () => {
  return (
    <div className="flex flex-col w-full max-w-sm space-y-4 mx-auto lg:mx-0">
      <div className="bg-slate-200 rounded-lg flex flex-col py-4 px-5 space-y-3">
        <div className="flex items-center space-x-3">
          <div className="">
            <RoundImageButton src="/assets/images/doodles.jpg" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-black text-md font-bold whitespace-nowrap">
              Zach Meyer
            </h2>
            <span className="text-slate-600">Subtitle</span>
          </div>
        </div>
        <ProgressBar value={60} />
      </div>
      <div className="bg-slate-200 rounded-lg flex flex-col py-4 px-5  ">
        <div className="divide-y flex flex-col divide-slate-400">
          <ChannelOption
            Icon={<BsFillChatDotsFill />}
            label="General"
            slug="general"
            active
          />
          <ChannelOption Icon={<BsNewspaper />} label="News" slug="news" />
          <ChannelOption
            Icon={<FaRegHandshake />}
            label="Networking"
            slug="networking"
          />
          <ChannelOption
            Icon={<FaMoneyBillAlt />}
            label="Floor Talk"
            slug="floortalk"
          />
        </div>
        <div className="pt-4">
          <div className="flex items-center space-x-3 text-xl">
            <span className="text-slate-600 ">Online</span>
            <span>
              <BsChevronDown />
            </span>
          </div>
          <div className="flex flex-wrap px-5">
            <div className="w-1/3 my-3">
              <RoundImageButton src="/assets/images/doodles.jpg" />
            </div>
            <div className="w-1/3 my-3">
              <RoundImageButton src="/assets/images/doodles.jpg" />
            </div>
            <div className="w-1/3 my-3">
              <RoundImageButton src="/assets/images/doodles.jpg" />
            </div>
            <div className="w-1/3 my-3">
              <RoundImageButton src="/assets/images/doodles.jpg" />
            </div>
            <div className="w-1/3 my-3">
              <RoundImageButton src="/assets/images/doodles.jpg" />
            </div>
            <div className="w-1/3 my-3">
              <RoundImageButton src="/assets/images/doodles.jpg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
