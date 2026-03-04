const AVATARS = ["🧑‍💻", "👩‍⚕️", "👨‍🌾", "👩‍🏫", "🧑‍✈️", "👨‍💼", "👩‍🔬", "🧕", "👨‍🎓", "👷"];
const NAMES = [
  "Aisha Malik",
  "Chukwu Adeyemi",
  "Fatima Noor",
  "Muhammad Iqbal",
  "Sara Ahmed",
  "James Chen",
  "Maria Santos",
  "Nia Okafor",
  "Leo Mendes",
  "Aria Khan",
  "Zain Qureshi",
];
const ACTIONS = ["joined alliance", "posted insight on", "reacted to", "commented on", "voted in poll", "started discussion"];
const TARGETS = [
  "AI Job Disruption",
  "Future of Money",
  "Water Crisis Thread",
  "Global Solar Army",
  "Digital Democracy Shift",
  "Gig Economy Blueprint",
  "Currency Trends",
  "Builders Without Borders",
];
const REGIONS = ["Lagos", "Karachi", "Nairobi", "Berlin", "Jakarta", "Toronto", "Dubai", "Sao Paulo", "Mexico City"];

function createRng(seed) {
  let value = seed % 2147483647;
  if (value <= 0) value += 2147483646;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function pick(rng, list) {
  return list[Math.floor(rng() * list.length)];
}

function createLiveEvent(slot, nowMs, eventIndex) {
  const baseSeed = Math.floor(nowMs / 4000) * 7919 + slot * 131 + eventIndex * 17;
  const rng = createRng(baseSeed);
  const ageSec = eventIndex === 0 ? 0 : Math.floor(rng() * 55) + eventIndex * 5;
  return {
    id: `${slot}_${eventIndex}`,
    name: pick(rng, NAMES),
    avatar: pick(rng, AVATARS),
    action: pick(rng, ACTIONS),
    target: pick(rng, TARGETS),
    location: pick(rng, REGIONS),
    ageSec,
  };
}

function computeLivePayload(nowMs) {
  const launchEpochMs = Date.UTC(2026, 0, 1, 0, 0, 0);
  const elapsedMinutes = Math.max(0, Math.floor((nowMs - launchEpochMs) / 60000));
  const minute = elapsedMinutes;
  const second = Math.floor(nowMs / 1000);
  const cycleA = Math.sin(minute / 6);
  const cycleB = Math.cos(minute / 11);

  const minds = 847293 + Math.floor(minute * 0.9) + Math.floor((cycleA + 1) * 19);
  const interactions = 2847291 + minute * 19 + second * 2 + Math.floor((cycleB + 1) * 140);
  const accuracy = Number((78.2 + ((Math.sin(minute / 23) + 1) * 0.95)).toFixed(2));

  const onlineNow = 12200 + Math.floor((cycleA + 1) * 520) + Math.floor((Math.sin(second / 9) + 1) * 90);
  const joiningPerMin = 55 + Math.floor((Math.cos(minute / 4) + 1) * 16);
  const postsPerMin = 130 + Math.floor((Math.sin(minute / 5) + 1) * 40);
  const activeCountries = 136 + Math.floor((Math.cos(minute / 9) + 1) * 12);

  const dropWindow = 20;
  const nextDropInMin = dropWindow - (minute % dropWindow) || dropWindow;
  const seatsLeft = 95 - (minute % 73);

  const slot = Math.floor(nowMs / 4000);
  const liveEvents = Array.from({ length: 8 }, (_, index) => createLiveEvent(slot, nowMs - index * 4000, index));

  return {
    serverTime: new Date(nowMs).toISOString(),
    networkStats: { minds, interactions, accuracy },
    livePresence: { onlineNow, joiningPerMin, postsPerMin, activeCountries },
    fomoStats: { nextDropInMin, seatsLeft: Math.max(6, seatsLeft) },
    liveEvents,
  };
}

export default function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const payload = computeLivePayload(Date.now());
  res.setHeader("Cache-Control", "no-store, max-age=0");
  res.status(200).json(payload);
}
