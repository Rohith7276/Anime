"use client"
import Image from "next/image";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";

function Hero() {
  const text = useRef<HTMLHeadingElement>(null);
  const smoke = useRef<HTMLImageElement>(null);
  const cloud = useRef<HTMLImageElement>(null);
  const cloud2 = useRef<HTMLImageElement>(null);
  const anime = useRef<HTMLImageElement>(null);

  //useGSAP manages the gsap and utilizes the space so we use ContextSafe to avoid memory usages and make our website smooth and fast
  const {contextSafe} = useGSAP();
  const animation = contextSafe(() => {
    if (text.current) {
      text.current.style.opacity = '1';
    }
    gsap.from(text.current, {
      x: -530, duration: 1, delay:2, opacity:0
    });
   
      document.querySelectorAll(".logo").forEach((element) => {
        (element as HTMLElement).style.opacity = '1';
      });
      
    gsap.from(".logo", {
     delay:1, opacity:0
    });
    gsap.to(anime.current, {
      opacity: 1, delay: 0.5
    })
    if (smoke.current) {
      smoke.current.style.opacity = '1';
    }
    setTimeout(() => {
      if (smoke.current) {
        smoke.current.style.opacity = '0';
      }
      if (smoke.current) {
        smoke.current.style.width = '0';
      }
    }, 1000);
    anime.current?.addEventListener('mouseover', () => {
      gsap.to(cloud.current, { x: 100 })
      if (cloud.current) {
        cloud.current.style.opacity = '1';
      }
      gsap.to(cloud2.current, { x: -100, y:-100 })
      if (cloud2.current) {
        cloud2.current.style.opacity = '1';
      }
    });
    anime.current?.addEventListener('mouseleave', () => {
      gsap.to(cloud.current, { opacity: 0, x: 0, duration:0.1,  ease: 'none' })
      gsap.to(cloud2.current, { opacity: 0, x: 0, y:0, duration:0.1, ease: 'none' })
    });
  })

useEffect(() => {
  animation();
}, [])

//just like useEffect we can add dependencies to gsap
  // }[state])
  //scope means defining the container for pointing the element to be animated
  // }{scope:state, dependencies:[state]})

  return (
    <header className="bg-hero overflow-hidden bg-center bg-cover bg-no-repeat sm:p-16 py-16 px-8 flex justify-center lg:items-center max-lg:flex-col w-full sm:gap-16 gap-0">
      <div className="flex-1 flex flex-col gap-10">
        <Image
          src="/logo.png"
          alt="logo"
          width={150}
          height={96}
          className="object-contain logo opacity-0 "
        />
        <h1 ref={text} className="sm:text-6xl opacity-0 text-5xl text-white lg:max-w-lg font-bold leading-[120%]">
          Explore The <span className="red-gradient">Diverse Realms</span> of
          Anime Magic
        </h1>
      </div>
      <div className="lg:flex-1 relative w-full h-[50vh] justify-center  overflow-sdfhidden">
        <Image ref={anime} src="/anime.png" alt="anime" fill className="ease duration-500 object-contain hover:scale-[1.2] opacity-0 z-20" />
        <Image ref={cloud} src="/cloud.png" alt="anime" fill className="opacity-0 object-contain  " />
        <Image ref={cloud2} src="/cloud.png" alt="anime" fill className="opacity-0 object-contain  " />
        <Image ref={smoke} src="/smoke.gif" alt="smoke" width={500} height={100} className=" ml-[1rem] z-30 opacity-0 mt-[-7rem] object-contain  " />
      </div>
    </header>
  );
}

export default Hero;
