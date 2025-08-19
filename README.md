# NHL: Era Rewind

This project takes the current NHL league and simulates what it would look like if we brought today's league back in time.

For example, if we take the league back to 1970 and there were only 13 non-Canadian players in the league, then all non-Canadians in the current league would be removed except for 13 from those nations. If the population of Canada was half of what it is now, then half of the current Canadian players would be removed. Next, the number of teams from that era is used, and the remaining players are assigned to teams like a fantasy draft. Any leftover players are cut and placed in an "other pro leagues" list, and if there aren't enough players, a non-NHL placeholder is used.

After generating the new league, the user will see the updated leaderboard. They can sort by goals, games played, assists, etc. A new goal leader, point leader, top defenseman, and top goalie will be chosen.

Basically, it simulates what the current league might look like if circumstances were similar to those in the past.

Later, I want to add a feature where the user can protect a player. That player is guaranteed to be in the new league, so the user can see how they would have performed in a different era. I also want to add a career adjuster, where you select a player and run this simulation for every year they were in the league.

## Why this exists

Some of the all time greats played in all Canadian leagues. The first Russian player didn't even play in the NHL until 1989. Imagine the current league without the reigning Art Ross winner Nikita Kucherov, or without the talented Russian goalies Vasilevski, Shesterkin, Bobrovsky and the other 9 Russian goalies that played in the NHL in the 2024-2025 season. The game was different, but players from their past excelled against their peers. Have you ever wondered how current players might stack up against their peers if the league was a similar size as a previous year? Do you want to compare how Bobby Orr and Cale Makar's careers compare if Makar played in a league that looked like Orr's NHL, well then this rewind might help.

## Features

- Scraped season-level NHL data using the public NHL API
- Can be run for any NHL season from 1917 to present
- Can 'protect' a player so they are in the final output
- New trophy winners are determined

## 🚀 Getting Started

Clone the repo and install dependencies:

```bash
git clone git@github.com:Damon-Thomas/nhl-era-rewind.git
cd nhl-era-rewind
pnpm install
pnpm dev
```
