import { MotionDiv } from "./MotionDiv";
import Image from "next/image";

//this is the prop type for the anime argument in animecard
export interface AnimeProp {
  id: string;
  name: string;
  image: {
    original: string;
  };
  kind: string;
  episodes: number;
  episodes_aired: number;
  score: string;
}
//this is the prop type for the anime card
interface Prop {
  anime: AnimeProp;
  index: number;
}

//we are taking anime 
function AnimeCard({ anime, index }: Prop) {
  return (
    // here we are using motion div(like gsap) where we are animating the card 
    <MotionDiv
    variants={{
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    }}
    initial="hidden"
    animate="visible"
    transition={{ duration: 0.5, delay: index * 0.25, ease: "easeInOut"
    }}
    viewport={{amount: 0}}
    className="max-w-sm rounded relative w-full">
      <div className="relative w-full h-[20rem]">
        <Image
          src={`https://shikimori.one${anime.image.original}`}
          alt={anime.name}
          fill
          className="rounded-xl  hover:scale-[1.03] ease duration-100 "
        />
      </div>
      <div className="py-4 flex flex-col gap-3">
        <div className="flex justify-between items-center gap-1">
          <h2 className="font-bold text-white text-xl line-clamp-1 w-full">
            {anime.name}
          </h2>
          <div className="py-1 px-2 bg-[#161921] rounded-sm">
            <p className="text-white text-sm font-bold capitalize">
              {anime.kind}
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex flex-row gap-2 items-center">
            <Image
              src="./episodes.svg"
              alt="episodes"
              width={20}
              height={20}
              className="object-contain"
            />
            <p className="text-base text-white font-bold">
              {anime.episodes || anime.episodes_aired}
            </p>
          </div>
          <div className="flex stars flex-row gap-2 items-center">
            <Image
              src="./star.svg"
              alt="star"
              width={18}
              height={18}
              className="object-contain star drop-shadow-lg shadow cursor-pointer"
            />
            <p className="text-base font-bold  text-[#FFAD49] star">{anime.score}</p>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}

export default AnimeCard;
