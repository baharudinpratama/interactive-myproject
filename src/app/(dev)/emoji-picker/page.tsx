"use client";

import data from "@emoji-mart/data";
import { init } from "emoji-mart";

init(data);

export default function Page() {
  const categories = Object(data).categories;
  const emojis = Object(data).emojis;

  return (
    <>
      {categories.map((cat: any, index: any) => {
        const samples = cat.emojis.slice(0, 4);

        return (
          <ul>
            <li key={index}>
              <span className="font-bold">{cat.id}</span>

              <ul>
                {samples.map((sample: any, index: any) => {
                  return (
                    <li key={index}>
                      {emojis[sample].skins[0].native}
                    </li>
                  )
                })}
              </ul>
            </li>
          </ul>
        )
      })}

      {/* {Object.entries(emojis).map((emoji: any) => (
        <>{emoji[1].skins[0].native}</>
      ))} */}
    </>
  )
}
