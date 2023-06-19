import Image from "next/image";

export const Logo = () => {
  return (
    <div className="flex items-start justify-center gap-2 my-10 ">
      <Image
        src="https://raw.githubusercontent.com/dylogedyloge/gazelleicon/9da585893a6d039e328dd6bfed7ecb12667901f1/minimlistic-gazelle.svg"
        alt="logo"
        width={50}
        height={50}
        className="rounded-full"
      />
      <div className="flex flex-col items-start justify-center">
        <div className="text-2xl text-center font-heading ">Dyloge</div>
        <div className="text-[0.8rem] text-[#FD7611] font-heading ">
          create content with AI
        </div>
      </div>
    </div>
  );
};
