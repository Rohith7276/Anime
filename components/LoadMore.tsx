"use client"
import { fetchAnime } from "@/app/action";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import AnimeCard from "./AnimeCard";

var page = 2;

//basically we are transforming the initial render which is AnimeCard to the LoadMore and down here is the alias which we are transferring the data to the data and further when inview we are fetching the next page data

//This is creating a alias type for data state type for typescript
export type AnimeCard= JSX.Element;

function LoadMore() {
  const { ref, inView } = useInView();
  //here AnimeCard is the datatype in which every data fetched is followed as the component is (like int float etc)
  const [data, setdata] = useState<AnimeCard[]>([])

//In here we are fetching the anime on load where the data is been added to data state and shown to the user
//This useEffect is been triggered when the inView or data state is changed/updated
  useEffect(() => {
    if (inView)
      fetchAnime(page)
        .then((res) => {
          setdata([...data, ...res])
          page++;
          console.log('data', data)
        })
  }, [inView, data]);
  return (
    <>
    <section className="grid stars lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data}
      </section>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;
