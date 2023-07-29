import { Component, createEffect, createSignal } from "solid-js";
import { supabase } from "../auth/supabaseClient";
import passenger from "../assets/svgs/person.svg";
import steering from "../assets/svgs/wheel.svg";
import fuel from "../assets/svgs/fuel-pump.svg";
import { A } from "@solidjs/router";

interface CarModel {
  id: string;
  name: string;
  transmission: string;
  fuelType: string;
  seatNumbers: number;
  condition: string;
  price: number;
  rentPrice: number;
}

const Wishlist: Component = () => {
  const [names, setNames] = createSignal<string[]>([]);
  const [transmissions, setTransmissions] = createSignal<string[]>([]);
  const [fuelTypes, setFuelTypes] = createSignal<string[]>([]);
  const [seatNumbers, setSeatNumbers] = createSignal<string[]>([]);
  const [condition, setCondition] = createSignal<string[]>([]);
  const [price, setPrice] = createSignal<string[]>([]);
  const [rentPrice, setRentPrice] = createSignal<string[]>([]);
  const [linkId, setLinkId] = createSignal<string[]>([]);

  createEffect(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: userIdList } = await supabase.from("wishlist").select("userId");

    const matchingUserId = userIdList!.find((item) => item.userId === user?.id);
    const matchedUserId = matchingUserId?.userId || null;

    const { data: allIdList } = await supabase.from("wishlist").select("*");
    setLinkId(
      allIdList!
        .filter((item) => item.userId === matchedUserId)
        .map((item) => item.cardId)
    );
    setNames(
      allIdList!
        .filter((item) => item.userId === matchedUserId)
        .map((item) => item.name)
    );
    setTransmissions(
      allIdList!
        .filter((item) => item.userId === matchedUserId)
        .map((item) => item.transmission)
    );
    setFuelTypes(
      allIdList!
        .filter((item) => item.userId === matchedUserId)
        .map((item) => item.fuelType)
    );
    setSeatNumbers(
      allIdList!
        .filter((item) => item.userId === matchedUserId)
        .map((item) => item.seatNumbers)
    );
    setCondition(
      allIdList!
        .filter((item) => item.userId === matchedUserId)
        .map((item) => item.condition)
    );
    setPrice(
      allIdList!
        .filter((item) => item.userId === matchedUserId)
        .map((item) => item.price)
    );
    setRentPrice(
      allIdList!
        .filter((item) => item.userId === matchedUserId)
        .map((item) => item.rentPrice)
    );
  });
  return (
      <div class="my-5">
        <div class="font-mauline text-emerald-600 text-6xl text-center my-10">
          Your Wishlist
        </div>
        <div class="flex justify-center flex-wrap">
          {names().map((name, index) => (
            <A href={`/model/${(linkId()[index])}`}>
              <div class="bg-white/10 border border-white/10 rounded-xl font-montserrat min-w-[470px] min-h-[310px] mx-2 px-4 py-3 shadow-lg my-2">
                <div class="flex justify-between">
                  <div class="flex-col justify-between">
                    <h2 class="text-4xl font-mabry">{name}</h2>
                    <p class="text-sm font-medium opacity-70 font-mabry-regular">
                      ${price()[index]}
                    </p>
                  </div>
                </div>

                <img
                  src="https://images.unsplash.com/photo-1517994112540-009c47ea476b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=600&q=60"
                  class="w-[450px] h-[200px] object-cover my-3 rounded-md border-2 border-white/10"
                />
                <div class="flex justify-between">
                  <div class="flex gap-3 items-center font-mabry-regular mt-auto">
                    <div class="flex gap-1">
                      <img src={passenger} class="w-6 h-6 my-auto" />
                      <p class="font-medium">{seatNumbers()[index]}</p>
                    </div>
                    <div class="flex gap-1">
                      <img src={steering} class="w-6 h-6 my-auto" />
                      <p class="font-medium">{transmissions()[index]}</p>
                    </div>
                    <div class="flex gap-1">
                      <img src={fuel} class="w-6 h-6 my-auto" />
                      <p class="font-medium">{seatNumbers()[index]}</p>
                    </div>
                  </div>
                  <p class="font-semibold text-4xl">
                    ${rentPrice()[index]}
                    <span class="text-base font-normal">&nbsp;/ Day</span>
                  </p>
                </div>
              </div>
            </A>

          ))}
        </div>
      </div>
  );
};

export default Wishlist;
