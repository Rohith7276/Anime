"use server"
// this is server side code which helps the page to load faster cuz the data is fetched on the server side and then sent to the client side asynchronously
// we fetched here and sent the html code to the client side so that we can use the framer motion on scroll animation on the client side
import AnimeCard, { AnimeProp } from "@/components/AnimeCard";
export const fetchAnime = async (page: number) => {
  //basic fetching
    const response = await fetch(`https://shikimori.one/api/animes?page=${page}&limit=8&order=popularity`);
    const data = await response.json();

    //returning the data in html format so that when framer motion animation get triggered and load the data 
    return data.map((item: AnimeProp, index: number) => (
        <AnimeCard key={item.id} anime={item} index={index} />
      ));
}