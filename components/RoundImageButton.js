import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const RoundImageButton = ({ src, slug, sidebar }) => {
  const router = useRouter();

  return (
    <div className="w-full flex justify-center relative">
      <Link href={`/${slug}`}>
        <div className="rounded-full overflow-hidden h-[70px] w-[70px] cursor-pointer">
          <Image src={src} width={70} height={70} />
        </div>
      </Link>
      {sidebar && router?.query?.chatId === slug ? (
        <div className="bg-primary w-1 h-1/2 absolute right-0 rounded-full top-1/4" />
      ) : null}
    </div>
  );
};

export default RoundImageButton;
